<template>
  <div class="mx-auto max-w-[30%] text-lg">
    <h1 class="mb-10 text-xl">哈囉 {{ nickName }}～ 來做點事吧</h1>
    <div class="mb-5 flex justify-center">
      <label for="todoInput">
        <input
          type="text"
          class="mr-5 rounded border-2 px-2 py-1 indent-2"
          placeholder="請輸入待辦事項"
          v-model.trim="newTodo"
          @keyup.enter="handleAddTodo"
        />
      </label>
      <button
        type="button"
        class="rounded border border-slate-700 px-2 py-1 hover:bg-gray-900 hover:text-white"
        @click="handleAddTodo"
      >
        加入
      </button>
    </div>
    <div v-if="todos.length === 0" class="mt-10"><h2 class="text-2xl">目前沒有待辦事項</h2></div>
    <div v-else>
      <ul class="mb-6 flex justify-center gap-5 rounded border-2 border-slate-200">
        <li class="w-1/3 cursor-pointer rounded" :class="state === 'all' ? 'active' : ''">
          <button @click="changeTodoState('all')" class="w-full px-3 py-1">全部</button>
        </li>
        <li class="w-1/3 cursor-pointer rounded" :class="state === 'undone' ? 'active' : ''">
          <button @click="changeTodoState('undone')" class="w-full px-3 py-1">待完成</button>
        </li>
        <li class="w-1/3 cursor-pointer rounded" :class="state === 'done' ? 'active' : ''">
          <button @click="changeTodoState('done')" class="w-full px-3 py-1">已完成</button>
        </li>
      </ul>

      <div class="mb-10">
        <ul>
          <li v-for="todo in filterTodolist" :key="todo.id" class="mb-3 flex items-center">
            <label
              for="todoItem"
              class="flex w-full cursor-pointer items-center p-1 hover:bg-slate-100"
            >
              <input
                type="checkbox"
                id="todoItem"
                class="mr-10 h-5 w-5 cursor-pointer"
                :data-id="todo.id"
                :checked="todo.completed_at === null ? false : true"
                @click="handleToggleTodo"
              />
              <span :class="todo.completed_at === null ? '' : 'line-through'" class="text-xl">{{
                todo.content
              }}</span>
            </label>
            <button :data-id="todo.id" @click="handleDelTodo">
              <font-awesome-icon
                :icon="['far', 'rectangle-xmark']"
                :data-id="todo.id"
                class="cursor-pointer hover:scale-110 hover:bg-amber-200"
                size="lg"
              />
            </button>
          </li>
        </ul>
      </div>
      <div class="flex items-center justify-between border-t-2 pt-4">
        <p>目前還有{{ undoneNum }}件待完成</p>
        <button
          @click="handleDelAllTodo"
          class="rounded bg-orange-400 px-2 py-1 font-bold text-white hover:bg-orange-600"
        >
          清除已完成事項
        </button>
      </div>
    </div>
    <LogOutBtn :config="config" />
  </div>
</template>

<script>
import { getTodo, addTodo, delTodo, delAllTodo, toggleTodo } from '@/api';
import {
  addTodoSuccess,
  delTodoSuccess,
  togTodoSuccess,
  delAllTodoConfirm,
  delAllTodoFailed,
  checkInputAlert,
} from '@/alert';
import LogOutBtn from './LogOutBtn.vue';

export default {
  components: { LogOutBtn },
  name: 'Todo-list',
  data() {
    return {
      token: '',
      nickName: '',
      config: '',
      todos: [],
      newTodo: '',
      undoneNum: '',
      state: 'all',
    };
  },
  methods: {
    getConfig() {
      this.token = localStorage.getItem('userToken');
      this.nickName = localStorage.getItem('userNickname');
      this.config = {
        headers: {
          Authorization: this.token,
        },
      };
    },
    getTodoList() {
      getTodo(this.config)
        .then((res) => {
          this.todos = res.data.todos;
          this.countUndone();
        })
        .catch((err) => console.log(err));
    },
    addTodoList() {
      const newTodo = {
        todo: {
          content: this.newTodo,
        },
      };
      addTodo(newTodo, this.config)
        .then(() => {
          addTodoSuccess();
          this.getTodoList();
          this.newTodo = '';
        })
        .catch((err) => console.log(err));
    },
    handleAddTodo() {
      if (this.newTodo && this.config) {
        this.addTodoList();
      } else {
        checkInputAlert();
      }
    },
    handleDelTodo(e) {
      const todoId = e.target.dataset.id;
      if (!todoId) {
        return;
      }
      delTodo(todoId, this.config)
        .then(() => {
          delTodoSuccess();
          this.getTodoList();
        })
        .catch((err) => console.log(err));
    },
    handleDelAllTodo() {
      const doneTodos = this.todos.filter((todo) => todo.completed_at !== null);
      if (doneTodos.length > 0) {
        const delfn = () => {
          delAllTodo(doneTodos, this.config, this.getTodoList);
        };
        delAllTodoConfirm(delfn);
      } else {
        delAllTodoFailed();
      }
    },
    handleToggleTodo(e) {
      const todoId = e.target.dataset.id;
      toggleTodo(todoId, this.config)
        .then(() => {
          togTodoSuccess();
          this.getTodoList();
          this.countUndone();
        })
        .catch((err) => console.log(err));
    },
    countUndone() {
      const undoneArr = this.todos.filter((item) => item.completed_at === null);
      this.undoneNum = undoneArr.length;
    },
    changeTodoState(val) {
      this.state = val;
    },
    setTodoByState() {
      if (this.state === 'all') {
        return [...this.todos].reverse();
      }
      if (this.state === 'undone') {
        return this.todos.filter((todo) => todo.completed_at === null).reverse();
      }
      if (this.state === 'done') {
        return this.todos.filter((todo) => todo.completed_at !== null).reverse();
      }
      return [...this.todos].reverse();
    },
  },
  mounted() {
    this.getConfig();
    this.getTodoList();
  },
  computed: {
    filterTodolist() {
      return this.setTodoByState();
    },
  },
};
</script>

<style lang="scss" scoped></style>
