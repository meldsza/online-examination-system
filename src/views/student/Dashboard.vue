<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Dashboard</div>
    </md-card-header>

    <md-card-content>
      <div v-if="me!=undefined">
        <md-card :key="group.id" v-for="group in me.groups">
          <md-card-header>
            <div class="md-title">{{group.name}}</div>
            <md-card-content>
              <md-list>
                <md-list-item v-for="test in group.tests" :key="group.id+'-'+test.id">{{test.name}}</md-list-item>
              </md-list>
            </md-card-content>
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
          id
          groups {
            id
            name
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