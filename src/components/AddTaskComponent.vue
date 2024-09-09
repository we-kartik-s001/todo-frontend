<template>
  <form method="post" class="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2" @submit.prevent="submitForm">
    <div class="col-12">
      <div data-mdb-input-init class="form-outline">
        <label class="form-label" for="form1">Task Title</label>
        <input type="text" id="form1" class="form-control" v-model="taskdata.title"/>

        <label class="form-label" for="form1">Task Description</label>
        <textarea class="form-control" v-model="taskdata.description"></textarea>
<!--        <input type="text" id="form1" class="form-control" v-model="title"/>-->
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
  name: "AddTaskComponent";
  // let title = ref('');
  // let description = ref('');
  const $toast = useToast();
  let tableContent = null;
  const taskdata = ref({
    title: '',
    description: ''
  })
  const submitForm = async () => {
    try {
      const response = await api.post('/createTask',taskdata.value);
      tableContent = response.data;
      if(response.data){
        $toast.success('Task added successfully')
        // this.taskdata = null
      }
      console.log(response.data)
    } catch (error) {
      this.error = error.message || 'An error occurred';
      console.error('API call error:', error);
    }
  }
</script>
