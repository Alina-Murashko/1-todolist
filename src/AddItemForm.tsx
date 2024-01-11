import { ChangeEvent, KeyboardEvent, KeyboardEventHandler, useState } from "react";
import { Button } from "./Button";

type AddItemFormProps = {
    callBack: (title: string) => void
}


export const AddItemForm: React.FC<AddItemFormProps> = (props: AddItemFormProps) => {

    const [taskTitle, setTaskTitle] = useState<string>('');
    const [inputError,setInputError] = useState<boolean>(false);

    const addTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if(trimmedTaskTitle) {
            setInputError(false);
            props.callBack(taskTitle)
        } else {
            setInputError(true);
        }
        setTaskTitle('')
    }


        const onKeyDownTitleHendler = (e: KeyboardEvent<HTMLInputElement>) => {
            if(e.key === 'Enter' && taskTitle) {
                addTaskHandler()
            } else if(e.key === 'Enter' && !taskTitle) {
                setInputError(true);
            }
        }

        const onChangeTitleHendler = (e: ChangeEvent<HTMLInputElement>) => {
            setInputError(false);
            setTaskTitle(e.currentTarget.value)
        }

    

    return (
        <div>
            <div>
                <input value={taskTitle} 
                    onChange={onChangeTitleHendler} 
                    onKeyDown={onKeyDownTitleHendler}
                    className={inputError ? 'error' : ''}/>
                <Button onClickHandler={addTaskHandler} title='+' isDisabled={!taskTitle} />
                {inputError && <div className='error-message'>Error: title is requried</div>}
            </div>
        </div>
    )
}