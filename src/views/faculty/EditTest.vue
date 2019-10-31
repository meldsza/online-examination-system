<template>
  <div>
    <md-card v-if="!!editableTest">
      <md-card-header>
        <h1 class="md-title">Edit Test - {{ editableTest.name}}</h1>
      </md-card-header>
      <md-card-content>
        <md-card>
          <md-card-header>
            <h6 class="md-title">Test Settings</h6>
          </md-card-header>
          <md-card-content>
            <md-checkbox v-model="editableTest.settings.pratice_mode">Pratice mode</md-checkbox>
            <md-checkbox v-model="editableTest.settings.kiosk">Kiosk Mode</md-checkbox>
            <md-checkbox v-model="editableTest.settings.enable_review">Enable Review</md-checkbox>
          </md-card-content>
          <md-card-actions>
            <md-button class="md-primary" @click="saveSettings">Save</md-button>
          </md-card-actions>
        </md-card>
        <md-card>
          <md-card-header>
            <h6 class="md-title">Questions</h6>
          </md-card-header>
          <md-card-content>
            <EditQuestion
              v-for="question in editableTest.questions"
              :key="question.qno"
              :question_id="question.id"
            ></EditQuestion>
          </md-card-content>
        </md-card>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-primary" @click="addQuestion">Add Question</md-button>
      </md-card-actions>
    </md-card>
    <md-progress-spinner v-else md-mode="indeterminate"></md-progress-spinner>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      editableTest: null
    };
  },
  apollo: {
    test: {
      query: gql`
        query getTest($id: Int!) {
          test(id: $id) {
            id
            name
            questions {
              qno
              schema
            }
            settings
            faculties
            created_at
            updated_at
          }
        }
      `,
      variables() {
        return { id: this.$route.params.id };
      },
      result(ApolloQueryResult) {
        this.editableTest = ApolloQueryResult.data.test;
      }
    }
  },
  methods: {
    addQuestion() {
      let qno = 1;
      if (this.test.questions.length > 0)
        qno = this.test.questions.reduce((a, q) => (a < q.qno ? q.qno : a)) + 1;

      const mutationgql = gql`
        mutation addQuestion($testID: ID!, $qno: Int!) {
          addQuestion(test_id: $testID, qno: $qno) {
            id
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: mutationgql,
          variables: {
            testID: this.test.id,
            qno: qno
          }
        })
        .then(() => {
          // Result
          this.$apollo.queries.test.refresh();
        })
        .catch(console.error);
    },
    saveSettings() {
      const mutationgql = gql`
        mutation saveSettings($testID: ID!, $settings: JSON!) {
          saveTestSettings(id: $testID, settings: $settings) {
            id
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: mutationgql,
          variables: {
            testID: this.test.id,
            settings: this.editableTest.settings
          }
        })
        .then(() => {
          // Result
          this.$apollo.queries.test.refresh();
        })
        .catch(console.error);
    }
  }
};
</script>

<style>
</style>