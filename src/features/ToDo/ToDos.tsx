import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTodos, addToDo, ToDosProps, toggleToDo, changeFilter, Filter } from "./toDoSlice"
import styles from './todo.module.css'

function ToDos(): JSX.Element {
    const toDos = useSelector(selectTodos)
    const dispatch = useDispatch()
    const [value, setValue] = useState<string>('')

    const handleClick = (): void => {
        if(!value) return
        const newToDo: ToDosProps = {
            id: toDos.length + 2,
            text: value,
            completed: false
        }
        dispatch(addToDo(newToDo))
        setValue('')
    }   

    const handleToggleToDo = (id: number): void => void dispatch(toggleToDo(id))
    
    const handleFilter = (event: ChangeEvent<HTMLSelectElement>): void => {
        const filterValue = event.target.value as Filter
        dispatch(changeFilter(filterValue))
    }

    return (
        <div className={styles.container}>
            <header className={styles.headerContainer}>
                <h1 className={styles.title}>To-do</h1>
                <input 
                    className={styles.input}
                    type="text"
                    value={value}
                    onChange={event => setValue(event.currentTarget.value)}
                    placeholder="add To do"
                />
                <button className={styles.button} onClick={handleClick}>Add To Do</button>
            </header>
            <section className={styles.todosContainer}>
                <ul>
                {
                    toDos.length < 1 
                    ? <span className={styles.error}>Not to-dos to show</span>
                    : toDos.map(toDo => (
                            <li 
                            className={toDo.completed ? 'completed' : 'pending'} 
                            key={toDo.id}
                            onClick={() => handleToggleToDo(toDo.id)}>
                                <h4>
                                {toDo.text}
                                </h4>
                            </li>
                        )
                    )
                }
                </ul>
                <label htmlFor='filter'>Filter By: </label>
                <select id='filter' onChange={handleFilter}>
                    {
                        ['all', 'completed', 'pending'].map( option => (
                            <option key={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>
            </section>
        </div>
    )
}

export default ToDos
