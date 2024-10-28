import { REMOVE_TODO, SET_TODOS, store } from "../store.js"
import { todoService } from "../../services/todo.service.js"

export function loadTodos(filterBy){
    return todoService.query(filterBy)
            .then(todos => {
                store.dispatch({ type: SET_TODOS, todos })
            })
            .catch(err => {
                console.error('Todos actions -> Cannot load todos', err)
                throw err
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