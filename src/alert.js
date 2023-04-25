import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const loginSuccess = (msg) => {
  Toast.fire({
    icon: 'success',
    title: msg,
  });
};

const signUpSuccess = (msg) => {
  Toast.fire({
    icon: 'success',
    title: msg,
  });
};

const addTodoSuccess = () => {
  Toast.fire({
    icon: 'success',
    title: '新增成功',
  });
};

const delTodoSuccess = () => {
  Toast.fire({
    icon: 'success',
    title: '刪除成功',
  });
};

const togTodoSuccess = () => {
  Toast.fire({
    icon: 'success',
    title: '更改狀態成功',
  });
};

const logoutSuccess = () => {
  Toast.fire({
    icon: 'success',
    title: '登出成功',
  });
};

const Confirm = Swal.mixin({
  title: '請確認',
  icon: 'error',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '確定刪除',
  cancelButtonText: '再想想',
});

const delAllTodoConfirm = (fn) => {
  Confirm.fire({
    text: '是否確定刪除所有已完成事項？',
  }).then((result) => {
    if (result.isConfirmed) {
      fn();
    }
  });
};

// const successAlert = () => {
//   Swal.fire('刪除成功', '已清除所有已完成事項', 'success');
// };

const checkInputAlert = () => {
  Swal.fire('錯誤！', '請先填寫正確資料', 'error');
};

const delAllTodoFailed = () => {
  Swal.fire('錯誤！', '目前沒有完成事項', 'error');
};

export {
  loginSuccess,
  signUpSuccess,
  addTodoSuccess,
  delTodoSuccess,
  togTodoSuccess,
  logoutSuccess,
  delAllTodoConfirm,
  checkInputAlert,
  delAllTodoFailed,
};
