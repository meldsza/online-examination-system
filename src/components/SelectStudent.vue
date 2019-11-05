<template>
  <form autocomplete="off" @submit.prevent>
    <md-autocomplete
      :md-options="options"
      md-input-name="name"
      md-input-id="id"
      @md-selected="(v)=>$emit('input', v)"
      @md-changed="getOptions"
      @md-opened="getOptions"
    >
      <label>Student</label>
      <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}</template>
    </md-autocomplete>
  </form>
</template>

<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      fvalue: null,
      options: []
    };
  },
  mounted() {
    this.getOptions();
  },
  methods: {
    async sanitize(p) {
      let data = await p;
      return data.data.students;
    },
    getOptions(searchTerm) {
      const querygql = gql`
        query($name: String) {
          students(name: $name) {
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