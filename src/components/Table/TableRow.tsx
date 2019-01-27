import * as React from "react";
import { classNames, convertToHHMMSS } from "../../../utils/utils";
import { DefaultButton } from "../shared/Button/DefaultButton/DefaultButton";
import database from "../../config/firebase/database/database";
import TableCell from "../Table/TableCell";

export interface ITableRowProps {
  id: string;
  task: string;
  time: number;
  description: string;
  updateTable: () => void;
}

export interface ITableRowState {
  time: number;
  interval: any;
  paused: boolean;
  timerActive: boolean;
  isDeletingTask: boolean;
}

class TableRow extends React.Component<ITableRowProps, ITableRowState> {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      interval: null,
      paused: false,
      timerActive: false,
      isDeletingTask: false
    };
  }

  static styleClass = {
    root: classNames(),
    toggleTimer: active =>
      classNames(
        !active
          ? "ulv__bg-green hover__ulv__bg-green-dark"
          : "ulv__bg-grey hover__ulv__bg-grey-dark",
        "ulv__min-w-24"
      ),
    delete: classNames(
      "ulv__bg-red-dark",
      "hover__ulv__bg-red-darker",
      "ulv__min-w-24"
    ),
    reset: classNames(
      "ulv__bg-grey-dark",
      "hover__ulv__bg-grey-darker",
      "ulv__min-w-24"
    )
  };

  componentWillMount() {
    const { time } = this.props;
    this.setState({
      time: time
    });
  }

  render() {
    const { time, timerActive } = this.state;
    const { task, description } = this.props;
    return (
      <div className={"ulv__relative ulv__items-center item"}>
        <div className={"ulv__flex ulv__w-full ulv__absolute ulv__h-full"}>
          <TableCell>{task}</TableCell>
          <TableCell>{description}</TableCell>
          <TableCell>{convertToHHMMSS(time)}</TableCell>
          <TableCell>
            <div className={"ulv__mr-2"}>
              <DefaultButton
                className={TableRow.styleClass.toggleTimer(timerActive)}
                text={timerActive ? "Pause" : "Start"}
                onClick={() => this.toggleTimer()}
              />
            </div>
            <div className={"ulv__mr-2"}>
              <DefaultButton
                className={TableRow.styleClass.delete}
                text={"Slett"}
                onClick={() => this.delete()}
              />
            </div>
            <div className={""}>
              <DefaultButton
                className={TableRow.styleClass.reset}
                text={"Nullstill"}
                onClick={() => this.reset()}
              />
            </div>
          </TableCell>
        </div>
      </div>
    );
  }

  private toggleTimer = () => {
    const { id } = this.props;
    const { time, timerActive, interval } = this.state;
    let seconds = time;
    if (!timerActive) {
      let intervalId = setInterval(() => {
        seconds++;
        this.setState({
          time: seconds,
          interval: intervalId,
          timerActive: !timerActive
        });
      }, 1000);
    } else {
      this.setState({
        timerActive: !timerActive
      });
      clearInterval(interval);
    }
    database().updateTask(id, seconds);
  };

  private reset = () => {
    const { interval, timerActive } = this.state;
    const { id } = this.props;
    this.setState({
      time: 0,
      timerActive: timerActive ? !timerActive : null
    });
    database().updateTask(id, 0);
    clearInterval(interval);
  };

  private delete = () => {
    const { id, updateTable } = this.props;
    const { isDeletingTask } = this.state;
    this.setState({
      isDeletingTask: !isDeletingTask
    });
    database().deleteTask(id);
    updateTable();
  };

  componentWillUnmount() {
    const { time, isDeletingTask } = this.state;
    const { id } = this.props;
    if (time > 0 && !isDeletingTask) {
      database().updateTask(id, time);
    }
  }
}

export default TableRow;
