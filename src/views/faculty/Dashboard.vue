<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Dashboard</div>
    </md-card-header>
    <md-card-content>
      <md-list>
        <md-list-item>
          <span class="md-list-item-text">Student</span>
          <md-badge class="md-primary" :md-content="studentCount" />
        </md-list-item>
        <md-list-item>
          <span class="md-list-item-text">Faculty</span>
          <md-badge class="md-primary" :md-content="facultyCount" />
        </md-list-item>
        <md-list-item>
          <span class="md-list-item-text">Test</span>
          <md-badge class="md-primary" :md-content="testCount" />
        </md-list-item>
      </md-list>
    </md-card-content>
  </md-card>
</template>

<script>
import gql from "graphql-tag";

export default {
  apollo: {
    testCount: gql`
      query {
        testCount
      }
    `,
    facultyCount: gql`
      query {
        facultyCount
      }
    `,
    studentCount: gql`
      query {
        studentCount
      }
    `
  }
};
</script>

<style>
</style>