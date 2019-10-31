<template>
  <div>
    <md-card v-if="!!editableQuestion">
      <md-card-content>
        <md-field>
          <label>Type</label>
          <md-select v-model="editableQuestion.schema.type" @md-selected="save">
            <md-option value="subjective">Subjective</md-option>
            <md-option value="mcq">MCQ</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label>Desciption</label>
          <md-textarea v-model="editableQuestion.schema.description" @input="save" md-autogrow></md-textarea>
        </md-field>

        <div v-if="editableQuestion.schema.type =='mcq'">
          <md-card>
            <md-card-header>
              <div>Options</div>
            </md-card-header>
            <md-card-content>
              <md-field>
                <label>Option 1</label>
                <md-textarea v-model="editableQuestion.schema.options[1]" @input="save" md-autogrow></md-textarea>
              </md-field>
              <md-field>
                <label>Option 2</label>
                <md-textarea v-model="editableQuestion.schema.options[2]" @input="save" md-autogrow></md-textarea>
              </md-field>
              <md-field>
                <label>Option 3</label>
                <md-textarea v-model="editableQuestion.schema.options[3]" @input="save" md-autogrow></md-textarea>
              </md-field>
              <md-field>
                <label>Option 4</label>
                <md-textarea v-model="editableQuestion.schema.options[4]" @input="save" md-autogrow></md-textarea>
              </md-field>
            </md-card-content>
          </md-card>
        </div>
      </md-card-content>
    </md-card>
    <br />
  </div>
</template>

<script>
import gql from "graphql-tag";
//const loadlash = require("lodash");
export default {
  apollo: {
    question: {
      query: gql`
        query GetQuestion($questionID: ID!) {
          question(id: $questionID) {
            id
            schema {
              type
              description
              options
              correct_option
            }
          }
        }
      `,
      variables() {
        return {
          questionID: this.question_id
        };
      },
      result(ApolloQueryResult) {
        this.editableQuestion = ApolloQueryResult.data.question;
      }
    }
  },
  data() {
    return {
      editableQuestion: null
    };
  },
  props: {
    question_id: {}
  },
  methods: {
    save() {
      const mutationgql = gql`
        mutation saveQuestion($questionID: ID!, $questionSchema: JSON!) {
          saveQuestion(id: $questionID, schema: $questionSchema) {
            id
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: mutationgql,
          variables: {
            questionID: this.question_id,
            questionSchema: this.editableQuestion.schema
          }
        })
        .then(() => {
          // Result
          //this.$apollo.queries.question.refetch();
        })
        .catch(console.error);
    }
  }
};
</script>

<style>
</style>