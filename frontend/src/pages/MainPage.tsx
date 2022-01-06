import * as React from "react";
import HeaderComponent from "../components/HeaderComponent";
import {Box} from "@mui/material";
import NavigationBar from "../components/NavigationBar/NavigationBar";

interface BoundProps {

}

interface StateProps {
}

interface DispatchProps {

}

type Props = StateProps & DispatchProps & BoundProps;


const MainPage: React.FC<Props> = (props: Props) => {
    return (
        <div>
            <HeaderComponent />
            <NavigationBar />
            <h1>MainPage</h1>
            <Box> Hello </Box>
        </div>
    );
};

export default MainPage