import { ChangeEvent, KeyboardEvent, useState } from 'react';
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
    
    const [taskTitle, setTaskTitle] = useState<string>('')

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
            const trimmedTaskTitle = taskTitle.trim()
            if(trimmedTaskTitle) {
                addTask(taskTitle)
            } else {
                alert('У тебя одни пробелы!')
                }
            setTaskTitle('')

        }
   
        const onKeyDownTitleHendler = (e: KeyboardEvent<HTMLInputElement>) => {
            if(e.key === 'Enter' && taskTitle) {
                addTaskHandler()
            }
        }

        const onChangeTitleHendler = (e: ChangeEvent<HTMLInputElement>) => {
            setTaskTitle(e.currentTarget.value)
        }


    return (
        <div className='todoList'>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={onChangeTitleHendler} 
                onKeyDown={onKeyDownTitleHendler}/>
                <Button onClickHandler={addTaskHandler} title='+' isDisabled={!taskTitle} />
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