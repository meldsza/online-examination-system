<template>
  <md-list v-if="me == undefined">
    <md-list-item to="/faculty/login">Login as Faculty</md-list-item>

    <md-list-item to="/student/login">
      <span class="md-list-item-text">Login as Student</span>
    </md-list-item>
  </md-list>
  <md-list v-else-if="me.__typename == 'Faculty'">
    <md-list-item to="/faculty/dashboard">
      <span class="md-list-item-text">Dashboard</span>
    </md-list-item>

    <md-list-item @click="logout">
      <span class="md-list-item-text">Logout</span>
    </md-list-item>
  </md-list>
  <md-list v-else-if="me.__typename == 'Student'">
    <md-list-item to="/student/dashboard">
      <span class="md-list-item-text">Dashboard</span>
    </md-list-item>

    <md-list-item @click="logout">
      <span class="md-list-item-text">Logout</span>
    </md-list-item>
  </md-list>
</template>

<script>
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
        }
      }
    `
  },
  methods: {
    logout() {}
  }
};
</script>

<style>
</style>