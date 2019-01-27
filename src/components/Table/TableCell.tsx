import * as React from "react";
import { classNames } from "../../../utils/utils";

class TableCell extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  static styleClass = {
    root: classNames(
      "ulv__flex",
      "ulv__items-center",
      "ulv__justify-center",
      "ulv__flex-1"
    )
  };

  render() {
    return (
      <div className={TableCell.styleClass.root}>{this.props.children}</div>
    );
  }
}

export default TableCell;
