import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export type Filter = 'all' | 'completed' | 'pending'

export interface ToDosProps {
    id: number,
    text: string,
    completed: boolean
}

interface TodosState { 
    todos: Array<ToDosProps>,
    filter: Filter
}

const initialState: TodosState = {
    todos: [
        {
            id: 1,
            text: 'make my bed',
            completed: false
        },
    ],
    filter: 'all'
}

export const toDosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addToDo: (state, action: PayloadAction<ToDosProps>) => {
            state.todos.push(action.payload)
        },
        toggleToDo: (state, action: PayloadAction<number>) => {
            state.todos.map(todo => {
                if(todo.id === action.payload){
                    todo.completed = !todo.completed
                }
            })
        },
        changeFilter: (state, action: PayloadAction<Filter>) => {
            state.filter = action.payload
        }
    }
})

export const { addToDo, toggleToDo, changeFilter } = toDosSlice.actions

export const selectTodos = (state: RootState) => {
    if(state.toDos.filter === 'all') {
        return state.toDos.todos
    }else if(state.toDos.filter === 'completed') {
        return state.toDos.todos.filter(todo => todo.completed === true )
    }else {
        return state.toDos.todos.filter(todo => todo.completed === false )
    }
}

export default toDosSlice.reducer