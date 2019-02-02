import * as React from "react";
import { classNames, snapshotToArray } from "../../../utils/utils";
import TableRow from "./TableRow";
import { DefaultButton } from "../shared/Button/DefaultButton/DefaultButton";
import database from "../../config/firebase/database/database";
import {
  IWithModalContext,
  withModalContext
} from "../../context/withModalContext";
import {
  IWithLoaderContext,
  withLoaderContext
} from "../../context/withLoaderContext";
import Modal from "../Modal/Modal";
import {
  IWithAuthContext,
  withAuthContext
} from "../../context/withAuthContext";

export interface ITableProps extends IWithModalContext, IWithLoaderContext, IWithAuthContext { }

export interface ITableState {
  tasks: ITasks[];
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
    };
  }

  static styleClass = {
    root: classNames(
      "ulv__absolute",
      "ulv__pin-t",
      "ulv__pin-r",
      "ulv__bg-green-tertiary",
      "ulv__w-full",
      "ulv__h-full"
    ),
    table: classNames("ulv__flex", "ulv__flex-col"),
    button: classNames("ulv__bg-green-tertiary", "ulv__w-32", "hover__ulv__bg-green-secondary")
  };

  render() {
    const { tasks } = this.state;
    const { modalState, updateModalState, authState } = this.props;
    const data = snapshotToArray(tasks);

    return (
      <div className={Table.styleClass.root}>
        {modalState.active ? (
          <Modal getDataFromFirebase={() => this.getDataFromFirebase()} uid={authState.authUser.uid} />
        ) : null}
        <div className={Table.styleClass.table}>
          <div className={"ulv__flex ulv__bg-green-primary ulv__mt-17 head"}>
            <div>Jira oppgave</div>
            <div>Beskrivelse</div>
            <div>Tid brukt</div>
            <div>
              <DefaultButton
                className={Table.styleClass.button}
                text={"Ny oppgave"}
                onClick={() => updateModalState()}
              />
            </div>
          </div>
          <div className={"ulv__flex ulv__flex-col row"}>
            {data.map(task => {
              return (
                <TableRow
                  key={task.id}
                  {...task}
                  updateTable={this.getDataFromFirebase}
                  uid={authState.authUser.uid}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getDataFromFirebase();
  }

  private getDataFromFirebase = () => {
    const { updateLoaderState, authState } = this.props;
    updateLoaderState();
    database()
      .getTasks(authState.authUser.uid)
      .then(snapshot => {
        this.setState({
          tasks: [snapshot.val()]
        });
        updateLoaderState();
      });
  };
}

export default withAuthContext<any>(withModalContext<any>(withLoaderContext(Table)));
