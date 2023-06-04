import {ProfileType} from "../../../../store/profile/profile-reducer";
import {Contacts} from "./Contants/Contants";


type PropsType = {
    profile: ProfileType
    isOwner: boolean
    changeEditMode: () => void

}

export const ProfileData: React.FC<PropsType> =
    ({profile, isOwner, changeEditMode}) => {
        return (
            <>
                {
                    isOwner &&
                    <div>
                        <button onClick={changeEditMode} style={{width: '165px'}}>
                            Редактировать
                        </button>
                    </div>
                }

                <div style={{marginTop: '10px'}}>
                    <b>Имя:</b> {profile.fullName}
                </div>
                <div>
                    <b>Работа:</b> {profile.lookingForAJobDescription}
                </div>
                <div>
                    <b>Обо мне:</b> {profile.aboutMe}
                </div>

                <Contacts contacts={profile.contacts} />
            </>
        );
    }