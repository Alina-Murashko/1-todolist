import React, { useRef } from 'react';
import { Button } from './Button';
import { FilterValuesType } from './App';

export type TaskType = {
    id: string
    title: string
    isDone : boolean

}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>

    addTask: (title: string) => void
    removeTask: (taskId:string) => void
    changeTodoListFilter : (filterValue: FilterValuesType) => void
}



export const TodoList = ({title, tasks, removeTask, changeTodoListFilter, addTask}: TodoListPropsType) => {
    
    const taskTitleInput = useRef<HTMLInputElement>(null)

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

        
        const addTaskHandler = () => {
            if(taskTitleInput.current) {
                const newTaskTitle = taskTitleInput.current.value;
                addTask(newTaskTitle);
                taskTitleInput.current.value = "";
            }
        }
   
    return (
        <div className='todoList'>
            <h3>{title}</h3>
            <div>
                <input ref={taskTitleInput} />
                <Button onClickHandler={addTaskHandler} title='+' />
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