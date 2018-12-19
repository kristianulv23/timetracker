import * as React from "react";
import { classNames } from "../../../utils/utils";

export interface IHomeProps {

}

class Home extends React.Component<IHomeProps, {}> {

    static styleClass = {
        root: classNames(
            'ulv__absolute',
            'ulv__pin-t',
            'ulv__pin-r',
            'ulv__bg-green-tertiary',
            'ulv__w-full',
            'ulv__h-full'
        )
    }

    render() {
        const { } = this.props;
        return (
            <div className={Home.styleClass.root}>
            </div>
        );
    }
}

export default Home;