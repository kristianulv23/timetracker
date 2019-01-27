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

export interface ITableProps extends IWithModalContext, IWithLoaderContext {}

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

  componentWillMount() {
    this.getDataFromFirebase();
  }

  render() {
    const { tasks } = this.state;
    const { modalState, updateModalState } = this.props;
    const data = snapshotToArray(tasks);

    return (
      <div className={Table.styleClass.root}>
        {modalState.active ? (
          <Modal toggleModal={() => this.hasChanged()} />
        ) : null}
        <div className={Table.styleClass.table}>
          <div className={"ulv__flex ulv__bg-green-primary ulv__mt-17 head"}>
            <div className={""}>Jira oppgave</div>
            <div className={""}>Beskrivelse</div>
            <div className={""}>Tid brukt</div>
            <div className={""}>
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
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  private hasChanged = () => {
    const { updateModalState } = this.props;
    this.getDataFromFirebase();
    updateModalState();
  };

  private getDataFromFirebase = () => {
    const {updateLoaderState} = this.props;
    updateLoaderState();
    database()
      .getTasks()
      .then(snapshot => {
        this.setState({
          tasks: [snapshot.val()]
        });
        updateLoaderState();
      });
  };
}

export default withModalContext<any>(withLoaderContext(Table));
