<template>
  <div @keyup.enter="handleSignUp">
    <form class="loginForm">
      <div class="mb-5">
        <label for="signUpEmail"
          ><p class="labeltxt">Email:</p>
          <input
            type="email"
            class="w-full rounded border-2 py-2 indent-2"
            placeholder="請輸入Email"
            name="signUpEmail"
            v-model.trim="signUpEmail"
          />
        </label>
        <span></span>
      </div>
      <div class="mb-5">
        <label for="nickName"
          ><p class="labeltxt">暱稱:</p>
          <input
            type="text"
            class="w-full rounded border-2 py-2 indent-2"
            placeholder="請輸入暱稱"
            name="nickName"
            v-model.trim="nickName"
          />
        </label>
        <span></span>
      </div>
      <div class="mb-5">
        <label for="signUpPassword">
          <p class="labeltxt">密碼:</p>
          <input
            type="password"
            class="w-full rounded border-2 py-2 indent-2"
            placeholder="請輸入密碼"
            name="signUpPassword"
            v-model.trim="signUpPassWord"
        /></label>
        <span></span>
      </div>
      <div class="mb-8">
        <label for="confirmPassword"
          ><p class="labeltxt">再次輸入密碼:</p>
          <input
            type="password"
            class="w-full rounded border-2 py-2 indent-2"
            placeholder="請再次輸入密碼"
            name="confirmPassword"
            v-model.trim="confirmPassword"
          />
        </label>
        <span></span>
      </div>
      <div class="px-8">
        <button
          type="button"
          class="mb-5 block w-full rounded bg-green-300 py-2 text-center"
          @click="handleSignUp"
        >
          註冊
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { signUp } from '@/api';
import { signUpSuccess, checkInputAlert, errorAlert } from '@/alert';

export default {
  name: 'Sign-Up',
  props: ['showLogin'],
  data() {
    return {
      signUpEmail: '',
      nickName: '',
      signUpPassWord: '',
      confirmPassword: '',
      showLoginForm: this.showLogin,
    };
  },
  methods: {
    resetForm() {
      this.signUpEmail = '';
      this.nickName = '';
      this.signUpPassWord = '';
      this.confirmPassword = '';
    },
    handleSignUp() {
      if (this.signUpEmail && this.nickName && this.signUpPassWord && this.confirmPassword) {
        const newUser = {
          user: {
            email: this.signUpEmail,
            nickname: this.nickName,
            password: this.signUpPassWord,
          },
        };
        signUp(newUser)
          .then((res) => {
            signUpSuccess(res.data.message);
            this.resetForm();
            this.moveToLogin();
          })
          .catch((err) => errorAlert(err.response.data.message));
      } else {
        checkInputAlert();
      }
    },
    moveToLogin() {
      this.showLoginForm = true;
      this.$emit('update:showLogin', this.showLoginForm);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
