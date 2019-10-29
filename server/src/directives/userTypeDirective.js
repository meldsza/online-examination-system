const { SchemaDirectiveVisitor } = require('apollo-server')
const { defaultFieldResolver } = require("graphql");

class userTypeDirective extends SchemaDirectiveVisitor {
    visitObject(type) {
        this.ensureFieldsWrapped(type);
        type._requiredUsertType = this.args.requires;
    }
    // Visitor methods for nested types like fields and arguments
    // also receive a details object that provides information about
    // the parent and grandparent types.
    visitFieldDefinition(field, details) {
        this.ensureFieldsWrapped(details.objectType);
        field._requiredUsertType = this.args.requires;
    }

    ensureFieldsWrapped(objectType) {
        // Mark the GraphQLObjectType object to avoid re-wrapping:
        if (objectType._userTypeFieldsWrapped) return;
        objectType._userTypeFieldsWrapped = true;

        const fields = objectType.getFields();

        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const { resolve = defaultFieldResolver } = field;
            field.resolve = async function (...args) {
                // Get the required Role from the field first, falling back
                // to the objectType if no Role is required by the field:
                const requiredPerm =
                    field._requiredUsertType ||
                    objectType._requiredUsertType;

                if (!requiredPerm) {
                    return resolve.apply(this, args);
                }

                const context = args[2];
                const user = context.user
                if (!user.type == requiredPerm) {
                    throw new Error("Forbidden");
                }

                return resolve.apply(this, args);
            };
        });
    }
}
module.exports = userTypeDirective