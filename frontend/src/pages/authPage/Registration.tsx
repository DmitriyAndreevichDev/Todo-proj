import * as React from "react";

import {Link} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {AuthData} from "./AuthPage";
import {Button} from "@mui/material";
import {useState} from "react";

interface BoundProps {
    handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    handleRegistrationUser: () => void;
    form: AuthData;
    isLoading: boolean;

    setLoading(isLoad: boolean): void
}

interface StateProps {

}

interface DispatchProps {

}

type Props = StateProps & DispatchProps & BoundProps;


const Registration: React.FC<Props> = (props: Props) => {
    const [isLoading, setLoading] = useState(false)
    return (
        <div className="Absolute-Center Auth-Block">
            <h3>Регистрация</h3>
            <form onSubmit={(evt) => evt.preventDefault()} action="" style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "600px",
                margin: "0 auto",
            }}>
                <TextField
                    id="standard-basic"
                    variant="standard"
                    type="email"
                    name="email"
                    label="E-mail"
                    onChange={props.handleChange}
                    value={props.form.email}
                />
                <TextField
                    id="standard-basic"
                    variant="standard"
                    name="password"
                    type="password"
                    label="Пароль"
                    onChange={props.handleChange}
                    value={props.form.password}
                />

                <Button
                    disabled={isLoading}
                    variant="contained"

                    onClick={() => {
                            setLoading(true)
                            props.handleRegistrationUser()
                        }
                    }
                >
                    {isLoading ? "Загрузка..." : "Регистрация"}
                </Button>
                {!isLoading && <Link to="/login"><Button variant="text">Есть аккаунт</Button></Link>}
            </form>
        </div>
    );
};


export default Registration