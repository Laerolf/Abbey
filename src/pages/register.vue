<template>
  <div abbey-token="abbey-register">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">
              {{ $t("register.title") }}
            </p>
          </div>
          <div class="card-content">
            <div class="content">
              <form abbey-token="register-form" @submit.prevent="register">
                <div class="field">
                  <label class="label">{{ $t("register.username") }}</label>
                  <div class="control">
                    <input
                      v-model="username"
                      class="input is-rounded"
                      :class="{ 'is-danger': $v.username.$invalid }"
                      type="text"
                      abbey-token="register-form-username"
                    />
                  </div>
                  <p v-show="$v.username.$invalid" class="help is-danger">
                    A username is required.
                  </p>
                </div>

                <div class="field">
                  <label class="label">{{ $t("register.password") }}</label>
                  <div class="control">
                    <input
                      v-model="password"
                      class="input is-rounded"
                      :class="{ 'is-danger': $v.password.$invalid }"
                      type="password"
                      abbey-token="register-form-password"
                    />
                  </div>
                  <p v-show="$v.password.$invalid" class="help is-danger">
                    A password is required.
                  </p>
                </div>

                <div class="field">
                  <label class="label">Confirm password</label>
                  <div class="control">
                    <input
                      v-model="confirmPassword"
                      class="input is-rounded"
                      :class="{ 'is-danger': $v.confirmPassword.$invalid }"
                      type="password"
                      abbey-token="register-form-confirmPassword"
                    />
                  </div>
                  <p v-show="$v.confirmPassword.$invalid" class="help is-danger">
                    Please confirm your password.
                  </p>
                </div>

                <div class="control">
                  <button
                    class="button is-primary"
                    type="submit"
                    abbey-token="register-form-register"
                    :disabled="$v.$invalid"
                  >
                    {{ $t("register.actions.registerButton") }}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <footer class="card-footer">
            <router-link
              abbey-token="register-actions-login"
              class="card-footer-item is-link"
              to="/login"
              tag="a"
            >
              {{ $t("register.actions.loginButton") }}
            </router-link>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, sameAs } from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      username: undefined,
      password: undefined,
      confirmPassword: undefined
    };
  },
  validations: {
    username: {
      required
    },
    password: {
      required
    },
    confirmPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    async register() {
      const registerInfo = {
        username: this.username,
        password: this.password
      };

      try {
        const response = await this.$axiosUnauthenticated.post("register", registerInfo);

        const { successful, message } = response.data;

        if (successful) {
          this.$router.push("Login");

          this.$notify({
            group: "notifications",
            title: "Registered",
            text: message,
            type: "success"
          });
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
