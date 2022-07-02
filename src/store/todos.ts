import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export interface Item {
  id: string;
  label: string;
  done: boolean;
}

export const useTodoList = defineStore('todos', {
  state: () => {
    return {
      todoList: useStorage('todos', [] as Array<Item>),
    };
  },

  getters: {
    todos: state => state.todoList,
    todosDone: state => state.todoList.filter(item => item.done !== false),
    todosActive: state => state.todoList.filter(item => item.done === false),
    todosCompleted: state => {
      const amountTodosDone = state.todoList.filter(item => item.done !== false).length;
      return `${amountTodosDone}/${state.todoList.length}`;
    },
  },

  actions: {
    addToList(item: Item) {
      this.todoList.unshift(item);
      localStorage.setItem('list', JSON.stringify(this.todoList));
    },

    deleteFromList(index: number) {
      this.todoList.splice(index, 1);
      localStorage.setItem('list', JSON.stringify(this.todoList));
    },

    toggleCheckbox(item: Item) {
      item.done = !item.done;
    },
  },
});
