<template>
  <form method="post" class="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2" @submit.prevent="submitForm">
    <div class="col-12">
      <div data-mdb-input-init class="form-outline">
        <input type="text" id="form1" class="form-control" />
        <label class="form-label" for="form1">Enter a task here</label>
      </div>
    </div>

    <div class="col-12">
      <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary">Save</button>
    </div>
  </form>
</template>

<script setup>
  import api from "../api"; // Import the Axios instance
  name: "AddTaskComponent";
  const submitForm = async () => {
    try {
      const response = await api.post('/');
      this.response = response.data;
      console.log(response)
    } catch (error) {
      this.error = error.message || 'An error occurred';
      console.error('API call error:', error);
    }
  }
</script>
