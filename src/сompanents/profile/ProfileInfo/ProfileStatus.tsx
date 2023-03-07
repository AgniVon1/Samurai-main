import React, {useState} from 'react';
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/preloader/Preloader";

type PropsType = {
    status:string
}

export const ProfileStatus:React.FC<PropsType> = ({status}) => {
    const [editMode,setEditMode] = useState(false)
    const activateMode = () =>{
      setEditMode(true)
    }
    return (<div>
      {!editMode ? (<span onClick={activateMode}>{status}</span>):
        (<input autoFocus={true} onBlur={()=>setEditMode(false)} value={status}/>)}
      </div>
    );
};
