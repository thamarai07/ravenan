import { LabelInterface } from "../types/types"

export default function Lable (props : LabelInterface) {
    return (
        <>
            <label className={props.class}>{props.name}</label>
        </>
    )
}