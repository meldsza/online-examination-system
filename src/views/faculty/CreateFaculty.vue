<template>
  <md-card>
    <md-card-content>
      <form @submit.prevent="save">
        <md-field>
          <label>Name</label>
          <md-input v-model="form.name" type="text" required></md-input>
        </md-field>
        <md-field>
          <label>Username</label>
          <md-input v-model="form.username" type="text" required></md-input>
        </md-field>
        <md-field>
          <label>Designation</label>
          <md-input v-model="form.designation" type="text" required></md-input>
        </md-field>
        <md-field>
          <label>Email</label>
          <md-input v-model="form.email" type="text"></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input v-model="form.password" type="password" required></md-input>
        </md-field>
      </form>
    </md-card-content>
    <md-card-actions>
      <md-button class="md-primary md-raised" @click="save">Save</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      form: {
        name: null,
        username: null,
        password: null,
        designation: null,
        email: null
      }
    };
  },
  methods: {
    save() {
      const mutationgql = gql`
        mutation createFaculty(
          $name: String!
          $username: String!
          $designation: String!
          $email: String
          $password: String!
        ) {
          createFaculty(
            name: $name
            username: $username
            designation: $designation
            email: $email
            password: $password
          ) {
            id
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: mutationgql,
          variables: this.form
        })
        .then(() => {
          this.$toasted.show("Sucessfully Saved");
          this.$router.push("/faculty/faculties");
        })
        .catch(() => this.$toasted.show("Insuffient perms"));
    }
  }
};
</script>

<style>
</style>