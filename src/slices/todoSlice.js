import { createSlice } from '@reduxjs/toolkit';

const getInitialTodo = () => {
  const todoList = localStorage.getItem('todoList');
  if (todoList) {
    return JSON.parse(todoList);
  }
  localStorage.setItem('todoList', JSON.stringify([]));
  return [];
};

const initialValue = {
  filterStatus: 'all',
  todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        localStorage.setItem('todoList', JSON.stringify(todoListArr));
      } else {
        localStorage.setItem(
          'todoList',
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    deleteTodo: (state, action) => {
      const todoList = localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        const newTodoList = todoListArr.filter(
          (todo) => todo.id !== action.payload
        );
        localStorage.setItem('todoList', JSON.stringify(newTodoList));
        state.todoList = newTodoList;
      }
    },
    updateTodo: (state, action) => {
      const todoList = localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        const newTodoList = todoListArr.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }
          return todo;
        });
        localStorage.setItem('todoList', JSON.stringify(newTodoList));
        state.todoList = newTodoList;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
