import { userService } from "../services/user.service.js"

const { createStore } = Redux

export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'

// Todo
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_IS_LOADING = 'SET_IS_LOADING'

// User
export const SET_USER = 'SET_USER'
// export const SET_USER_SCORE = 'SET_USER_SCORE'

const initialState = {
    todos: [],
    isLoading: false,
    loggedinUser: userService.getLoggedinUser()
}

function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TODOS:
            return {
                ...state,
                todos: cmd.todos
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== cmd.todoId)
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, cmd.todo]
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => (todo._id === cmd.todo._id) ? cmd.todo : todo)
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }

        case SET_USER:
            return {
                ...state,
                loggedinUser: cmd.user
            }
        default: return state
    }
}



export const store = createStore(appReducer)