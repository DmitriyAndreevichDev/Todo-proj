import * as React from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeIcon from '@mui/icons-material/Home';

import {useDispatch, useSelector} from "react-redux";
import Store from "../Redux/state/store";
import {logoutUserThunk} from "../thunks/authThunk/loginThunk";

interface BoundProps {

}

interface StateProps {

}

interface DispatchProps {

}

type Props = StateProps & DispatchProps & BoundProps;


const HeaderComponent: React.FC<Props> = (props: Props) => {
    const isAuth = useSelector<Store>(state => state.auth.isAuth)
    const dispatch = useDispatch()
    const handleLogoutUser = () => {
        dispatch(logoutUserThunk())
    }
    return (
        <header>
            <AppBar position="static">
                <Toolbar
                    color="inherit"
                    variant="dense"
                    style={{display: "flex", justifyContent: "space-around"}}
                >
                    <div style={{display: "flex", justifyContent: "space-around"}}>

                        <Typography variant="h6" style={{fontStyle: "italic"}}>
                            SimpleToDo
                        </Typography>
                        <Button
                            color="inherit"
                        >
                            <HomeIcon color="inherit" />
                        </Button>
                    </div>

                    <Button color="inherit" onClick={handleLogoutUser}>Выйти</Button>
                </Toolbar>
            </AppBar>
        </header>
    );
};

export default HeaderComponent