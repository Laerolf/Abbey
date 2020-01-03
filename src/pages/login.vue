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
              <form @submit.prevent="login" autocomplete="off">
                <div class="field">
                  <label class="label">{{ $t("login.username") }}</label>
                  <div class="control">
                    <input
                      v-model="username"
                      name="someUser"
                      class="input is-rounded"
                      type="text"
                      abbey-token="abbey-login-username"
                      required
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">{{ $t("login.password") }}</label>
                  <div class="control">
                    <input
                      v-model="password"
                      name="somePass"
                      class="input is-rounded"
                      type="password"
                      abbey-token="abbey-login-password"
                      required
                    />
                  </div>
                </div>

                <div class="control">
                  <button
                    class="button is-primary"
                    type="submit"
                    abbey-token="abbey-register-register"
                  >
                    {{ $t("login.actions.loginButton") }}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <footer class="card-footer">
            <router-link class="card-footer-item is-link" to="/register" tag="a">
              {{ $t("login.actions.registerButton") }}
            </router-link>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Login",
  router,
  data() {
    return {
      username: undefined,
      password: undefined
    };
  },
  methods: {
    async login() {
      const loginCredentials = {
        username: this.username,
        password: this.password
      };

      try {
        const response = await this.$axiosUnauthenticated.post("login", loginCredentials);

        const { success, message } = response.data;

        if (success) {
          this.$notify({
            group: "notifications",
            title: "Success",
            text: message,
            type: "success"
          });

          this.$router.push("game");
        } else {
          throw message;
        }
      } catch (exception) {
        const { message } = exception.response.data;

        this.$notify({
          group: "notifications",
          title: "Error",
          text: message,
          type: "error"
        });
      }
    }
  }
};
</script>

<style scoped></style>
