import * as React from "react";
import { classNames, convertToHHMMSS } from "../../../utils/utils";
import { DefaultButton } from '../shared/Button/DefaultButton/DefaultButton';
import { updateTask } from '../../config/firebase/firebase';

export interface ITableRowProps {
    id: string;
    task: string;
    time: number;
    description: string;
}

export interface ITableRowState {
    time: number;
    interval: any;
    paused: boolean;
    active: boolean;
}

class TableRow extends React.Component<ITableRowProps, ITableRowState> {

    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            interval: null,
            paused: false,
            active: true
        }
    }

    static styleClass = {
        root: classNames(

        ),
        play: (active) => classNames(
            active ? 'ulv__bg-green' : 'ulv__bg-grey ulv__cursor-not-allowed',
            'ulv__w-24'
        ),
        pause: classNames(
            'ulv__bg-orange',
            'ulv__w-24'
        )
    }

    componentWillMount() {
        const { time } = this.props;
        this.setState({
            time: time
        })
    }

    render() {
        const { time, active } = this.state;
        const { id, task, description } = this.props;
        return (
            <tr key={id}>
                {
                    <React.Fragment>
                        <td>{task}</td>
                        <td>{description}</td>
                        <td>{convertToHHMMSS(time)}</td>
                        <td><DefaultButton className={TableRow.styleClass.play(active)} text={"Start"} onClick={() => this.play()} disabled={!active}/></td>
                        <td><DefaultButton className={TableRow.styleClass.pause} text={"Pause"} onClick={() => this.pause()} /></td>
                    </React.Fragment>
                }
            </tr>
        );
    }

    private play = () => {
        const { time, active } = this.state;
        let count = time;
        let intervalId = setInterval(() => {
            count++;
            this.setState({
                time: count
            });
        }, 1000);
        this.setState({
            interval: intervalId,
            active: !active
        })
    }

    private pause = () => {
        const { interval, active } = this.state;
        this.setState({
            active: !active
        })
        clearInterval(interval);
    }

    componentWillUnmount() {
        const { time } = this.state;
        const { id } = this.props;
        if (time > 0) {
            updateTask(id, time);
        }
    }
}

export default TableRow;