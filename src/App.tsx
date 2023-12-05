import React from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';

function App() {
    const task_1 : Array<TaskType> = [
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
    ]

    const task_2 : Array<TaskType> = [
        {
            id: 4,
            title: "Meat",
            isDone : true
        },
        {
            id: 5,
            title: "Fish",
            isDone : true
        },
        {
            id: 6,
            title: "Water",
            isDone : true
        },
    ]
    return (
        <div className="App">
           <TodoList title={"What to learn"} tasks={task_1}/>
           <TodoList title={"What to bue"} tasks={task_2}/>
          
        </div>
    );
}



export default App;
