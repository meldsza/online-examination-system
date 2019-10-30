<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Dashboard</div>
    </md-card-header>

    <md-card-content>
      <div v-if="!!me">
        <md-card :key="test.id" v-for="test in me.tests">
          <md-card-header>
            <div class="md-title">{{test.name}}</div>
            <md-card-content></md-card-content>
          </md-card-header>
        </md-card>
      </div>
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
            tests {
              id
              name
            }
          }
        }
      }
    `
  }
};
</script>

<style>
</style>