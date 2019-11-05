<template>
  <form autocomplete="off" @submit.prevent>
    <md-autocomplete
      :md-options="options"
      @md-changed="getOptions"
      @md-selected="(v)=>$emit('input', v)"
      md-input-name="name"
      md-input-id="id"
      @md-opened="getOptions"
    >
      <label>Test</label>
      <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}</template>
    </md-autocomplete>
  </form>
</template>

<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      options: []
    };
  },
  mounted() {
    this.getOptions();
  },
  methods: {
    async sanitize(p) {
      let data = await p;
      return data.data.tests;
    },
    getOptions(searchTerm) {
      const querygql = gql`
        query($name: String) {
          tests(name: $name) {
            id
            name
          }
        }
      `;
      this.options = this.sanitize(
        this.$apollo.query({ query: querygql, variables: { name: searchTerm } })
      );
    }
  },
  computed: {}
};
</script>

<style lang="scss">
.md-menu-content {
  z-index: 11;
}
</style>