import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { SET_TODOS } from "../store/store.js"
import { loadTodos, removeTodo, saveTodo } from "../store/actions/todo.action.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {

    // const [todos, setTodos] = useState(null)
    const todos = useSelector(storeState => storeState.todos)
    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()
    const isLoading = useSelector(storeState => storeState.isLoading)

    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    const [filterBy, setFilterBy] = useState(defaultFilter)

    const dispatch = useDispatch()

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
            })
            .catch(err => {
                console.log('Cannot remove Todo', err)
                showErrorMsg('Cannot remove Todo')
            })
    }

    function onAddTodo() {
        const todoToSave = todoService.getEmptyTodo()

        saveTodo(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
            })
            .catch(err => {
                console.log('Cannot add Todo', err)
                showErrorMsg('Cannot add Todo')
            })
    }

    function onEditTodo(todo) {
        const importance = +prompt('Update importance?')
        const todoToSave = { ...todo, importance }

        saveCar(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Car updated to price: $${savedTodo.importance}`)
            })
            .catch(err => {
                console.log('Cannot update todo', err)
                showErrorMsg('Cannot update todo')
            })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        todoService.save(todoToSave)
            .then((savedTodo) => {
                setTodos(prevTodos => prevTodos.map(currTodo => (currTodo._id !== todo._id) ? currTodo : { ...savedTodo }))
                showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoId)
            })
    }

    if (!todos) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            { isLoading 
            ?<p>Loading</p>
            :<TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />}
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}