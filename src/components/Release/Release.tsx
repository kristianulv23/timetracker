import * as React from "react";
import { classNames } from "../../../utils/utils";
import { IWithModalContext, withModalContext } from "../../context/withModalContext";


export interface IReleaseProps extends IWithModalContext { }

export interface IReleaseState {
    hidden: boolean
}

class Modal extends React.Component<IReleaseProps, IReleaseState> {

    constructor(props) {
        super(props);
        this.state = {
            hidden: false
        }
    }

    static styleClass = {
        backdrop: classNames(
            'ulv__flex',
            'ulv__items-center',
            'ulv__fixed',
            'ulv__pin',
            'ulv__z-40',
        ),
        modal: classNames(
            'ulv__bg-green-primary',
            'ulv__min-w-98',
            'ulv__max-w-xs',
            'ulv__min-h-sm',
            'ulv__m-auto',
            'ulv__z-50',
            'modal',
            'ulv__relative'
        ),
        form: classNames(
            'ulv__flex',
            'ulv__flex-col',
            'ulv__items-center',
            'ulv__p-16',
            'ulv__text-white'
        ),
        button: classNames(
            'ulv__bg-blue-primary',
            'ulv__w-full',
            'hover__ulv__bg-blue-secondary'
        ),
        input: classNames(
            'ulv__mb-4'
        )
    }

    render() {
        const { hidden } = this.state;
        return (
            hidden ?
                null
                :
                <div className={Modal.styleClass.backdrop} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <div className={Modal.styleClass.modal}>
                        <div className={Modal.styleClass.form}>
                            <span className={'ulv__absolute ulv__pin-t ulv__pin-r ulv__p-4 ulv__cursor-pointer ulv__text-center'} onClick={() => this.setState({ hidden: !hidden })}>X</span>
                            <h1>Ny release <span role="img" aria-label="grinning face">😆</span></h1>
                            <p className={'ulv__text-center ulv__mt-8 ulv__'}>edit mode mæthafæcka!!!</p>
                            <img className={'ulv__mt-8'} src="http://gif-finder.com/wp-content/uploads/2015/05/Mr.Bean-Thumbs-Up.gif" title="Mr bean thumbs up" />
                        </div>
                    </div>
                </div>
        );
    }
}

export default withModalContext(Modal);