import React, {useEffect, useState} from 'react';
import './App.css';
import HeaderComponent from "./components/HeaderComponent";
import {useDispatch, useSelector} from "react-redux";
import Store from "./Redux/state/store";
import {isAuthUserThunk} from "./thunks/authThunk/loginThunk";
import UserService from "./restApi/UserService";
import IUser from "./models/IUser";
import AuthPage from "./pages/authPage/AuthPage";
import MainPage from "./pages/MainPage";


interface IBoundProps {

}

interface IStateProps {

}

interface IDispatchProps {

}

type Props = IBoundProps & IStateProps & IDispatchProps

const App: React.FC = (props: Props) => {
    const [users, setUsers] = useState<IUser[]>([])

    const isAuth = useSelector<Store>(state => state.auth.isAuth)

    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(isAuthUserThunk())
        }
    }, [])
    const getUsers = async () => {
        await UserService.fetchUsers()
            .then((res) => setUsers(res.data))
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <div className="App">
            {isAuth
                ? <MainPage/>
                : <AuthPage/>}

        </div>

    );
}

export default App;
