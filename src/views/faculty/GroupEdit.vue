<template>
  <div>
    <md-card v-if="!!group">
      <md-card-header>
        <h1 class="md-title">Edit Group - {{ group.name}}</h1>
      </md-card-header>
      <md-card-content>
        <md-table v-model="group.students" md-card>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h4 class="md-title">Students</h4>
            </div>
            <div class="md-toolbar-section-end">
              <md-button
                class="md-icon-button md-accent md-raised"
                @click="addStudentPrompt = true"
              >
                <md-icon>add</md-icon>
              </md-button>
            </div>
          </md-table-toolbar>

          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="USN">{{ item.usn }}</md-table-cell>
            <md-table-cell md-label="Delete">
              <md-button class="md-icon-button md-accent md-raised" @click="deleteStudent(item.id)">
                <md-icon>remove</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <br />
        <md-table v-model="group.faculties" md-card>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h4 class="md-title">Faculties</h4>
            </div>
            <div class="md-toolbar-section-end">
              <md-button
                class="md-icon-button md-accent md-raised"
                @click="addFacultyPrompt = true"
              >
                <md-icon>add</md-icon>
              </md-button>
            </div>
          </md-table-toolbar>

          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Delete">
              <md-button class="md-icon-button md-accent md-raised" @click="deleteFaculty(item.id)">
                <md-icon>remove</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>

        <br />
        <md-table v-model="group.tests" md-card>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h4 class="md-title">Tests</h4>
            </div>
            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button md-accent md-raised" @click="addTestPrompt = true">
                <md-icon>add</md-icon>
              </md-button>
            </div>
          </md-table-toolbar>

          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Delete">
              <md-button class="md-icon-button md-accent md-raised" @click="deleteTest(item.id)">
                <md-icon>remove</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-card-content>
    </md-card>
    <md-progress-spinner v-else md-mode="indeterminate"></md-progress-spinner>
    <md-dialog :md-active.sync="addStudentPrompt">
      <md-dialog-title>Select Student</md-dialog-title>
      <md-dialog-content>
        <SelectStudent v-model="selectedStudent"></SelectStudent>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="addStudentPrompt = false">Close</md-button>
        <md-button
          class="md-primary"
          :disabled="!selectedStudent"
          @click="addStudentPrompt = false;addStudent(selectedStudent.id)"
        >Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog :md-active.sync="addFacultyPrompt">
      <md-dialog-title>Select Faculty</md-dialog-title>
      <md-dialog-content>
        <SelectFaculty v-model="selectedFaculty"></SelectFaculty>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="addFacultyPrompt = false">Close</md-button>
        <md-button
          class="md-primary"
          :disabled="!selectedFaculty"
          @click="addFacultyPrompt = false;addFaculty(selectedFaculty.id)"
        >Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog :md-active.sync="addTestPrompt">
      <md-dialog-title>Select Test</md-dialog-title>
      <md-dialog-content>
        <SelectTest v-model="selectedTest"></SelectTest>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="addTestPrompt = false">Close</md-button>
        <md-button
          class="md-primary"
          :disabled="!selectedTest"
          @click="addTestPrompt = false;addTest(selectedTest.id)"
        >Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import gql from "graphql-tag";
import SelectStudent from "../../components/SelectStudent";
import SelectFaculty from "../../components/SelectFaculty";
import SelectTest from "../../components/SelectTest";
export default {
  components: { SelectStudent, SelectFaculty, SelectTest },
  data() {
    return {
      addStudentPrompt: false,
      addFacultyPrompt: false,
      addTestPrompt: false,
      selectedTest: null,
      selectedFaculty: null,
      selectedStudent: null
    };
  },
  apollo: {
    group: {
      query: gql`
        query getGroup($id: ID!) {
          group(id: $id) {
            id
            name
            faculties {
              id
              name
            }
            students {
              id
              name
              usn
            }
            tests {
              id
              name
              course {
                id
                code
                name
              }
            }
            created_at
            updated_at
          }
        }
      `,
      variables() {
        return { id: this.$route.params.id };
      }
    }
  },
  methods: {
    addFaculty(id) {
      const mutationgql = gql`
        mutation addFaculty($groupID: ID!, $facultyID: ID!) {
          addFacultyToGroup(groupID: $groupID, facultyID: $facultyID) {
            id
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: mutationgql,
          variables: {
            groupID: this.group.id,
            facultyID: id
          }
        })
        .then(() => {
          // Result
          this.$apollo.queries.group.refetch();
        })
        .catch(console.error);
    },
    addStudent(id) {
      const mutationgql = gql`
        mutation addStudentToGroup($groupID: ID!, $studentID: ID!) {
          addStudentToGroup(groupID: $groupID, studentID: $studentID) {
            id
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: mutationgql,
          variables: {
            groupID: this.group.id,
            studentID: id
          }
        })
        .then(() => {
          // Result
          this.$apollo.queries.group.refetch();
        })
        .catch(console.error);
    },
    addTest(id) {
      const mutationgql = gql`
        mutation addTestToGroup($groupID: ID!, $testID: ID!) {
          addTestToGroup(groupID: $groupID, testID: $testID) {
            id
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: mutationgql,
          variables: {
            groupID: this.group.id,
            testID: id
          }
        })
        .then(() => {
          // Result
          this.$apollo.queries.group.refetch();
        })
        .catch(console.error);
    },
    deleteFaculty(id) {
      const mutationgql = gql`
        mutation removeFacultyFromGroup($groupID: ID!, $facultyID: ID!) {
          removeFacultyFromGroup(groupID: $groupID, facultyID: $facultyID) {
            id
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: mutationgql,
          variables: {
            groupID: this.group.id,
            facultyID: id
          }
        })
        .then(() => {
          // Result
          this.$apollo.queries.group.refetch();
        })
        .catch(console.error);
    },
    deleteStudent(id) {
      const mutationgql = gql`
        mutation removeStudentFromGroup($groupID: ID!, $studentID: ID!) {
          removeStudentFromGroup(groupID: $groupID, studentID: $studentID) {
            id
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: mutationgql,
          variables: {
            groupID: this.group.id,
            studentID: id
          }
        })
        .then(() => {
          // Result
          this.$apollo.queries.group.refetch();
        })
        .catch(console.error);
    },
    deleteTest(id) {
      const mutationgql = gql`
        mutation removeTestFromGroup($groupID: ID!, $testID: ID!) {
          removeTestFromGroup(groupID: $groupID, testID: $testID) {
            id
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: mutationgql,
          variables: {
            groupID: this.group.id,
            testID: id
          }
        })
        .then(() => {
          // Result
          this.$apollo.queries.group.refetch();
        })
        .catch(console.error);
    }
  }
};
</script>

<style>
</style>