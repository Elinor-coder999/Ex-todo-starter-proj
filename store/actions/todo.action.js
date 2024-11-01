import { ADD_TODO, REMOVE_TODO, SET_IS_LOADING, SET_TODOS, store, UPDATE_TODO } from "../store.js"
import { todoService } from "../../services/todo.service.js"

export function loadTodos(filterBy){

    store.dispatch({type:SET_IS_LOADING, isLoading:true})
    return todoService.query(filterBy)
            .then(todos => {
                store.dispatch({ type: SET_TODOS, todos })
            })
            .catch(err => {
                console.error('Todos actions -> Cannot load todos', err)
                throw err
            })
            .finally(()=>{
                store.dispatch({type:SET_IS_LOADING, isLoading:false})
            })
}

export function removeTodo(todoId){
    return todoService.remove(todoId)
            .then(() => {
                store.dispatch({type: REMOVE_TODO, todoId})
            })
            .catch(err => {
                console.error('Todos actions -> Cannot remove todo', err)
                throw err
            })
}

export function saveTodo(todo){
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
            .then(savedTodo => {
                store.dispatch({type, todo: savedTodo})
                return savedTodo
            })
            .catch(err => {
                console.error('Todos actions -> Cannot save todo', err)
                throw err
            })
}