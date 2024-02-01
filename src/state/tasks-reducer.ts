import { v1 } from "uuid"
import { FilterValuesType, TasksStateType, TodolistType } from "../App"
import { TaskType } from "../Todolist"
import { addTodoListsACType, removeTodolistsACType } from "./todolists-reduser"

type RemoveTaskAC = ReturnType<typeof removeTaskAC>
type AddTaskAC = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
type ChangeTitleStatusAC = ReturnType<typeof changeTitleStatusAC>

type ActionsType =  RemoveTaskAC | AddTaskAC | ChangeTaskStatusAC | ChangeTitleStatusAC | removeTodolistsACType | addTodoListsACType

export const tasksReducer = (state: TasksStateType, action: ActionsType):TasksStateType  => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state,[action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        case 'ADD-TASK': 
        const newTask: TaskType = {id: v1(), title:action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask,...state[action.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            return {...state, [action.todolistId]: 
                state[action.todolistId].map(el => el.id === action.id?{...el,isDone: action.isDone}: el)}
        case 'CHANGE-TITLE-STATUS':
                return {...state, [action.todolistId]: 
                state[action.todolistId].map(el => el.id === action.id ? {...el,title: action.title} : el)}
        case 'REMOVE-TODOLISTS' :
           //let copystate = {...state};
        //delete copystate[action.payload.id];
        const {[action.payload.id]: [],...rest} = state
            return rest
           
        case 'ADD-TODOLIST': 

            return {...state,[action.payload.todolistID]: []}
        default:
            throw new Error("I don't understand this type")
    }
}



export const removeTaskAC = (taskId: string,todolistId: string) => {
    return { 
        type: 'REMOVE-TASK', taskId, todolistId
        
    }as const
}
export const addTaskAC = (title: string,todolistId: string) => {
    return { type: 'ADD-TASK', title,todolistId}as const
}

export const changeTaskStatusAC = (id: string,isDone: false,todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',id,isDone,todolistId
    }as const
}

export const changeTitleStatusAC = (id: string,title: string,todolistId: string) => {
    return {
        type: 'CHANGE-TITLE-STATUS',id,title,todolistId
    }as const 
} 