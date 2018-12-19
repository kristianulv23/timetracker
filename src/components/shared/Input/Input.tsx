import * as React from 'react';
import { InputType } from "./InputEnums";
import { classNames } from "../../../../utils/utils";
export * from './InputEnums';

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errorMsg?: string;
    validMsg?: boolean | string;
    className?: string;
}

export interface IInputState {
    value: string | number | string[];
}

export class Input extends React.PureComponent<IInputProps, IInputState> {

    static styleClass = {

        root: (className?: string) => classNames(
            'ulv__tracking-wide',
            className
        )
    };

    static defaultProps = {
        type: InputType.TEXT,
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.value ? props.value : '',
        };
    }

    componentDidUpdate(prevProps: IInputProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                value: this.props.value ? this.props.value : '',
            })
        }
    }

    private onChange = (__event) => {
        __event.preventDefault();

        const { onChange } = this.props;

        if (onChange) {
            onChange(__event);
        }

        this.setState({ value: __event.target.value });
    };

    render() {
        const { children, className, label, errorMsg, onChange, validMsg, ...rest } = this.props;
        const { value } = this.state;
        return (
            <input
                {...rest}
                value={value}
                className={Input.styleClass.root(className)}
                onChange={this.onChange}
            />
        );
    }
}
