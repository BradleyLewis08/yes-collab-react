import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navlink-dropdown.scss";
import { CSSTransition } from 'react-transition-group'
import { useMediaQuery } from 'react-responsive'
import { RiArrowDropDownLine } from 'react-icons/ri'

/**
 * See here for navbar stuff: https://css-tricks.com/scroll-fix-content/
 * Had to use Component instead of hooks to take advantage of 
 * componentWillUnmount
 */
export const NavLinkDropdown = (props) => {

    const { to, name, main, subheader, subheaders } = props
    const [showDropdown, setShowDropdown] = useState(false)
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 900px)' })

    const onMouseEnterHandler = () => {
        setShowDropdown(true)
    }

    const onMouseLeaveHandler = () => {
        setShowDropdown(false)
    }

    const onClickHandler = () => {
        setShowDropdown(!showDropdown)
    }

    const renderSubheaders = () => {
        return (
            isDesktopOrLaptop
                ? <>
                    {subheaders.map(({ title, to, emoji }, index) =>
                        <li key={"navlink-dropdown-container-" + index} className="navlink-dropdown-menu-item" role="none">
                            <NavLink key={"navlink-dropdown-" + index} exact activeClassName="navbar__link--active" title={emoji + " " + title} to={to}>{emoji + " " + title}</NavLink>
                        </li>
                    )}
                </>
                : <>
                    {subheaders.map(({ title, to }, index) =>
                        <li key={"navlink-dropdown-container-" + index} className="navlink-dropdown-menu-item" role="none">
                            <NavLink key={"navlink-dropdown-" + index} exact activeClassName="navbar__link--active" title={title} to={to}>{title}</NavLink>
                        </li>
                    )}
                </>
        )
    }

    return (
        isDesktopOrLaptop
            ? <li onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
                onClick={onClickHandler}
                className="navbar-reg-brand navbar-brand navlink-dropdown">
                <p className="navlink-dropdown-header">{name} <RiArrowDropDownLine /></p>
                <CSSTransition
                    in={showDropdown}
                    timeout={300}
                    classNames="navlink-dropdown-menu-anim"
                    unmountOnExit>
                    <div className="navlink-dropdown-menu-container">
                        <ul role="menu" className="navlink-dropdown-menu">
                            {renderSubheaders()}
                        </ul>
                    </div>
                </CSSTransition >
            </li>
            : <li className="navbar-reg-brand navbar-brand">
                <p className="navlink-dropdown-header">{name}</p>
                <hr className="navlink-dropdown-mobile-separator" />
                <ul role="menu" className="navlink-dropdown-menu">
                    {renderSubheaders()}
                </ul>
            </li>
    );
}
