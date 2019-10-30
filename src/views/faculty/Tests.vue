<template>
  <md-table v-if="!!me" v-model="me.tests" md-sort="updated_at" md-sort-order="desc" md-card>
    <md-table-toolbar>
      <h1 class="md-title">Tests</h1>
    </md-table-toolbar>
    <md-table-toolbar slot="md-table-alternate-header">
      <div class="md-toolbar-section-start">Selected</div>

      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button">
          <md-icon>delete</md-icon>
        </md-button>
      </div>
    </md-table-toolbar>

    <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" md-auto-select>
      <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
      <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
      <md-table-cell md-label="Created at" md-sort-by="created_at">{{ item.created_at }}</md-table-cell>
      <md-table-cell md-label="Updated at" md-sort-by="updated_at">{{ item.updated_at }}</md-table-cell>
    </md-table-row>
  </md-table>
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
  mounted() {
    this.$apollo.queries.me.refresh();
  }
};
</script>

<style>
</style>