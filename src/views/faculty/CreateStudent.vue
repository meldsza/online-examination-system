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
          <label>USN</label>
          <md-input v-model="form.usn" type="text" required></md-input>
        </md-field>
        <md-field>
          <label>Email</label>
          <md-input v-model="form.email" type="text"></md-input>
        </md-field>
        <md-datepicker v-model="form.dob">
          <label>Date of Birth</label>
        </md-datepicker>
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
        dob: null,
        usn: null,
        email: null
      }
    };
  },
  methods: {
    save() {
      const mutationgql = gql`
        mutation createStudent(
          $id: ID!
          $name: String!
          $username: String!
          $usn: String!
          $email: String
          $dob: Date
          $password: String!
        ) {
          createStudent(
            id: $id
            name: $name
            username: $username
            usn: $designation
            email: $email
            dob: $dob
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
          this.$router.push("/faculty/students");
        })
        .catch(() => this.$toasted.show("Insuffient perms"));
    }
  }
};
</script>

<style>
</style>