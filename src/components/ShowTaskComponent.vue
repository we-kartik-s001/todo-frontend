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
      <td>
        <VueToggles :value="todo.status ? true : false" @click="changeStatus(todo.id,todo.status)" width="50"/>
      </td>
      <td>
        <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-sm btn-danger mr-1" @click="deleteTodo(todo.id)">Delete</button>
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
  import {TODO_DELETED} from "../constants";
  import {TODO_STATUS_CHANGED} from "../constants";
  import { VueToggles } from "vue-toggles";

  const todoStore = useTodoStore();
  const $toast = useToast();
  let todoList = ref([]);
  let deleteStatus = ref(0);

  name: "ShowTaskComponent";

  onBeforeMount(async () => {
    await todoStore.getTodoList();
    todoList.value = todoStore.todo;
  })

  const deleteTodo = async (id) => {
    try {
      const response = await api.delete('/deleteTask/'+id);
      if(response.data.status){
        $toast.success(TODO_DELETED);
      }else{
        console.log('error')
      }
    } catch (error) {
      error = error.response
    }
  }

  const changeStatus = async (id, status) => {
    console.log('checking id',id)
    console.log('checking status', status)
    const changedStatus = status ? 0 : 1;
    try {
      const response = await api.patch('/changeTaskStatus/'+id,{"status" : changedStatus});
      if(response.data.status){
        $toast.success(TODO_STATUS_CHANGED);
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