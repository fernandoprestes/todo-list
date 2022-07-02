<script lang="ts" setup>
  import TodoAll from './TodoAll.vue';
  import TodoActive from './TodoActive.vue';
  import TodoDone from './TodoDone.vue';
  import { v4 as uuidv4 } from 'uuid';

  import { useTodoList } from '../store/todos';

  const store = useTodoList();

  const text = ref('');
  const currentTab = ref(0);

  const tabs = [
    {
      component: TodoAll,
      label: 'Todas tarefas',
    },
    {
      component: TodoActive,
      label: 'Tarefas ativas',
    },
    {
      component: TodoDone,
      label: 'Tarefas completas',
    },
  ];

  function handleAddList() {
    const uuid = uuidv4();
    const todoObj = {
      id: uuid,
      label: text.value,
      done: false,
    };
    text.value = '';
    store.addToList(todoObj);
  }
</script>
<template>
  <div class="container flex flex-col items-center justify-center">
    <h2 class="my-8 text-3xl font-bold text-white">Todo List</h2>
    <div class="w-[464px] space-y-4 px-4">
      <input
        v-model="text"
        type="text"
        class="w-full rounded-lg p-2"
        @change="handleAddList"
      />
      <div class="grid grid-cols-3 justify-between border-b border-blue-600 text-center text-white">
        <button
          v-for="(item, index) in tabs"
          :key="index"
          :class="{ 'font-bold text-blue-600': currentTab === index }"
          @click="currentTab = index"
        >
          {{ item.label }}
        </button>
      </div>
      <component :is="tabs[currentTab].component"></component>
    </div>
  </div>
</template>
