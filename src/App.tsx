import { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';


const titleTodoList = "What to learn";

export type FilterValuesType = "all"|"active"|"completed"

function App() {
   
    const [tasks, setTasks] = useState <Array<TaskType>>([
        {
            id: v1(),
            title: "HTML",
            isDone : true,
        },
        {
            id: v1(),
            title: "CSS",
            isDone : true,
        },
        {
            id: v1(),
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

    const addTask = (title: string) => {
        const newTask: TaskType={
            id: v1(),
            title,
            isDone: false,
        }
        setTasks([newTask, ...tasks]);
    }

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId));
    }

    const changeTodoListFilter = (filterValue: FilterValuesType) => {
        setFilter(filterValue)
    }

    return (
        <div className="App">
           <TodoList addTask={addTask} changeTodoListFilter={changeTodoListFilter} removeTask ={removeTask} title={titleTodoList} tasks={getFilteredTasks(tasks, filter)}/>
        </div>
    );
}



export default App;
