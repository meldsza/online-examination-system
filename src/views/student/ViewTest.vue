<template>
  <div v-if="!!test">
    <md-card>
      <md-card-content>
        <md-table v-model="myattempts">
          <md-table-toolbar md-elevation="0">
            <div class="md-toolbar-section-start">
              <h1 class="md-title">Attempts</h1>
            </div>
            <div class="md-toolbar-section-end">
              <md-button
                class="md-accent md-raised"
                @click="attemptTest"
                :disabled="!attemptable || !test.settings.pratice_mode && (myattempts.length >0 )"
              >Attempt Test</md-button>
            </div>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Name">{{ item.student.name }}</md-table-cell>
            <md-table-cell md-label="Marks">{{ item.marks || 'N/A' }}</md-table-cell>
            <md-table-cell
              md-label="Created at"
              md-sort-by="created_at"
            >{{ (new Date(item.created_at)).toUTCString() }}</md-table-cell>
            <md-table-cell md-label="Action">
              <md-button
                :to="'/student/attempt_test/'+item.id"
                v-if="!item.submitted_at || (getTimeDiffInSec(item.submitted_at, getCurrentTimeFromServer())>0)"
              >Resume Attempt</md-button>
              <md-button
                v-else-if="test.settings.enable_review"
                :to="'/student/attempt_review/'+item.id"
              >Review</md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  apollo: {
    me: gql`
      query {
        me {
          id
          name
        }
      }
    `,
    test: {
      query: gql`
        query getTest($id: ID!) {
          test(id: $id) {
            id
            settings
            name
            attempts {
              id
              student {
                id
                usn
                name
              }
              marks
              submitted_at
              created_at
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
  mounted() {
    this.$apollo.queries.test.refetch();
  },
  data() {
    return {
      test: false
    };
  },
  methods: {
    attemptTest() {
      const mutationgql = gql`
        mutation attemptTest($id: ID!) {
          attemptTest(id: $id) {
            id
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: mutationgql,
          variables: {
            id: this.test.id
          }
        })
        .then(data => {
          // Result
          this.$router.push(
            "/student/attempt_test/" + data.data.attemptTest.id
          );
        })
        .catch(console.error);
    }
  },
  computed: {
    myattempts() {
      return this.test.attempts.filter(a => a.student.id == this.me.id);
    },
    attemptable() {
      if (this.test)
        return (
          (!this.test.settings.start ||
            this.getTimeDiffInSec(
              this.getCurrentTimeFromServer(),
              this.test.settings.start
            ) > 0) &&
          (!this.test.settings.end ||
            this.getTimeDiffInSec(
              this.test.settings.end,
              this.getCurrentTimeFromServer()
            ) > 0)
        );
      else return false;
    }
  }
};
</script>

<style>
</style>