<template>
  <div class="home max-w-[1920px] mx-auto">
    <h1 class="mb-10 text-2xl">歡迎來到你的待辦清單</h1>
    <div class="flex justify-center gap-4">
      <div class="max-w-[20%]">
        <img
          src="https://i.pinimg.com/originals/73/e4/26/73e4261f0cf991cdca702c53bba90597.gif"
          alt=""
          class="max-w-full h-auto"
        />
      </div>
      <div class="w-1/6">
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
