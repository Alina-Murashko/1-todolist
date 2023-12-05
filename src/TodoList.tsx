import React from 'react';
import { Button } from './Button';
import { JsxElement } from 'typescript';

export type TaskType = {
    id: number
    title: string
    isDone : boolean

}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

export const TodoList = ({title, tasks}: TodoListPropsType) => {

    const ListItems: Array<JSX.Element> = []

    for (let i = 0; i < tasks.length; i++) {
        const listItem : JSX.Element = <li>
            <input type="checkbox" checked={tasks[i].isDone}/> 
            <span>{tasks[i].title}</span>
        </li>
        ListItems.push(listItem)
    }

    return (
        <div className='todoList'>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title='+' />
            </div>
            <ul>
                {ListItems}
            </ul>
            <div>
                <Button title='All' />
                <Button title='Active' />
                <Button title='Completed' />
            </div>
        </div>
    )
}