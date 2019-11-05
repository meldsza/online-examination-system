<template>
  <div>
    <md-card v-if="attempt">
      <md-card-header>
        <div class="md-title">{{attempt.test.name}}</div>
      </md-card-header>
      <md-card-content>
        <div v-for="question in attempt.test.questions" :key="attempt.id+question.id">
          <md-card>
            <md-card-content>
              <p>{{question.schema.description}}</p>
              <div v-if="getAnswer(question.id)">
                <p v-if="getAnswer(question.id)">Given Answer: {{ getAnswer(question.id).data}}</p>
                <p>Marks: {{getAnswer(question.id).marks }}</p>
              </div>
              <div v-else>
                <p>Question Not Attempted</p>
              </div>
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
                  marks
                }
              }
            }
            answers {
              question {
                id
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
    getAnswer(qid) {
      return this.attempt.answers.find(a => a.question.id == qid);
    }
  }
};
</script>

<style>
</style>