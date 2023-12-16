import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';


const titleTodoList = "What to learn";

export type FilterValuesType = "all"|"active"|"completed"

function App() {
   /* let tasks : Array<TaskType> = [
        {
            id: 1,
            title: "HTML",
            isDone : true,
        },
        {
            id: 2,
            title: "CSS",
            isDone : true,
        },
        {
            id: 3,
            title: "TS",
            isDone : false,
        },
    ]*/

    const [tasks, setTasks] = useState <Array<TaskType>>([
        {
            id: 1,
            title: "HTML",
            isDone : true,
        },
        {
            id: 2,
            title: "CSS",
            isDone : true,
        },
        {
            id: 3,
            title: "TS",
            isDone : false,
        },
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType) : Array<TaskType> => {
        const tasksForTodoList = filter === "active"
        ? tasks.filter(t => t.isDone === false)
        : filter === "completed"
            ? tasks.filter(t => t.isDone === true)
            : tasks
            return tasksForTodoList
    }



    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const changeTodoListFilter = (filterValue: FilterValuesType) => {
        setFilter(filterValue)
    }

    return (
        <div className="App">
           <TodoList changeTodoListFilter={changeTodoListFilter} removeTask ={removeTask} title={titleTodoList} tasks={getFilteredTasks(tasks, filter)}/>
        </div>
    );
}



export default App;
