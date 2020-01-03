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
              <form @submit.prevent="register" autocomplete="off">
                <div class="field">
                  <label class="label">{{ $t("register.username") }}</label>
                  <div class="control">
                    <input
                      v-model="username"
                      class="input is-rounded"
                      type="text"
                      abbey-token="abbey-register-username"
                      required
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">{{ $t("register.password") }}</label>
                  <div class="control">
                    <input
                      v-model="password"
                      class="input is-rounded"
                      type="password"
                      abbey-token="abbey-register-password"
                      required
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Confirm password</label>
                  <div class="control">
                    <input
                      v-model="confirmPassword"
                      class="input is-rounded"
                      type="password"
                      abbey-token="abbey-register-confirmPassword"
                      required
                    />
                  </div>
                </div>

                <div class="control">
                  <button
                    class="button is-primary"
                    autocomplete="none"
                    type="submit"
                    abbey-token="abbey-register-register"
                  >
                    {{ $t("register.actions.registerButton") }}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <footer class="card-footer">
            <router-link class="card-footer-item is-link" to="/login" tag="a">
              {{ $t("register.actions.loginButton") }}
            </router-link>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      username: undefined,
      password: undefined,
      confirmPassword: undefined
    };
  },
  methods: {
    async register() {
      const registerInfo = {
        username: this.username,
        password: this.password
      };

      const response = await this.$axiosUnauthenticated.post("register", registerInfo);

      const { successful, message } = response.data;

      if (successful) {
        this.$router.push("Login");
      } else {
        this.$notify({
          group: "notifications",
          title: "Error",
          text: message,
          type: "error"
        });
        console.error(response.data);
      }
    }
  }
};
</script>

<style scoped></style>
