import * as React from 'react';
import { classNames } from "../../../../utils/utils";

export interface ITextareaProps extends React.TextareaHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
    placeholder?: string;
}

export interface ITextareaState {
    value: string | number | string[];
}

export class Textarea extends React.PureComponent<ITextareaProps, ITextareaState> {

    static styleClass = {

        root: (className?: string) => classNames(
            'ulv__tracking-wide',
            className
        )
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.value ? props.value : '',
        };
    }

    componentDidUpdate(prevProps: ITextareaProps) {
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
        const {  className, placeholder } = this.props;
        const { value } = this.state;
        return (
            <textarea
                value={value}
                className={Textarea.styleClass.root(className)}
                onChange={this.onChange}
                maxLength={100}
                placeholder={placeholder}
                rows={10}
            />
        );
    }
}
