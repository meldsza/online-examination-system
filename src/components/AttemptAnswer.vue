<template>
  <div v-if="!!answer">
    <div v-if="answer.question.schema.type == 'mcq'">
      <md-radio
        v-for="option in answer.question.schema.options"
        v-model="answer.data"
        :key="answer.id+option"
        :value="option"
      >{{option}}</md-radio>
    </div>
    <div v-if="answer.question.schema.type == 'subjective'">
      <md-field>
        <label>Answer</label>
        <md-textarea v-model="answer.data" md-autogrow></md-textarea>
      </md-field>
    </div>
    <md-button @click="submit">Submit</md-button>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  apollo: {
    answer: {
      query: gql`
        query getAnswer($id: ID!) {
          answer(id: $id) {
            id
            question
            data
          }
        }
      `,
      variables() {
        return { id: this.answer_id };
      }
    }
  },
  props: {
    answer_id: {}
  },
  methods: {
    submit() {}
  }
};
</script>

<style>
</style>