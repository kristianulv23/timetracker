import * as React from "react";
import { classNames } from "../../../utils/utils";
import {
  IWithLoaderContext,
  withLoaderContext
} from "../../context/withLoaderContext";
import Loader from "../Loader/Loader";

export interface IBodyProps extends IWithLoaderContext {}

const styles = {
  root: classNames(
    "ulv__relative",
    "ulv__bg-green-tertiary",
    "ulv__h-screen",
    "ulv__w-screen"
  )
};

class Body extends React.Component<IBodyProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, loaderState } = this.props;
    return (
      <div className={styles.root}>
        {loaderState.loading ? <Loader /> : null}
        <div className={"ulv__w-full ulv__h-full"}>{children}</div>
      </div>
    );
  }
}

export default withLoaderContext(Body);
