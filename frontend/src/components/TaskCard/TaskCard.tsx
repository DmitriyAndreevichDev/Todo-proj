import * as React from "react";
import Card from '@mui/material/Card';

interface BoundProps {

}

interface StateProps {

}

interface DispatchProps {

}

type Props = StateProps & DispatchProps & BoundProps;


const TaskCard: React.FC<Props> = (props: Props) => {
    return (
        <div>
            <Card>Hello</Card>
        </div>
    );
};

export default TaskCard