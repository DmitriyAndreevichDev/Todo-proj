import * as React from "react";
import {AppBar} from "@mui/material";


interface BoundProps {

}

interface StateProps {

}

interface DispatchProps {

}

type Props = StateProps & DispatchProps & BoundProps;
const testElement = ["Test 1", "Test 2", "Test 3", "Test 4"]

const NavigationBar: React.FC<Props> = (props: Props) => {
    return (
        <nav className="">
            <ul>
                {testElement.map(el => <li >
                    {el}
                </li>)}
            </ul>

        </nav>
    );
};

export default NavigationBar;