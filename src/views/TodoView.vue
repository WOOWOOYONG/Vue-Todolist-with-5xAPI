<template>
  <div class="max-w-7xl mx-auto">
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
