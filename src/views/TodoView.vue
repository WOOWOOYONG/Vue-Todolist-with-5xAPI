<template>
  <div class="mx-auto max-w-7xl">
    <Todo />
  </div>
</template>

<script>
import Todo from '@/components/Todo.vue';

export default {
  name: 'TodoView',
  components: {
    Todo,
  },
};
</script>
