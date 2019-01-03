import * as React from "react";

export interface IHamburgerButtonProps {
    active: boolean;
    toggleMenu: () => void;
}

export class HamburgerButton extends React.Component<IHamburgerButtonProps, {}> {

    render() {
        const { active, toggleMenu } = this.props;
        return (
            <div className={`hamburger-wrapper ${active ? 'fadeOut' : 'fadeIn'}`} onClick={() => toggleMenu()}>
                <div className={`hamburger-menu ${active ? 'open' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </ div>
        );
    }
}