<template>
  <form method="post" class="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2" @submit.prevent="submitForm">
    <div class="col-12">
      <div data-mdb-input-init class="form-outline">
        <label class="form-label" for="title">Task Title</label>
        <input type="text" id="title" class="form-control" v-model="taskdata.title"/>
        <label class="form-label" for="status">Status</label>
        <select name="status" id="status" class="form-control" v-model="taskdata.status">
          <option value=1 selected>Active</option>
          <option value=0>Inactive</option>
        </select>
      </div>
    </div>

    <div class="col-12 mt-2">
      <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary">Save</button>
    </div>
  </form>
</template>

<script setup>
  import api from "../api";
  import {ref} from "vue";
  import {useToast} from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-sugar.css';
  import {TODO_CREATED} from "../constants";
  import {ERROR_PROCESSING} from "../constants";
  name: "AddTaskComponent";
  const $toast = useToast();
  let tableContent = null;
  const taskdata = ref({
    title: '',
    status: 1
  })
  const submitForm = async () => {
    try {
      const response = await api.post('/createTask',taskdata.value);
      let todo = response.data.task;
      if(response.data.status){
        console.log(todo)
        $toast.success(TODO_CREATED)
      }else{
        $toast.error(ERROR_PROCESSING)
      }
      clearForm();
    } catch (error) {
      error = error.response
      $toast.error(error.data.message);
    }
  }

  const clearForm = () => {
    taskdata.value.title = '';
    taskdata.value.status = 1;
  }

</script>
