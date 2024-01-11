import { ChangeEvent, useState } from "react"

type EditableSpanProps = {
    oldTitle: string
    callBack: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanProps> = (props: EditableSpanProps) => {
    const [edit,setEdit] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(props.oldTitle);



    const editFoo = () => {
        setEdit(!edit)
        if(edit) {
            addTask()
        }
       
    }

    const onChangeTitleHendler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(newTitle)
    }

    return (
        edit
        ? <input value={newTitle} onBlur={editFoo} autoFocus onChange={onChangeTitleHendler}/>
        :<span onDoubleClick={editFoo}>{props.oldTitle}</span>
    )
}