<template>
  <md-card>
    <md-card-header>
      <div class="md-title">Create Test</div>
    </md-card-header>

    <md-card-content>
      <form @submit.prevent="addTest">
        <md-field>
          <label>Name</label>
          <md-input v-model="form.name" required></md-input>
        </md-field>
        <md-field>
          <label>Course</label>
          <md-select v-model="form.course_id" required>
            <md-option
              :key="'CourseCreateTest'+course.id"
              v-for="course in courses"
              :value="course.id"
            >{{course.name}}</md-option>
          </md-select>
        </md-field>
        <md-button type="submit" class="md-primary md-raised">Create</md-button>
      </form>
    </md-card-content>
  </md-card>
</template>

<script>
import gql from "graphql-tag";
export default {
  apollo: {
    courses: gql`
      query {
        courses {
          id
          name
        }
      }
    `
  },
  data() {
    return {
      form: {}
    };
  },
  methods: {
    addTest() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($name: String!, $course_id: ID!) {
              createTest(name: $name, course_id: $course_id) {
                id
                name
              }
            }
          `,
          // Parameters
          variables: this.form
        })
        .then(data => {
          // Result
          console.log(data);
          this.$toasted.show("Created test successfully");
          this.$router.push("/faculty/editTest/" + data.data.createTest.id);
        })
        .catch(error => {
          // Error
          console.error(error);
          this.$toasted.show("Couldnt create test");
        });
    }
  }
};
</script>

<style>
</style>