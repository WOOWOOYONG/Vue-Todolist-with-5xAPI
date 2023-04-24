<template>
  <div class="absolute right-8 top-10">
    <button
      @click="handleLogout"
      class="rounded bg-blue-900 px-2 py-1 text-white hover:bg-blue-600"
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
