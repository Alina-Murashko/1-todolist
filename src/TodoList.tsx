import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from './Button';
import { FilterValuesType } from './App';
import './App.css';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone : boolean
}

type TodoListPropsType = {
    filter: FilterValuesType;
    title: string
    tasks: Array<TaskType>
    todoListId: string
    addTask: (todoListId: string,title: string) => void
    removeTask: (todoListId: string, taskId:string) => void
    changeTaskStatus: (todoListId: string,taskId: string, newIsDone: boolean) => void
    changeTodoListFilter: (todoListId: string, filterValue: FilterValuesType) => void
    updateTask: (todoListId: string, taskId: string, title: string) => void
}

export const TodoList = ({updateTask,title, tasks, removeTask, addTask, changeTaskStatus, todoListId, changeTodoListFilter, filter}: TodoListPropsType) => {
    
    //const [taskTitle, setTaskTitle] = useState<string>('');
    //const [inputError,setInputError] = useState<boolean>(false);

    const tasksForTodoList = filter === "active"
    ? tasks.filter(t => t.isDone === false)
    : filter === "completed"
        ? tasks.filter(t => t.isDone === true)
        : tasks

   /* const getFilteredTasks = (filter: FilterValuesType) : Array<TaskType> => {
            return tasksForTodoList
    }*/

    const changeTodoListFilterHendler = (todoListId: string, filter:  FilterValuesType) => {
        //tasks = getFilteredTasks(filter);
        changeTodoListFilter(todoListId, filter);
        console.log(tasks);
    }

    const addTaskHandler = (title: string) => {
        addTask(todoListId,title)
    }

    const tasksList: JSX.Element = tasks.length !== 0 
        ? <ul>
            {
                tasksForTodoList.map((task : TaskType) => {
                    const callBackHandler = (title: string) => {
                        updateTask(todoListId,task.id,title)
                    }

                    return (
                        <li key={task.id} className={task.isDone? 'is-done' : 'task'} >
                        <input  type="checkbox" 
                        checked={task.isDone} 
                        onChange={(e) => changeTaskStatus(todoListId,task.id,e.currentTarget.checked)}/> 
                        <EditableSpan callBack={callBackHandler} oldTitle={task.title}/>
                        <Button title='x' onClickHandler={() => {removeTask(todoListId,task.id)}}/>
                    </li>
                    )
                }) 
            }
        </ul>
        : <span>Tasklist empty</span>

    return (
        <div className='todoList'>
            <h3>{title}</h3>
            <AddItemForm callBack={addTaskHandler}/>
            {tasksList}
            <div>
                <Button 
                classes={filter=== 'all'? 'active-filter': ''}
                onClickHandler={() => {changeTodoListFilterHendler(todoListId,"all")}} 
                title='All'/>
                <Button 
                classes={filter=== 'active'? 'active-filter': ''}
                onClickHandler={() => {changeTodoListFilterHendler(todoListId,"active")}} 
                title='Active' />
                <Button 
                classes={filter=== 'completed'? 'active-filter': ''}
                onClickHandler={() => {changeTodoListFilterHendler(todoListId,"completed")}} 
                title='Completed' />
            </div>
        </div>
    )
}