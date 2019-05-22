import * as React from "react";
import { classNames } from "../../../utils/utils";
import { Input } from '../shared/Input/Input';
import { Textarea } from '../shared/Textarea/Textarea';
import { DefaultButton } from '../shared/Button/DefaultButton/DefaultButton';
import { IWithModalContext, withModalContext } from "../../context/withModalContext";
import database from '../../firebase/database/database';


export interface IModalProps extends IWithModalContext {
    getDataFromFirebase: () => void;
    uid: string;
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
            'ulv__justify-center',
            'ulv__p-16',
            'ulv__text-white',
            'ulv__w-screen',
            'ulv__h-screen',
            'ulv__relative',
            'md__ulv__w-full',
            'md__ulv__h-full'
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
        const { updateModalState } = this.props;
        return (
            <div className={Modal.styleClass.backdrop} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} onMouseDown={() => updateModalState()}>
                <div className={Modal.styleClass.modal} onMouseDown={(e) => e.stopPropagation()}>
                    <div className={Modal.styleClass.form}>
                        <span className={'ulv__absolute ulv__pin-t ulv__pin-r ulv__p-4 ulv__cursor-pointer ulv__text-center'} onClick={() => updateModalState()}>X</span>
                        <Input className={Modal.styleClass.input} placeholder={'Oppgave'} onChange={(e) => this.setState({ task: e.target.value })} value={'SNOAM-'} autoFocus maxLength={11} />
                        <Textarea className={Modal.styleClass.input} placeholder={'Beskrivelse'} onChange={(e) => this.setState({ description: e.target.value })} />
                        <DefaultButton text={'Opprett oppgave'} className={Modal.styleClass.button} onClick={() => this.addTask()} />
                    </div>
                </div>
            </div>
        );
    }

    private addTask = () => {
        const { getDataFromFirebase, updateModalState, uid } = this.props;
        const { task, description } = this.state;
        database().addTask(uid, task, 0, description);
        getDataFromFirebase();
        updateModalState();
    }
}

export default withModalContext(Modal);