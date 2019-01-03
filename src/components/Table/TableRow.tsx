import * as React from "react";
import { classNames, convertToHHMMSS } from "../../../utils/utils";
import { DefaultButton } from '../shared/Button/DefaultButton/DefaultButton';
import { updateTask, deleteTask } from '../../config/firebase/firebase';

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
    isDeletingTask: boolean;
}

class TableRow extends React.Component<ITableRowProps, ITableRowState> {

    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            interval: null,
            paused: false,
            active: true,
            isDeletingTask: false
        }
    }

    static styleClass = {
        root: classNames(

        ),
        play: (active) => classNames(
            active ? 'ulv__bg-green' : 'ulv__bg-grey',
            'ulv__w-24'
        ),
        delete: classNames(
            'ulv__bg-red-dark'
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
                        <td><DefaultButton className={TableRow.styleClass.play(active)} text={active ? 'Start' : 'Pause'} onClick={() => this.play()} /></td>
                        <td><DefaultButton className={TableRow.styleClass.delete} text={'Slett'} onClick={() => this.delete()} /></td>
                    </React.Fragment>
                }
            </tr>
        );
    }

    private play = () => {
        const { time, active, interval } = this.state;
        let seconds = time;
        if (active) {
            let intervalId = setInterval(() => {
                seconds++;
                this.setState({
                    time: seconds
                });
            }, 1000);
            this.setState({
                interval: intervalId,
                active: !active,
                time: seconds
            });
        } else {
            this.setState({
                active: !active
            });
            clearInterval(interval);
        }

    }

    private delete = () => {
        const { id } = this.props;
        const { isDeletingTask } = this.state;
        deleteTask(id);
        this.setState({
            isDeletingTask: !isDeletingTask
        })
    }

    componentWillUnmount() {
        const { time, isDeletingTask } = this.state;
        const { id } = this.props;
        if (time > 0 && !isDeletingTask) {
            updateTask(id, time);
        }
    }
}

export default TableRow;