<template>
  <div v-if="todoList.length > 0">
    <table class="table mb-4">
      <thead>
      <tr>
        <th scope="col">No.</th>
        <th scope="col">Todo item</th>
        <th scope="col">Status</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(todo, index) in todoList" :key="todo.id">
        <th scope="row">{{ index + 1 }}</th>
        <td>
          <template v-if="editIndex === index">
            <input
                v-model="editTask"
                type="text"
                class="form-control"
                @keyup.enter="saveUpdate(todo.id, index)"
                @blur="saveUpdate(todo.id, index)"
            />
          </template>
          <template v-else>
            {{ todo.task }}
          </template>
        </td>
        <td>
          <VueToggles
              :value="todo.status ? true : false"
              @click="changeStatus(todo.id, todo.status)"
              width="50"
          />
        </td>
        <td>
          <button
              data-mdb-button-init
              data-mdb-ripple-init
              class="btn btn-sm btn-secondary mr-1"
              @click="editIndex === index ? saveUpdate(todo.id, index) : startEditing(todo.task, index)"
          >
            {{ editIndex === index ? 'Save' : 'Update' }}
          </button>
          <button
              data-mdb-button-init
              data-mdb-ripple-init
              class="btn btn-sm btn-danger mr-1"
              @click="deleteTodo(todo.id)"
          >
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <span>No Todos</span>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useTodoStore } from "../stores/useTodoStore";
import api from "../api";
import { useToast } from 'vue-toast-notification';
import { ERROR_PROCESSING, TODO_DELETED, TODO_UPDATED, TODO_STATUS_CHANGED } from "../constants";
import { VueToggles } from "vue-toggles";

const todoStore = useTodoStore();
const $toast = useToast();
const todoList = ref([]);
const editIndex = ref(null);
const editTask = ref('');

onBeforeMount(async () => {
  await fetchTodos();
});

watch(() => todoStore.todo, (newTodos) => {
  todoList.value = newTodos;
}, { deep: true });

const fetchTodos = async () => {
  try {
    await todoStore.getTodoList();
    todoList.value = todoStore.todo;
  } catch (error) {
    console.error(ERROR_PROCESSING);
  }
};

const deleteTodo = async (id) => {
  try {
    const response = await api.delete('/deleteTask/' + id);
    if (response.data.status) {
      $toast.success(TODO_DELETED);
      todoList.value = todoList.value.filter(todo => todo.id !== id);
    } else {
      $toast.error('Error deleting todo');
    }
  } catch (error) {
    console.error('Error:', error.response);
  }
};

const startEditing = (task, index) => {
  editTask.value = task;
  editIndex.value = index;
};

const saveUpdate = async (id, index) => {
  try {
    const response = await api.put('/updateTask/' + id, { task: editTask.value });
    if (response.data.status) {
      $toast.success(TODO_UPDATED);
      todoList.value[index].task = editTask.value;
      editIndex.value = null;
    } else {
      $toast.error(ERROR_PROCESSING);
    }
  } catch (error) {
    console.error('Error:', error.response);
    $toast.error(error.response.data.message);
  }
};

const changeStatus = async (id, status) => {
  const changedStatus = status ? 0 : 1;
  try {
    const response = await api.patch('/changeTaskStatus/' + id, { "status": changedStatus });
    if (response.data.status) {
      $toast.success(TODO_STATUS_CHANGED);
      const todo = todoList.value.find(todo => todo.id === id);
      if (todo) todo.status = changedStatus;
    } else {
      $toast.error('Error changing status');
    }
  } catch (error) {
    console.error('Error:', error.response);
  }
};
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
