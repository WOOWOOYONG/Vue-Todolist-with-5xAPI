<template>
  <div class="absolute top-10 right-48">
    <button
      @click="handleLogout"
      class="bg-blue-900 py-1 px-2 rounded text-white hover:bg-blue-600"
    >
      登出
    </button>
  </div>
</template>

<script>
import { logOut } from '@/api';

export default {
  props: ['config'],
  methods: {
    redirectHome() {
      this.$router.push({ name: 'home' });
    },
    handleLogout() {
      console.log(this.config);
      logOut(this.config, this.redirectHome);
    },
  },
};
</script>

<style lang="scss" scoped></style>
