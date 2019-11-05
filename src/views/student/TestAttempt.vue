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

              <AttemptAnswer
                :answer="getAnswer(question.id)"
                :attempt_id="attempt.id"
                :question="question"
              ></AttemptAnswer>
            </md-card-content>
          </md-card>
          <br />
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-primary md-raised" @click="finishAttempt">Finish Attempt</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import gql from "graphql-tag";
import AttemptAnswer from "../../components/AttemptAnswer";
export default {
  components: { AttemptAnswer },
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
              question {
                id
              }
              data
            }
            submitted_at
            created_at
          }
        }
      `,
      variables() {
        return { id: this.$route.params.id };
      },
      result() {
        this.checkTimer(true);
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
      return this.attempt.answers.find(a => a.question.id == qid);
    },
    finishAttempt() {
      const mutationgql = gql`
        mutation finishAttempt($id: ID!) {
          finishAttempt(id: $id) {
            id
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: mutationgql,
          variables: {
            id: this.attempt.id
          }
        })
        .then(() => {
          // Result
          this.$router.push("/student/");
        })
        .catch(console.error);
    },
    checkTimer(initial) {
      if (this.attempt) {
        console.log(
          this.getTimeDiffInSec(
            this.attempt.submitted_at,
            this.getCurrentTimeFromServer()
          )
        );
        if (
          this.getTimeDiffInSec(
            this.attempt.submitted_at,
            this.getCurrentTimeFromServer()
          ) < 0
        ) {
          if (initial) this.$router.push("/student");
          else this.finishAttempt();
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