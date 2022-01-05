import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import * as React from "react";
import {AuthData} from "./AuthPage";
import {useEffect, useState} from "react";

interface BoundProps {
    handleChange(evt: React.ChangeEvent<HTMLInputElement>): void;
    handleLogin(): void;
    form: AuthData;
    isLoading: boolean;
    setLoading(isLoad: boolean): void
}

interface StateProps {
}

interface DispatchProps {

}

type Props = StateProps & DispatchProps & BoundProps;


const Login: React.FC<Props> = (props: Props) => {
    const [isLoading, setLoading] = useState(false)
    return (
        <div className="Absolute-Center Auth-Block">
            <h3>Авторизация</h3>
            <form onSubmit={(evt) => evt.preventDefault()} action="" style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "600px",
                margin: "0 auto",
            }}>
                <TextField
                    id="standard-basic"
                    name="email"
                    type="email"
                    variant="standard"
                    label="E-mail"
                    onChange={props.handleChange}
                    value={props.form.email}
                />
                <TextField
                    id="standard-basic"
                    variant="standard"
                    type="password"
                    name="password"
                    label="Пароль"
                    onChange={props.handleChange}
                    value={props.form.password}
                />

                <Button
                    disabled={isLoading}
                    onClick={ () => {
                        setLoading(true)
                        props.handleLogin()
                    }}
                    variant="contained"
                >
                    {isLoading ? "Загрузка..." : "Войти"}
                </Button>
                {!isLoading && <Link to="/registration"><Button variant="text">Нет аккаута?</Button></Link>}
            </form>
        </div>
    );
};

export default Login