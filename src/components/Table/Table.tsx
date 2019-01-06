import * as React from "react";
import { classNames } from "../../../utils/utils";
import TableRow from './TableRow';
import { DefaultButton } from '../shared/Button/DefaultButton/DefaultButton';
import { getTasks } from '../../config/firebase/firebase';
import { IWithModalContext, withModalContext } from "../../context/withModalContext";
import Modal from '../Modal/Modal';

export interface ITableProps extends IWithModalContext {

}

export interface ITableState {
    tasks: ITasks[]
}

export interface ITasks {
    id: number;
    task: string;
    description: string;
    time: number;
}

class Table extends React.Component<ITableProps, ITableState> {

    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    static styleClass = {
        root: classNames(
            'ulv__absolute',
            'ulv__pin-t',
            'ulv__pin-r',
            'ulv__bg-green-tertiary',
            'ulv__w-full',
            'ulv__h-full'
        ),
        table: classNames(
            ''
        ),
        button: classNames(
            'ulv__bg-green-tertiary',
            'ulv__w-32'
        )
    }

    componentWillMount() {
        this.getDataFromFirebase();
    }

    render() {

        const { tasks } = this.state;
        const { state } = this.props;
        var data = this.snapshotToArray(tasks);
        const { updateModalState } = this.props;
        return (
            <div className={Table.styleClass.root}>
                {state.active ? <Modal onclick={() => this.hasChanged()} /> : null}
                <table className={Table.styleClass.table}>
                    <thead>
                        <tr>
                            <th>Jira oppgave</th>
                            <th>Beskrivelse</th>
                            <th>Tid brukt</th>
                            <th></th>
                            <th></th>
                            <th>
                                <DefaultButton className={Table.styleClass.button} text={"Ny oppgave"} onClick={() => updateModalState()} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((task) => {
                                return <TableRow key={task.id} {...task} updateData={this.getDataFromFirebase}/>
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    private hasChanged = () => {
        const { updateModalState } = this.props;
        this.getDataFromFirebase();
        updateModalState();
    }

    private getDataFromFirebase = () => {
        getTasks().then((snapshot) => {
            this.setState({
                tasks: [snapshot.val()]
            })
        })
    }

    private snapshotToArray = (snapshot: any) => {
        let array = [];
        snapshot.forEach(element => {
            if (element) {
                Object.keys(element).map((e) => {
                    array.push(element[e])
                })
            }
        });
        return array;
    };
}

export default withModalContext(Table);