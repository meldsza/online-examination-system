<template>
  <div>
    <md-card v-if="!!attempt">
      <md-card-header>
        <div class="md-title">{{attempt.test.name}}</div>
      </md-card-header>
      <md-card-content>
        <md-card v-for="question in attempt.test.questions" :key="attempt.id+question.id">
          <md-card-content>
            <md-card>
              <md-card-header>
                <b>Description</b>
              </md-card-header>
              <md-card-content>{{question.schema.description}}</md-card-content>
            </md-card>
            <AttemptAnswer v-if="getAnswer(question.id)" :answer_id="getAnswer(question.id)"></AttemptAnswer>
            <md-button @click="attemptQuestion(question.id)">Attempt Question</md-button>
          </md-card-content>
        </md-card>
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
            test
            answers
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
      return this.attempt.test.attempts.find(a => a.question_id == qid);
    },
    attemptQuestion(qid) {
      this.$apollo.queries.attempt.refetch();
    }
  }
};
</script>

<style>
</style>