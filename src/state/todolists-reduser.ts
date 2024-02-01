import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../App"

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLISTS':
            return state.filter(el => el.id !== action.payload.id);
        case 'ADD-TODOLIST':
        return [...state,
            {id:action.payload.todolistID,title:action.payload.title,filter: action.payload.filter}]
        case 'CHANGE-TITLE':
            return state.map(el => el.id === action.payload.id
                ?{...el,title: action.payload.title}
                :el)
        case 'CHANGE-TODOLIST-FILTER': 
        return state.map(el => el.id === action.payload.id
            ? {...el,filter: action.payload.filter}: el)
        default: return state
    }

}


type ActionType = removeTodolistsACType | changeTodolistTitleACType | addTodoListsACType | ChangeFilterACType
export type removeTodolistsACType = ReturnType<typeof removeTodolistsAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type addTodoListsACType = ReturnType<typeof addTodoListsAC>
type ChangeFilterACType = ReturnType<typeof ChangeFilterAC>
export const removeTodolistsAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLISTS',
        payload: {
            id
        }
    }as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TITLE',
        payload: {
            id,title
        }
        
    }as const 
}

export const addTodoListsAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,todolistID: v1(),filter: 'all'
        }
    }as const
}

export const ChangeFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,filter
        }
    }as const
}