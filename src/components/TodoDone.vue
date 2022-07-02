<script lang="ts" setup>
  import { useTodoList } from '../store/todos';

  const store = useTodoList();
  const { toggleCheckbox, deleteFromList } = useTodoList();
</script>
<template>
  <div>
    <ul class="space-y-2">
      <li
        v-for="(item, index) in store.todosDone"
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
      <li
        v-if="store.todosDone.length === 0"
        class="text-center text-sm text-white"
      >
        Você não tem nenhuma tarefa concluída!
      </li>
    </ul>
  </div>
</template>
<style scoped lang=""></style>
