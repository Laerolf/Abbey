<template>
  <div abbey-token="abbey-login">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">
              {{ $t("login.title") }}
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              <form abbey-token="login-form" @submit.prevent="login">
                <div class="field">
                  <label class="label">{{ $t("login.username") }}</label>
                  <div class="control">
                    <input
                      v-model="username"
                      class="input is-rounded"
                      :class="{ 'is-danger': $v.username.$invalid }"
                      type="text"
                      abbey-token="login-form-username"
                    />
                  </div>
                  <p v-show="$v.username.$invalid" class="help is-danger">
                    Your username is required.
                  </p>
                </div>

                <div class="field">
                  <label class="label">{{ $t("login.password") }}</label>
                  <div class="control">
                    <input
                      v-model="password"
                      class="input is-rounded"
                      :class="{ 'is-danger': $v.password.$invalid }"
                      type="password"
                      abbey-token="login-form-password"
                    />
                  </div>
                  <p v-show="$v.password.$invalid" class="help is-danger">
                    Your password is required.
                  </p>
                </div>

                <div class="control">
                  <button
                    class="button is-primary"
                    :disabled="$v.$invalid"
                    type="submit"
                    abbey-token="login-form-login"
                  >
                    {{ $t("login.actions.loginButton") }}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <footer class="card-footer">
            <router-link
              abbey-token="login-actions-register"
              class="card-footer-item is-link"
              to="/register"
              tag="a"
            >
              {{ $t("login.actions.registerButton") }}
            </router-link>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      username: undefined,
      password: undefined
    };
  },
  validations: {
    username: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    async login() {
      const loginCredentials = {
        username: this.username,
        password: this.password
      };

      try {
        const response = await this.$axiosUnauthenticated.post("login", loginCredentials);

        const { token } = response.data;

        if (token) {
          this.$cookies.set("abbey-session", token);

          this.$notify({
            group: "notifications",
            title: "Success",
            text: "Successfully logged in!",
            type: "success"
          });

          this.$router.push("game");
        }
      } catch (exception) {
        const { message } = exception.response.data;

        this.$notify({
          group: "notifications",
          title: "Error",
          text: message,
          type: "error",
          duration: -1
        });
      }
    }
  }
};
</script>

<style scoped></style>
