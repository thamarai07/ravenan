import { AlertInterFace } from "../types/types"
export default function Alert (props : AlertInterFace){
    return (
        <>
            <p>
                {props.content} {props.link}
            </p>
        </>
    )
}