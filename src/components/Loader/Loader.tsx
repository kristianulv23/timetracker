import * as React from "react";
import { classNames } from "../../../utils/utils";

export interface IModalProps {}

export interface IModalState {}

class Loader extends React.Component<IModalProps, IModalState> {
  constructor(props) {
    super(props);
  }

  static styleClass = {
    backdrop: classNames(
      "ulv__flex",
      "ulv__items-center",
      "ulv__fixed",
      "ulv__pin",
      "ulv__p-10",
      "ulv__z-40"
    )
  };

  render() {
    return (
      <div
        className={Loader.styleClass.backdrop}
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      >
        <div className="logo">
          <div className="white" />
          <div className="orange" />
          <div className="red" />
        </div>
      </div>
    );
  }
}

export default Loader;
