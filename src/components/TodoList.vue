<script lang="ts" setup>
  const text = ref('');

  interface todosProps {
    label: string;
    done: boolean;
  }

  const todoListArr = ref<todosProps[]>([]);

  onMounted(() => (todoListArr.value = JSON.parse(localStorage.getItem('list') || '')));

  const updateLocalStorage = () => {
    localStorage.setItem('list', JSON.stringify(todoListArr.value));
  };

  const addToList = () => {
    todoListArr.value.unshift({ label: text.value, done: false });
    updateLocalStorage();
    text.value = '';
  };

  const deleteFromList = (index: number) => {
    todoListArr.value.splice(index, 1);
    updateLocalStorage();
  };

  const toggleCheckbox = (item: todosProps) => {
    item.done = !item.done;
    updateLocalStorage();
  };

  const todosCompleted = computed(() => {
    const amountTodosDone = todoListArr.value.filter(item => item.done !== false).length;
    return `${amountTodosDone}/${todoListArr.value.length}`;
  });
</script>
<template>
  <div class="container flex flex-col items-center justify-center">
    <h2 class="my-8 text-3xl font-bold text-white">Todo List</h2>
    <div class="w-96 space-y-4 px-4">
      <input
        v-model="text"
        type="text"
        class="w-full rounded-lg p-2"
        @change="addToList"
      />
      <ul class="space-y-2">
        <li
          v-for="(item, index) in todoListArr"
          :key="index"
          class="flex items-center justify-between rounded-lg p-2"
          :class="item.done ? 'bg-green-300' : 'bg-gray-700 text-white'"
        >
          <span
            class="flex w-full cursor-pointer gap-2"
            @click="toggleCheckbox(item)"
          >
            <input
              :id="item.label"
              type="checkbox"
              :name="item.label"
              :checked="item.done"
              class="cursor-pointer"
            />
            <p :class="{ 'line-through': item.done }">
              {{ item.label }}
            </p>
          </span>
          <div
            class="text-red-600 hover:cursor-pointer hover:brightness-110"
            @click="deleteFromList(index)"
          >
            <icon-delete />
            <span class="sr-only">Delete</span>
          </div>
        </li>
      </ul>
      <div class="text-right text-slate-400">Tarefas Completadas {{ todosCompleted }}</div>
    </div>
  </div>
</template>
