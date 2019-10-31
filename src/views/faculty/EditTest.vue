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
        </md-card>
        <md-card>
          <md-card-header>
            <h6 class="md-title">Questions</h6>
          </md-card-header>
          <md-card-content>
            <md-card v-for="question in editableTest.questions" :key="question.qno">
              <md-card-content>
                <md-field>
                  <label>Desciption</label>
                  <md-textarea v-model="question.schema.description"></md-textarea>
                </md-field>
                <md-card>
                  <md-card-header>
                    <div>Options</div>
                  </md-card-header>
                  <md-card-content></md-card-content>
                </md-card>
              </md-card-content>
            </md-card>
          </md-card-content>
        </md-card>
      </md-card-content>
    </md-card>
    <md-progress-spinner v-else md-mode="indeterminate"></md-progress-spinner>
  </div>
</template>

<script>
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
      result(ApolloQueryResult, key) {
        this.editableTest = ApolloQueryResult.data;
      }
    }
  }
};
</script>

<style>
</style>