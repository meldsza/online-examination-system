<template>
  <div>
    <md-card>
      <md-card-content>
        <md-toolbar md-elevation="0">
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Students</h1>
          </div>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-accent md-raised" to="/faculty/create_student/">
              <md-icon>add</md-icon>
            </md-button>
            <div v-show="selected">
              <md-button
                class="md-icon-button md-accent md-raised"
                :to="'/faculty/edit_student/'+selected"
              >
                <md-icon>edit</md-icon>
              </md-button>
            </div>
          </div>
        </md-toolbar>
        <md-table
          v-if="!!students"
          v-model="students"
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
            <md-table-cell md-label="Username" md-sort-by="username">{{ item.username }}</md-table-cell>
            <md-table-cell md-label="USN" md-sort-by="usn">{{ item.usn }}</md-table-cell>
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
    students: gql`
      query {
        students {
          id
          name
          username
          usn
          created_at
          updated_at
        }
      }
    `
  },
  data() {
    return {
      selected: null
    };
  },
  mounted() {
    this.$apollo.queries.students.refetch();
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