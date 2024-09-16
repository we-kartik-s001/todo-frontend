import {defineStore} from "pinia";
import api from "../api";
import {ref} from "vue";

export const useTodoStore = defineStore('todo',() => {
    let todo = ref([]);
    const getTodoList =  async () => {
        try {
            const response = await api.get('/index');
            if(response.data){
                todo.value = response.data;
            }else{
                console.log('error')
            }
        } catch (error) {
            error = error.response
        }
    }
    const updateTodoList = (list) => {
        todo.value = list;
        console.log('list',list)
        console.log('now',todo)
    }
    return {todo,getTodoList, updateTodoList}
})