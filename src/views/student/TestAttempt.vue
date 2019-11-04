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
            <AttemptAnswer
              :answer="getAnswer(question.id)"
              :attempt_id="attempt.id"
              :question="question"
            ></AttemptAnswer>
          </md-card-content>
        </md-card>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import gql from "graphql-tag";
const moment = require("moment");
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
                schema
              }
            }
            answers {
              data
            }
            created_at
          }
        }
      `,
      variables() {
        return { id: this.$route.params.id };
      }
    }
  },
  data() {
    return {
      interval: null
    };
  },
  mounted() {
    this.interval = setInterval(this.checkTimer, 1000);
  },
  methods: {
    getAnswer(qid) {
      return this.attempt.test.attempts.find(a => a.question_id == qid);
    },
    checkTimer() {
      if (this.attempt.test.duration) {
        if (
          this.attempt.test.duration <
          Math.abs(
            moment(this.attempt.created_at).diff(
              this.getCurrentTimeFromServer()
            )
          )
        ) {
          this.$router.push("/student");
        }
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style>
</style>