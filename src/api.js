import axios from 'axios';

const url = 'https://todoo.5xcamp.us';
const signUp = (newUser) => axios.post(`${url}/users`, newUser);
const logIn = (user) => axios.post(`${url}/users/sign_in`, user);
const logOut = (config, redirect) => {
  axios
    .delete(`${url}/users/sign_out`, config)
    .then((res) => {
      console.log(res);
      localStorage.removeItem('userToken');
      localStorage.removeItem('userNickName');
      redirect();
    })
    .catch((err) => {
      console.log(err);
    });
};

// 取得待辦
const getTodo = (config) => axios.get(`${url}/todos`, config);
const addTodo = (todo, config) => axios.post(`${url}/todos`, todo, config);
const delTodo = (todoId, config) => axios.delete(`${url}/todos/${todoId}`, config);
const toggleTodo = (todoId, config) => axios.patch(`${url}/todos/${todoId}/toggle`, {}, config);
const delAllTodo = (doneTodos, config, fn) => {
  doneTodos.forEach((todo) => {
    delTodo(todo.id, config)
      .then((res) => {
        console.log(res);
        fn();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export { signUp, logIn, logOut, getTodo, addTodo, delTodo, delAllTodo, toggleTodo };
