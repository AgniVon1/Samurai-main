import React, {ChangeEvent, useEffect, useState} from 'react';

type PropsType = {
    status:string
    updateUserStatus:(newStatus :string) =>void,
}

export const ProfileStatus:React.FC<PropsType> =React.memo(({status,updateUserStatus}) => {
    const [editMode,setEditMode] = useState(false)
    const [localStatus,setLocalStatus] = useState(status)

    useEffect(() => {
        setLocalStatus(status)
      }
      ,[status]
    )
    const activateMode = () =>{
      setEditMode(true)
    }

    const deActivateMode =()=>{
      updateUserStatus(localStatus)
      setEditMode(false)
    }
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setLocalStatus(e.currentTarget.value)
    }

    return (<div>
      {!editMode ? (
        <span onClick={activateMode}>{status}</span>
        ):
        (<input  autoFocus={true} onBlur={deActivateMode} onChange={onValueChange} value={localStatus}/>)}
      </div>
    );
})
