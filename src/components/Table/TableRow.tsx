import * as React from "react";
import { classNames, convertToHHMMSS } from "../../../utils/utils";
import { DefaultButton } from '../shared/Button/DefaultButton/DefaultButton';

export interface ITableRowProps {
    id: string;
    task: string;
    time: number;
    description: string;
}

class TableRow extends React.Component<ITableRowProps, {}> {

    static styleClass = {
        root: classNames(

        ),
        play: classNames(
            'ulv__bg-green',
            'ulv__w-24'
        ),
        pause: classNames(
            'ulv__bg-orange',
            'ulv__w-24'
        )
    }

    render() {

        const { id, task, time, description } = this.props;
        console.log('props: ', this.props);
        return (
            <tr key={id}>
                {
                    <React.Fragment>
                        <td>{task}</td>
                        <td>{description}</td>
                        <td>{convertToHHMMSS(time)}</td>
                        <td><DefaultButton className={TableRow.styleClass.play} text={"Start"} onClick={() => this.play()} /></td>
                        <td><DefaultButton className={TableRow.styleClass.pause} text={"Pause"} onClick={() => this.pause()} /></td>
                    </React.Fragment>
                }
            </tr>
        );
    }

    private play = () => {
        this.setState({

        })
    }

    private pause = () => {
        this.setState({

        })
    }
}

export default TableRow;