<template>
  <div class="home mx-auto max-w-[1920px]">
    <h1 class="mb-20 text-3xl font-bold">歡迎來到你的待辦清單</h1>
    <div
      class="mx-auto flex max-w-[80%] flex-col items-center justify-center gap-2 md:flex-row md:items-start md:gap-6 lg:max-w-[40%]"
    >
      <div class="w-full md:w-[50%]">
        <img
          src="https://i.pinimg.com/originals/73/e4/26/73e4261f0cf991cdca702c53bba90597.gif"
          alt="cover"
          class="h-auto max-w-full rounded-xl"
        />
      </div>
      <div class="w-full md:w-[50%]">
        <div v-if="showLogin">
          <LogIn />
        </div>
        <div v-else>
          <SignUp :show-login="showLogin" @update:showLogin="updateShowLogin" />
        </div>
        <div class="px-8">
          <button class="w-full bg-slate-200 py-2" @click="showLogin = !showLogin">
            {{ showLogin ? '註冊新帳號' : '返回登入頁' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LogIn from '@/components/LogIn.vue';
import SignUp from '@/components/SignUp.vue';

export default {
  name: 'HomeView',
  components: {
    LogIn,
    SignUp,
  },
  data() {
    return {
      showLogin: true,
    };
  },
  methods: {
    updateShowLogin(newVal) {
      this.showLogin = newVal;
    },
  },
};
</script>
