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
<!--    {{todoList}}-->
    <tr v-for="(todo, index) in todoList" :key="index">
      <th scope="row">{{index + 1}}</th>
      <td>{{todo.task}}</td>
      <td>{{todo.status}}</td>
      <td>
        <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-sm btn-danger mr-1" @click="deleteTodo(todo.id)">Delete</button>
        <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-sm btn-success" @click="changeStatus(todo.id)">Finished</button>
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
  import {useTodoStore} from "../stores/useTodoStore";
  import {onBeforeMount} from "vue";
  import {ref} from "vue";
  import api from "../api";
  import {useToast} from 'vue-toast-notification';
  const todoStore = useTodoStore();
  const $toast = useToast();
  let todoList = ref([]);

  name: "ShowTaskComponent";

  onBeforeMount(async () => {
    await todoStore.getTodoList(); // Fetch todo list when the component is mounted
    todoList.value = todoStore.todo;
  })

  const deleteTodo = async (id) => {
    try {
      const response = await api.delete('/deleteTask/'+id);
      if(response){
        $toast.success(response.data.message);
      }else{
        console.log('error')
      }
    } catch (error) {
      error = error.response
    }
  }
</script>

<style scoped>

</style>