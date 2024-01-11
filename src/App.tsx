import { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';


export type FilterValuesType = "all"|"active"|"completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const todoListsID1 = v1();
    const todoListsID2 = v1();

    const [tasks, setTasks] = useState ({
        [todoListsID1]: [
            {id: v1(), title: "HTML", isDone : true},
            {id: v1(), title: "CSS", isDone : true},
            {id: v1(), title: "TS", isDone : false},
            {id: v1(), title: "React", isDone : false},
            {id: v1(), title: "JS", isDone : false},
        ],
        [todoListsID2]: [
            {id: v1(), title: "HTML2", isDone : true},
            {id: v1(), title: "CSS2", isDone : true},
            {id: v1(), title: "TS2", isDone : false},
            {id: v1(), title: "React2", isDone : false},
            {id: v1(), title: "JS2", isDone : false},
        ],
    })

    const [todoLists,setTodoLists] = useState<TodoListType[]>(
        [
            {id: todoListsID1, title:'What to lerarn', filter: 'all'},
            {id: todoListsID2, title:'What to buy', filter: 'active'}    
        ])

    //const [filter, setFilter] = useState<FilterValuesType>("all")

    const addTask = (todoListId: string,title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks({...tasks,[todoListId]: [newTask,...tasks[todoListId]]})
        /*
        setTasks([newTask, ...tasks]);*/
    }

    const removeTask = (todoListId: string,taskId: string) => {
        setTasks({...tasks,[todoListId]: tasks[todoListId].filter(el => el.id !== taskId)});
       // setTasks(tasks.filter(t => t.id !== taskId));
    }

    const changeTodoListFilter = (todoListId: string, filterValue: FilterValuesType) => {
        setTodoLists(todoLists.map(el => el.id === todoListId ? {...el,filter:filterValue}: el));

       //const currentTodoList =  todoLists.find((el) => todoListId === el.id)
       //if(currentTodoList) {
       // currentTodoList.filter = filterValue;
         //   setTodoLists([...todoLists])
       //} ' этот подход не подходит, т.к редакс требует имутабельность - создание копий массива и обьекта
    }


    const changeTaskStatus = (todoListId: string,taskId: string, newIsDone: boolean )=> {
        setTasks({...tasks,[todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el,isDone: newIsDone} : el)})
        //const nextState: TaskType[] = tasks.map(t => t.id === taskId ? { ...t, isDone: newIsDone} : t);
       // setTasks(nextState);
    }

    const addTodoList = (title: string) => {
        const todoListId = v1();
        const newTodoList: TodoListType = {id: todoListId, title, filter: 'all'}
        setTodoLists([newTodoList,...todoLists]);
        setTasks({[todoListId]: [],...tasks});
    }

    const updateTask = (todoListId: string, taskId: string, title: string) => {
        setTasks({...tasks,[todoListId]:tasks[todoListId].map( el => el.id ===taskId ? {...el,title}:el)})
    }

    

    return (
        <div className="App">
            <AddItemForm callBack={addTodoList} />
            {todoLists.map(el => {
                return (

                    <TodoList key = {el.id} 
                    todoListId = {el.id}
                    addTask={addTask}
                    changeTodoListFilter={changeTodoListFilter}
                    removeTask ={removeTask} 
                    title={el.title} 
                    tasks={tasks[el.id]}
                    changeTaskStatus={changeTaskStatus}
                    filter = {el.filter}
                    updateTask = {updateTask}/>
                   
                )
            })}

            
        </div>
    );
}



export default App;
