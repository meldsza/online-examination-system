<template>
  <div>
    <div v-if="question.schema.type == 'mcq'">
      <md-radio
        v-for="option in question.schema.options"
        v-model="answerData"
        :key="answer.id+option"
        :value="option"
      >{{option}}</md-radio>
    </div>
    <div v-if="answer.question.schema.type == 'subjective'">
      <md-field>
        <label>Answer</label>
        <md-textarea v-model="answerData" md-autogrow></md-textarea>
      </md-field>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    answer: {
      default: {
        data: ""
      }
    },
    question: {}
  },
  data() {
    return {
      answerData: ""
    };
  },
  mounted() {
    this.answerData = this.answer.data;
  },
  methods: {
    submit() {
      const mut = gql`
        mutation saveAnswer($attemptID: ID!, $questionID: ID!, $data: String) {
          answerQuestion(
            attemptID: $attemptID
            questionID: $questionID
            data: $data
          ) {
            id
            data
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: mut,
          variables: {
            attemptID: this.attempt_id,
            questionID: this.question.id,
            data: this.answerData
          }
        })
        .then(() => {
          // Result
          //this.$apollo.queries.question.refetch();
        })
        .catch(console.error);
    }
  },
  watch: {
    answerData() {
      this.submit();
    }
  }
};
</script>

<style>
</style>