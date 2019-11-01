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
            <md-switch
              v-model="editableTest.settings.pratice_mode"
              @change="saveSettings"
            >Pratice mode</md-switch>
            <md-switch v-model="editableTest.settings.kiosk" @change="saveSettings">Kiosk Mode</md-switch>
            <md-switch
              v-model="editableTest.settings.enable_review"
              @change="saveSettings"
            >Enable Review</md-switch>
            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <md-field>
                  <label>Duration (in minutes)</label>
                  <md-input
                    v-model="editableTest.settings.duration"
                    type="number"
                    @input="saveSettings"
                  ></md-input>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <md-input
                    type="datetime-local"
                    @input="saveSettings"
                    placeholder="Enter Date time"
                    v-model="editableTest.settings.start"
                  ></md-input>
                  <label>Start Date</label>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <md-input
                    type="datetime-local"
                    placeholder="Enter Date time"
                    @input="saveSettings"
                    v-model="editableTest.settings.end"
                  ></md-input>
                  <label>End Date</label>
                </md-field>
              </div>
            </div>
          </md-card-content>
        </md-card>
        <br />
        <md-card ref="questions">
          <md-card-header>
            <h6 class="md-title">Questions</h6>
          </md-card-header>
          <md-card-content>
            <EditQuestion
              :question_id="question.id"
              v-for="question in editableTest.questions"
              :key="question.id"
              ref="questions"
            ></EditQuestion>
          </md-card-content>
        </md-card>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-primary md-raised" @click="addQuestion">Add Question</md-button>
      </md-card-actions>
    </md-card>
    <md-progress-spinner v-else md-mode="indeterminate"></md-progress-spinner>
  </div>
</template>

<script>
import gql from "graphql-tag";
import EditQuestion from "../../components/EditQuestion";
export default {
  data() {
    return {
      editableTest: null
    };
  },
  components: { EditQuestion },
  apollo: {
    test: {
      query: gql`
        query getTest($id: ID!) {
          test(id: $id) {
            id
            name
            questions {
              id
              qno
              schema {
                description
                options
                correct_option
              }
            }
            settings
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
      if (this.test.questions && this.test.questions.length > 0) {
        qno = Math.max(...this.test.questions.map(q => q.qno));
        qno += 1;
      }
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
          this.$apollo.queries.test.refetch();
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
          this.$apollo.queries.test.refetch();
        })
        .catch(console.error);
    }
  }
};
</script>

<style>
</style>