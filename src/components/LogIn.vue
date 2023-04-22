<template>
  <div @keyup.enter="handleLogin">
    <form>
      <div class="mb-5">
        <label for="loginEmail"
          ><p class="text-left mb-3">Email:</p>
          <input
            type="email"
            class="border-2 w-full indent-2 rounded py-2"
            placeholder="請輸入Email"
            name="loginEmail"
            v-model.trim="loginEmail"
          />
        </label>
        <span class="loginEmail-msg"></span>
      </div>

      <div class="mb-6">
        <label for="loginPassword"
          ><p class="text-left mb-3">密碼:</p>
          <input
            type="password"
            class="border-2 w-full indent-2 rounded py-2"
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
          class="block text-center w-full bg-green-300 py-2 mb-5 rounded"
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
        console.log('login');
        const account = {
          user: {
            email: this.loginEmail,
            password: this.loginPassword,
          },
        };
        logIn(account)
          .then((res) => {
            console.log(res);
            localStorage.setItem('userToken', res.headers.authorization);
            localStorage.setItem('userNickname', res.data.nickname);
            this.resetForm();
            this.$router.push({ name: 'todo' });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log('error');
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
