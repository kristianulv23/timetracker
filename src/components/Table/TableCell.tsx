import * as React from 'react';
import { classNames, convertHHMMSSToSeconds } from '../../../utils/utils';
import { Input } from '../shared/Input/Input';
import database from '../../firebase/database/database';

interface ITableCellProps {
  className?: string;
  allowEditMode?: boolean;
  userId?: string;
  taskId?: string;
  updateTable?: () => void;
}

interface ITableCellState {
  editMode: boolean;
}

class TableCell extends React.Component<ITableCellProps, ITableCellState> {

  public static defaultProps = {
    allowEditMode: false
  };

  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    }
  }

  static styleClass = {
    root: (className: string, allowEditMode: boolean) => classNames(
      'ulv__flex',
      'ulv__flex-1',
      'ulv__items-center',
      'ulv__relative',
      allowEditMode ? 'edit' : '',
      'ulv__cursor-pointer',
      className
    )
  };

  toggleEditMode = (e) => {
    const { editMode } = this.state;
    const { taskId, userId, updateTable } = this.props;
    this.setState({
      editMode: !editMode
    });
    database().updateTask(userId, taskId, convertHHMMSSToSeconds(e.target.value))
    updateTable();
  }

  render() {
    const { className, allowEditMode } = this.props;
    const { editMode } = this.state;
    return (
      <div className={TableCell.styleClass.root(className, allowEditMode)} onClick={() => this.setState({ editMode: !editMode })}>
        {editMode && allowEditMode ?
          <React.Fragment>
            <Input
              onChange={e => e.target.value}
              value={this.props.children[0]}
              onBlur={(e) => this.toggleEditMode(e)}
              onClick={(e) => this.toggleEditMode(e)}
              className={'ulv__w-full ulv__h-full ulv__m-0 ulv__text-center editor'}
              autoFocus
            />
          </React.Fragment>
          :
          this.props.children
        }
      </div>
    );
  }
}

export default TableCell;
