import React from 'react';
import { Button } from './Button';
import { FilterValuesType } from './App';

export type TaskType = {
    id: number
    title: string
    isDone : boolean

}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId:number) => void
    changeTodoListFilter : (filterValue: FilterValuesType) => void
}

export const TodoList = ({title, tasks, removeTask, changeTodoListFilter}: TodoListPropsType) => {

    const tasksList: JSX.Element = tasks.length !== 0 
        ? <ul>
            {
                tasks.map((task : TaskType) => {
                    return (
                        <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/> 
                        <span>{task.title}</span>
                        <Button title='x' onClickHandler={() => {removeTask(task.id)}}/>
                    </li>
                    )
                }) 
            }
        </ul>
        : <span>Tasklist empty</span>

    return (
        <div className='todoList'>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button onClickHandler={()=> {}} title='+' />
            </div>
            {tasksList}
            <div>
                <Button onClickHandler={() => {changeTodoListFilter("all")}} title='All'/>
                <Button onClickHandler={() => {changeTodoListFilter("active")}} title='Active' />
                <Button onClickHandler={() => {changeTodoListFilter("completed")}} title='Completed' />
            </div>
        </div>
    )
}