import Checkbox from '@mui/material/Checkbox';
import { ChangeEvent } from 'react';

type CheckBoxInputType = {
    callback: (value: boolean) => void
    isDone: boolean
}

export const CheckBoxInput = ({callback,isDone}: CheckBoxInputType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.checked;
        callback(value);
    }

    return (
        <Checkbox onChange={onChangeHandler} checked={isDone} />
    )
}