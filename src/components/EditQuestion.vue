<template>
  <md-card>
    <md-card-content>
      <md-field>
        <label>Desciption</label>
        <md-textarea v-model="editableQuestion.schema.description"></md-textarea>
      </md-field>
      <md-field>
        <label>Type</label>
        <md-select v-model="editableQuestion.schema.type">
          <md-option value="subjective">Subjective</md-option>
          <md-option value="mcq">mcq</md-option>
        </md-select>
      </md-field>
      <div v-if="editableQuestion.schema.type =='mcq'">
        <md-card>
          <md-card-header>
            <div>Options</div>
          </md-card-header>
          <md-card-content>
            <md-field>
              <label>Option 1</label>
              <md-textarea v-model="editableQuestion.schema.options[1]"></md-textarea>
            </md-field>
            <md-field>
              <label>Option 2</label>
              <md-textarea v-model="editableQuestion.schema.options[2]"></md-textarea>
            </md-field>
            <md-field>
              <label>Option 3</label>
              <md-textarea v-model="editableQuestion.schema.options[3]"></md-textarea>
            </md-field>
            <md-field>
              <label>Option 4</label>
              <md-textarea v-model="editableQuestion.schema.options[4]"></md-textarea>
            </md-field>
          </md-card-content>
        </md-card>
      </div>
    </md-card-content>
    <md-card-actions>
      <md-button class="md-icon-button md-primary" @click="save">
        <md-icon>save</md-icon>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import gql from "graphql-tag";
export default {
  apollo: {
    question: {
      query: gql`
        query GetQuestion($questionID: ID!) {
          question(id: $questionID)
        }
      `,
      variables() {
        return {
          questionID: this.question_id
        };
      },
      result(ApolloQueryResult, key) {
        this.editableQuestion = ApolloQueryResult.data.question;
      }
    }
  },
  data() {
    return {
      editableQuestion: null
    };
  },
  methods: {
    save() {
      const mutationgql = gql`
            mutation saveQuestion($questionID:ID! $questionSchema: $JSON!){
                saveQuestion(id:$questionID schema:$questionSchema){
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
        .then(data => {
          // Result
          this.$apollo.queries.question.refresh();
        })
        .catch(console.error);
    }
  }
};
</script>

<style>
</style>