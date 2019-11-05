<template>
  <div v-if="!!test">
    <md-card>
      <md-card-content>
        <md-toolbar md-elevation="0">
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Attempts</h1>
          </div>
          <div class="md-toolbar-section-end">
            <div v-show="selected">
              <md-button
                class="md-icon-button md-accent md-raised"
                :to="'/faculty/evaluate_attempt/'+selected"
              >
                <md-icon>edit</md-icon>
              </md-button>
              <md-button
                class="md-icon-button md-accent md-raised"
                :to="'/faculty/view_test_result/'+selected"
              >
                <md-icon>remove_red_eye</md-icon>
              </md-button>
            </div>
          </div>
        </md-toolbar>
        <md-table v-model="test.attempts" @md-selected="onSelect">
          <md-table-row
            slot="md-table-row"
            slot-scope="{ item }"
            :class="getClass(item.id)"
            md-selectable="single"
            md-auto-select
          >
            <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Name">{{ item.student.name }}</md-table-cell>
            <md-table-cell md-label="Marks">{{ item.marks }}</md-table-cell>
            <md-table-cell
              md-label="Created at"
              md-sort-by="created_at"
            >{{ (new Date(item.created_at)).toUTCString() }}</md-table-cell>
            <md-table-cell
              md-label="Updated at"
              md-sort-by="updated_at"
            >{{ (new Date(item.updated_at)).toUTCString() }}</md-table-cell>
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
    test: {
      query: gql`
        query getTest($id: ID!) {
          test(id: $id) {
            id
            name
            attempts {
              id
              student {
                id
                usn
                name
              }
              marks
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
    getClass(id) {
      return { "md-primary": id == this.selected };
    },
    onSelect(item) {
      if (!item) return (this.selected = null);
      this.selected = item.id;
    }
  }
};
</script>

<style>
</style>