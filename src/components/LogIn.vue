<template>
  <div @keyup.enter="handleLogin">
    <form>
      <div class="mb-5">
        <label for="loginEmail"
          ><p class="labeltxt">Email:</p>
          <input
            type="email"
            class="w-full rounded border-2 py-2 indent-2"
            placeholder="請輸入Email"
            name="loginEmail"
            v-model.trim="loginEmail"
          />
        </label>
        <span class="loginEmail-msg"></span>
      </div>

      <div class="mb-6">
        <label for="loginPassword"
          ><p class="labeltxt">密碼:</p>
          <input
            type="password"
            class="w-full rounded border-2 py-2 indent-2"
            placeholder="請輸入密碼"
            name="loginPassword"
            v-model.trim="loginPassword"
          />
        </label>
        <span class="loginPassword-msg"></span>
      </div>
      <div class="px-8">
        <button
          type="button"
          class="mb-5 block w-full rounded bg-green-300 py-2 text-center"
          @click="handleLogin"
        >
          登入
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { logIn } from '@/api';
import { loginSuccess, checkInputAlert } from '@/alert';

export default {
  name: 'Log-in',
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
    };
  },
  methods: {
    resetForm() {
      this.loginEmail = '';
      this.loginPassword = '';
    },
    handleLogin() {
      if (this.loginEmail && this.loginPassword) {
        const account = {
          user: {
            email: this.loginEmail,
            password: this.loginPassword,
          },
        };
        logIn(account)
          .then((res) => {
            loginSuccess(res.data.message);
            localStorage.setItem('userToken', res.headers.authorization);
            localStorage.setItem('userNickname', res.data.nickname);
            this.resetForm();
            this.$router.push({ name: 'todo' });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        checkInputAlert();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
