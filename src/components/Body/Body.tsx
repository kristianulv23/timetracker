import * as React from "react";
import { classNames } from "../../../utils/utils";
import Menu from "../Menu/Menu";

export interface IBodyProps {

}

const styles = {
    root: classNames(
        'ulv__relative',
        'ulv__bg-green-tertiary',
        'ulv__h-screen',
        'ulv__w-screen'
    )
}

export default class Body extends React.Component<IBodyProps, {}> {

    render() {
        return (
            <div className={styles.root}>
                <Menu />
            </div>
        );
    }
}