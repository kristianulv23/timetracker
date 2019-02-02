import * as React from 'react';
import { classNames } from '../../../utils/utils';

interface ITableCellProps {
  className?: string;
}

class TableCell extends React.Component<ITableCellProps, {}> {

  constructor(props) {
    super(props);
  }

  static styleClass = {
    root: (className) => classNames(
      'ulv__flex',
      'ulv__flex-1',
      'ulv__items-center',
      'ulv__relative',
      className
    )
  };

  render() {
    const { className } = this.props;
    return (
      <div className={TableCell.styleClass.root(className)}>{this.props.children}</div>
    );
  }
}

export default TableCell;
