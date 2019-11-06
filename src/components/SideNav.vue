<template>
  <md-list v-if="me == undefined">
    <md-list-item to="/faculty/login">Login as Faculty</md-list-item>

    <md-list-item to="/student/login">
      <span class="md-list-item-text">Login as Student</span>
    </md-list-item>
  </md-list>
  <md-list v-else-if="me.__typename == 'Faculty'">
    <md-list-item to="/faculty">
      <span class="md-list-item-text">Dashboard</span>
    </md-list-item>
    <md-list-item to="/faculty/tests">Tests</md-list-item>
    <md-list-item to="/faculty/groups">Groups</md-list-item>
    <md-list-item to="/faculty/students" v-if="me.permissions.includes('MANAGE_STUDENTS')">Students</md-list-item>
    <md-list-item to="/faculty/faculties" v-if="me.permissions.includes('MANAGE_FACULTY')">Faculties</md-list-item>
    <md-list-item @click="logout">
      <span class="md-list-item-text">Logout</span>
    </md-list-item>
  </md-list>
  <md-list v-else-if="me.__typename == 'Student'">
    <md-list-item to="/student">
      <span class="md-list-item-text">Dashboard</span>
    </md-list-item>

    <md-list-item @click="logout">
      <span class="md-list-item-text">Logout</span>
    </md-list-item>
  </md-list>
</template>

<script>
import { onLogout } from "@/vue-apollo";
import gql from "graphql-tag";
export default {
  name: "SideNav",
  apollo: {
    me: gql`
      query {
        me {
          id
          name
          username
          __typename
          ... on Faculty {
            permissions
          }
        }
      }
    `
  },
  methods: {
    logout() {
      onLogout(this.$apollo.provider.defaultClient);
    }
  }
};
</script>

<style>
</style>