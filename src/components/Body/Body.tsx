import * as React from "react";
import { classNames } from "../../../utils/utils";

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

    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;
        return (
            <div className={styles.root}>
                <div className={'ulv__w-full ulv__h-full'}>
                    {children}
                </div>
            </div>
        );
    }
}