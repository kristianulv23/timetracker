import * as React from "react";
import { classNames } from "../../../utils/utils";
import { Input } from '../shared/Input/Input';
import { DefaultButton } from '../shared/Button/DefaultButton/DefaultButton';
import { IWithModalContext, withModalContext } from "../../context/withModalContext";
import { addTask } from '../../config/firebase/firebase';

export interface IModalProps extends IWithModalContext {
    onclick: () => void;
}

export interface IModalState {
    task: string;
    description: string;
}

class Modal extends React.Component<IModalProps, IModalState> {

    constructor(props) {
        super(props);
        this.state = {
            task: '',
            description: ''
        }
    }

    static styleClass = {
        backdrop: classNames(
            'ulv__flex',
            'ulv__items-center',
            'ulv__fixed',
            'ulv__pin',
            'ulv__p-10',
            'ulv__z-40'
        ),
        modal: classNames(
            'ulv__bg-green-primary',
            'ulv__min-w-md',
            'ulv__max-w-lg',
            'ulv__min-h-sm',
            'ulv__m-auto',
            'ulv__z-50'
        ),
        form: classNames(
            'ulv__flex',
            'ulv__flex-col',
            'ulv__p-16'
        ),
        button: classNames(
            'ulv__bg-green-tertiary',
            'ulv__w-48'
        ),
        input: classNames(
            'ulv__mb-4'
        )
    }

    render() {

        const { updateModalState } = this.props;

        return (
            <div className={Modal.styleClass.backdrop} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} onClick={() => updateModalState()}>
                <div className={Modal.styleClass.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={Modal.styleClass.form}>
                        <Input className={Modal.styleClass.input} placeholder={'Oppgave'} onChange={(e) => this.setState({ task: e.target.value })} />
                        <Input className={Modal.styleClass.input} placeholder={'Beskrivelse'} onChange={(e) => this.setState({ description: e.target.value })} />
                        <DefaultButton text={'Opprett oppgave'} className={Modal.styleClass.button} onClick={() => this.addTask()} />
                    </div>
                </div>
            </div>
        );
    }

    private addTask = () => {
        const { onclick } = this.props;
        const { task, description } = this.state;
        addTask(task, 0, description);
        onclick();
    }
}

export default withModalContext(Modal);