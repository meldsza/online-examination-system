<template>
  <md-card>
    <md-card-content>
      <md-toolbar md-elevation="0">
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Tests</h1>
        </div>
        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button md-accent md-raised" to="/faculty/createTest">
            <md-icon>add</md-icon>
          </md-button>
          <div v-show="selected">
            <md-button
              class="md-icon-button md-accent md-raised"
              :to="'/faculty/editTest/'+selected"
            >
              <md-icon>edit</md-icon>
            </md-button>
            <md-button
              class="md-icon-button md-accent md-raised"
              :to="'/faculty/view_test_results/'+selected"
            >
              <md-icon>remove_red_eye</md-icon>
            </md-button>
          </div>
        </div>
      </md-toolbar>
      <md-table
        v-if="!!me"
        v-model="me.tests"
        @md-selected="onSelect"
        md-sort="created_at"
        md-sort-order="desc"
      >
        <md-table-row
          slot="md-table-row"
          slot-scope="{ item }"
          :class="getClass(item.id)"
          md-selectable="single"
          md-auto-select
        >
          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
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
</template>

<script>
import gql from "graphql-tag";
export default {
  apollo: {
    me: gql`
      query {
        me {
          ... on Faculty {
            id
            tests {
              id
              name
              created_at
              updated_at
            }
          }
        }
      }
    `
  },
  data() {
    return {
      searchName: null,
      selected: null
    };
  },
  mounted() {
    this.$apollo.queries.me.refetch();
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