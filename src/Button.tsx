import React from "react";

type ButtonPropsType = {
    title: string
    onClickHandler: () => void
    isDisabled?: boolean
    classes?: string

}

export const Button = (props: ButtonPropsType) => {
    return (
        <button 
        disabled ={props.isDisabled}
        onClick={props.onClickHandler}
        className={props.classes}>{props.title}</button>
    )
}