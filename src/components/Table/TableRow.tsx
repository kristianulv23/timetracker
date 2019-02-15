import * as React from 'react';
import { classNames, convertToHHMMSS } from '../../../utils/utils';
import { DefaultButton } from '../shared/Button/DefaultButton/DefaultButton';
import database from '../../firebase/database/database';
import TableCell from '../Table/TableCell';

export interface ITableRowProps {
  id: string;
  task: string;
  time: number;
  description: string;
  updateTable: () => void;
  uid: string;
}

export interface ITableRowState {
  timer: number;
  interval: any;
  paused: boolean;
  timerActive: boolean;
  isDeletingTask: boolean;
}

class TableRow extends React.Component<ITableRowProps, ITableRowState> {
  constructor(props) {
    super(props);
    this.state = {
      timer: this.props.time,
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
          ? 'ulv__bg-green hover__ulv__bg-green-dark'
          : 'ulv__bg-grey hover__ulv__bg-grey-dark',
        'ulv__min-w-24'
      ),
    delete: classNames(
      'ulv__bg-red-dark',
      'hover__ulv__bg-red-darker',
      'ulv__min-w-24'
    ),
    reset: classNames(
      'ulv__bg-grey-dark',
      'hover__ulv__bg-grey-darker',
      'ulv__min-w-24'
    )
  };

  render() {
    const { timerActive, timer } = this.state;
    const { task, description, uid, id, updateTable } = this.props;
    return (
      <div className={'ulv__relative ulv__items-center ulv__mb-px item'}>
        <div className={'ulv__flex ulv__w-full ulv__absolute ulv__h-full'}>
          <TableCell className={'ulv__justify-center'}>{task}</TableCell>
          <TableCell className={'ulv__justify-center'}>{description}</TableCell>
          <TableCell
            updateTable={updateTable}
            className={'ulv__justify-center ulv__font-bold'}
            allowEditMode={true}
            userId={uid}
            taskId={id}
            timerActive={timerActive}
            >{convertToHHMMSS(timer)}<span/>
          </TableCell>
          <TableCell className={classNames('ulv__justify-end ulv__mr-8')}>
            <div className={'ulv__mr-2'}>
              <DefaultButton
                className={TableRow.styleClass.toggleTimer(timerActive)}
                text={timerActive ? 'Pause' : 'Start'}
                onClick={() => this.toggleTimer()}
              />
            </div>
            <div className={'ulv__mr-2'}>
              <DefaultButton
                className={TableRow.styleClass.delete}
                text={'Slett'}
                onClick={() => this.delete()}
              />
            </div>
            <div className={''}>
              <DefaultButton
                className={TableRow.styleClass.reset}
                text={'Nullstill'}
                onClick={() => this.reset()}
                disabled={timer === 0}
              />
            </div>
          </TableCell>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.time !== this.state.timer && !prevState.timerActive) {
      this.setState({
        timer: prevProps.time
      })
    }
  }

  private toggleTimer = () => {
    const { id, uid, updateTable } = this.props;
    const { timer, timerActive, interval } = this.state;
    let seconds = timer;
    if (!timerActive) {
      let intervalId = setInterval(() => {
        seconds++;
        this.setState({
          timer: seconds,
        });
        database().updateTask(uid, id, seconds);
      }, 1000);
      this.setState({
        interval: intervalId,
        timerActive: !timerActive
      })
    } else {
      database().updateTask(uid, id, seconds);
      updateTable()
      this.setState({
        timerActive: !timerActive
      });
      clearInterval(interval);
    }
  };

  private reset = () => {
    const { timerActive } = this.state;
    const { id, uid, updateTable } = this.props;
    this.setState({
      timer: 0,
      timerActive: timerActive ? !timerActive : null
    });
    database().updateTask(uid, id, 0);
    updateTable()
  };

  private delete = () => {
    const { id, updateTable, uid } = this.props;
    const { isDeletingTask } = this.state;
    this.setState({
      isDeletingTask: !isDeletingTask
    });
    database().deleteTask(uid, id);
    updateTable();
  };

  componentWillUnmount() {
    const { timer, isDeletingTask, interval } = this.state;
    const { id, uid } = this.props;
    if (timer > 0 && !isDeletingTask) {
      database().updateTask(uid, id, timer);
    }
    clearInterval(interval);
  }
}

export default TableRow;
