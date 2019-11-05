<template>
  <form class="md-layout md-alignment-center-center" @submit.prevent="login">
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Student Login</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-100">
            <md-field>
              <label for="username">Username</label>
              <md-input
                name="username"
                id="username"
                autocomplete="username"
                :disabled="sending"
                v-model="form.username"
              />
            </md-field>
          </div>

          <div class="md-layout-item md-size-100">
            <md-field>
              <label for="password">Password</label>
              <md-input
                name="password"
                id="password"
                type="password"
                :disabled="sending"
                autocomplete="password"
                v-model="form.password"
              />
            </md-field>
          </div>
        </div>
      </md-card-content>
      <center>
        <md-button type="submit" class="md-primary md-raised" :disabled="sending">Login</md-button>
      </center>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
    </md-card>
  </form>
</template>

<script>
import axios from "@/axios";
import { onLogin } from "@/vue-apollo";
export default {
  data() {
    return {
      sending: false,
      form: {}
    };
  },
  methods: {
    login() {
      this.sending = true;
      axios
        .post("/student/login", this.form)
        .then(res => {
          onLogin(this.$apollo.provider.defaultClient, res.data.token);

          this.$router.push("/student");
        })
        .catch(err => {
          if (err.response.status == 401) {
            this.$toasted.show("Invalid credentials");
          } else {
            this.$toasted.show("Error", err);
          }
        })
        .finally(() => {
          this.sending = false;
        });
    }
  }
};
</script>