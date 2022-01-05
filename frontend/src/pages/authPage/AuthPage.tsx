import * as React from "react";
import axios from "axios";

import {Routes, Route} from "react-router-dom";
import "./Auth.css"
import { useState} from "react";
import {loginUserThunk, registrationUserThunk} from "../../thunks/authThunk/loginThunk";
import {useDispatch} from "react-redux";
import Login from "./Login";
import Registration from "./Registration";
import {registration} from "../../Redux/redusers/authReducer";

interface BoundProps {

}

interface StateProps {

}

interface DispatchProps {

}


type Props = StateProps & DispatchProps & BoundProps;

export interface AuthData {
    email: string;
    password: string;
}

const AuthPage: React.FC<Props> = (props: Props) => {
    const [form, setForm] = useState<AuthData>({
        email: "",
        password: "",
    })

    const [isLoading, setLoading] = useState(false)

    const dispatch = useDispatch()


    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        setForm({
            ...form,
            [evt.currentTarget.name]: evt.currentTarget.value
        })
        console.log({[evt.currentTarget.name]: evt.currentTarget.value})
    }

    const handleRegistrationUser = async () => {

        await dispatch(registrationUserThunk(form.email, form.password))
        setLoading(false)
    }

    const handleLogin = async () => {

        await dispatch(loginUserThunk(form.email, form.password))
        setLoading(false)
    }

    return (
        <Routes>
            <Route path="/login" element={
                <Login
                    handleChange={handleChange}
                    handleLogin={handleLogin}
                    form={form}
                    isLoading={isLoading}
                    setLoading={setLoading}
                />
            }/>
            <Route path="/registration" element={
                <Registration
                    handleChange={handleChange}
                    handleRegistrationUser={handleRegistrationUser}
                    form={form}
                    isLoading={isLoading}
                    setLoading={setLoading}
                />
            }/>
        </Routes>
    );
};

export default AuthPage