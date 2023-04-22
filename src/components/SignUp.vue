<template>
  <div @keyup.enter="handleSignUp">
    <form class="loginForm">
      <div class="mb-5">
        <label for="signUpEmail"
          ><p class="text-left mb-3">Email:</p>
          <input
            type="email"
            class="border-2 w-full indent-2 rounded py-2"
            placeholder="請輸入Email"
            name="signUpEmail"
            v-model.trim="signUpEmail"
          />
        </label>
        <span></span>
      </div>
      <div class="mb-5">
        <label for="nickName"
          ><p class="text-left mb-3">暱稱:</p>
          <input
            type="text"
            class="border-2 w-full indent-2 rounded py-2"
            placeholder="請輸入暱稱"
            name="nickName"
            v-model.trim="nickName"
          />
        </label>
        <span></span>
      </div>
      <div class="mb-5">
        <label for="signUpPassword">
          <p class="text-left mb-3">密碼:</p>
          <input
            type="password"
            class="border-2 w-full indent-2 rounded py-2"
            placeholder="請輸入密碼"
            name="signUpPassword"
            v-model.trim="signUpPassWord"
        /></label>
        <span></span>
      </div>
      <div class="mb-8">
        <label for="confirmPassword"
          ><p class="text-left mb-3">再次輸入密碼:</p>
          <input
            type="password"
            class="border-2 w-full indent-2 rounded py-2"
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
          class="block text-center w-full bg-green-300 py-2 mb-5 rounded"
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
            console.log(res);
            this.resetForm();
            this.moveToLogin();
          })
          .catch((err) => console.log(err));
      } else {
        console.log('error');
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
