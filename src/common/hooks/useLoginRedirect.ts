
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "./useAppSelector";
import {useEffect} from "react";
import {selectIsAuth} from "../../redux/selectors/auth-selectors";

export const useLoginRedirect = () =>{
    const navigate = useNavigate()
    const isAuth = useAppSelector(selectIsAuth)

    useEffect(() => {
        if (!isAuth) navigate('/login');
    }, [isAuth])
}

