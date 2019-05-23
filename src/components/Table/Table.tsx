import * as React from 'react';
import { classNames, snapshotToArray } from '../../../utils/utils';
import TableRow from './TableRow';
import { DefaultButton } from '../shared/Button/DefaultButton/DefaultButton';
import database from '../../firebase/database/database';
import {
  IWithModalContext,
  withModalContext
} from '../../context/withModalContext';
import {
  IWithLoaderContext,
  withLoaderContext
} from '../../context/withLoaderContext';
import Modal from '../Modal/Modal';
import {
  IWithAuthContext,
  withAuthContext
} from '../../context/withAuthContext';
import TableCell from '../Table/TableCell';

export interface ITableProps extends IWithModalContext, IWithLoaderContext, IWithAuthContext {
  isArchive?: boolean;
}

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
      tasks: [],
    };
  }

  static styleClass = {
    root: classNames(
      'ulv__absolute',
      'ulv__pin-t',
      'ulv__pin-r',
      'ulv__bg-green-tertiary',
      'ulv__w-full',
      'ulv__h-auto'
    ),
    table: classNames('ulv__flex', 'ulv__flex-col', 'ulv__p-8'),
    tableHead: classNames('ulv__flex', 'ulv__bg-green-primary', 'ulv__mt-17', 'ulv__text-lg', 'head'),
    button: classNames('ulv__bg-blue-primary', 'ulv__w-32', 'hover__ulv__bg-blue-secondary', 'ulv__text-base')
  };

  render() {
    const { tasks } = this.state;
    const { modalState, updateModalState, authState, isArchive } = this.props;
    const data = snapshotToArray(tasks);
    return (
      <div className={Table.styleClass.root}>
        {modalState.active ? (
          <Modal getDataFromFirebase={() => this.getDataFromFirebase()} uid={authState.authUser.uid} />
        ) : null}
        <div className={Table.styleClass.table}>
          <div className={Table.styleClass.tableHead}>
            <TableCell className={'ulv__justify-center'}>Jira oppgave</TableCell>
            <TableCell className={'ulv__justify-center'}>Beskrivelse</TableCell>
            <TableCell className={'ulv__justify-center'}>Tid brukt</TableCell>
            {isArchive
              ?
              <>
                <TableCell className={'ulv__justify-center'}>Arkivert</TableCell>
                <TableCell className={'ulv__justify-center'}></TableCell>
              </>
              :
              <TableCell className={classNames('ulv__justify-end ulv__mr-8')}>
                <DefaultButton className={Table.styleClass.button} text={'Ny oppgave'} onClick={() => updateModalState()} />
              </TableCell>
            }
          </div>
          <div className={'ulv__flex ulv__flex-col ulv__shadow-lg row'}>
            {data && data.map(task => {
              return (
                <TableRow
                  key={task.id}
                  {...task}
                  updateTable={this.getDataFromFirebase}
                  uid={authState.authUser.uid}
                  isArchive={isArchive}
                  archivedAtDate={task.timestamp}
                  archiveId={task.archiveId}
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
    const { updateLoaderState, authState, isArchive } = this.props;
    updateLoaderState();
    isArchive ?
      database()
        .getArchivedTasks(authState.authUser.uid)
        .then(snapshot => {
          this.setState({
            tasks: [snapshot.val()]
          });
          updateLoaderState();
        })
      :
      database()
        .getTasks(authState.authUser.uid)
        .then(snapshot => {
          this.setState({
            tasks: [snapshot.val()]
          });
          updateLoaderState();
        })
  };
}

export default withAuthContext<any>(withModalContext<any>(withLoaderContext(Table)));
