<template>
  <div>
    <md-card v-if="attempt">
      <md-card-header>
        <div class="md-title">{{attempt.test.name}}</div>
      </md-card-header>
      <md-card-content>
        <div v-for="answer in attempt.answers" :key="attempt.id+answer.id">
          <md-card>
            <md-card-content>
              <p>{{ answer.question.schema.description}}</p>

              <p>Given Answer: {{ answer.data}}</p>
              <md-field>
                <label>Marks (Max: {{answer.question.schema.marks}})</label>
                <md-input type="number" v-model="answer.marks" @input="saveMarks(answer)"></md-input>
              </md-field>
            </md-card-content>
          </md-card>
          <br />
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  apollo: {
    attempt: {
      query: gql`
        query getAttempt($id: ID!) {
          attempt(id: $id) {
            id
            test {
              id
              name
              settings
              questions {
                id
                schema {
                  description
                  options
                  type
                }
              }
            }
            answers {
              id
              question {
                id
                schema {
                  description
                  options
                  type
                  marks
                }
              }
              marks
              data
            }
            submitted_at
            created_at
          }
        }
      `,
      variables() {
        return { id: this.$route.params.id };
      }
    }
  },
  methods: {
    saveMarks(answer) {
      const mut = gql`
        mutation saveMarks($id: ID!, $marks: Float!) {
          evaluateAnswer(id: $id, marks: $marks) {
            id
            data
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: mut,
          variables: { id: answer.id, marks: parseFloat(answer.marks) }
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