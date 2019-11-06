<template>
  <md-card>
    <md-card-content>
      <form @submit.prevent="save">
        <md-field>
          <label>Name</label>
          <md-input v-model="form.name" type="text" required></md-input>
        </md-field>
        <md-field>
          <label>Username</label>
          <md-input v-model="form.username" type="text" required></md-input>
        </md-field>
        <md-field>
          <label>Designation</label>
          <md-input v-model="form.designation" type="text" required></md-input>
        </md-field>
        <md-field>
          <label>Email</label>
          <md-input v-model="form.email" type="text"></md-input>
        </md-field>
      </form>
    </md-card-content>
    <md-card-actions>
      <md-button class="md-primary md-raised" @click="save">Save</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import gql from "graphql-tag";
export default {
  apollo: {
    faculty: {
      query: gql`
        query($id: ID!) {
          faculty(id: $id) {
            id
            name
            username
            designation
            email
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.id
        };
      },
      result(ApolloQueryResult) {
        this.form = ApolloQueryResult.data.faculty;
      }
    }
  },
  data() {
    return {
      form: {
        name: null,
        username: null,
        designation: null,
        email: null
      }
    };
  },
  methods: {
    save() {
      const mutationgql = gql`
        mutation updateFaculty(
          $id: ID!
          $name: String
          $username: String
          $designation: String
          $email: String
        ) {
          updateFaculty(
            id: $id
            name: $name
            username: $username
            designation: $designation
            email: $email
          ) {
            id
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: mutationgql,
          variables: this.form
        })
        .then(() => {
          this.$toasted.show("Sucessfully Saved");
          this.$router.push("/faculty/faculties");
        })
        .catch(() => this.$toasted.show("Insuffient perms"));
    }
  }
};
</script>

<style>
</style>