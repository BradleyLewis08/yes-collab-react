import React, { useEffect } from "react";
import "./landing.scss";
import PerspectiveBG from "./components/perspective-bg"

import { ReactComponent as LighterBlue } from './images/lighter-blue-landing.svg';
import { ReactComponent as ElectricBlue } from './images/electric-blue-landing.svg';
import { ReactComponent as DarkerBlue } from './images/darker-blue-landing.svg';

import { NavLink } from "react-router-dom";

// still need to fully optimize for mobile and smaller screen sizes
export const Landing = () => {

    const lighterBG = React.useRef()
    const electricBG = React.useRef()
    const darkerBG = React.useRef()
    const container = React.useRef()

    useEffect(() => {
        mouse.setOrigin(container.current);
    }, []);

    var onMouseEnterHandler = function (event) {
        update(event);
    };
    var onMouseMoveHandler = function (event) {
        if (isTimeToUpdate()) {
            update(event);
        }
    };

    var counter = 0;
    var updateRate = 10;
    var isTimeToUpdate = function () {
        return counter++ % updateRate === 0;
    };

    var mouse = {
        _x: 0,
        _y: 0,
        x: 0,
        y: 0,
        updatePosition: function (event) {
            var e = event || window.event;
            this.x = e.clientX - this._x;
            this.y = (e.clientY - this._y) * -1;
        },
        setOrigin: function (e) {
            this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
            this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
        },
        show: function () { return '(' + this.x + ', ' + this.y + ')'; }
    }

    var update = function (event) {
        mouse.updatePosition(event);
        lighterBG.current.update(mouse)
        electricBG.current.update(mouse)
        darkerBG.current.update(mouse)
    };

    return (
        <div className="home-container">
            <div className="landing-container">
                <div
                    className="perspective-touch-container"
                    onMouseEnter={onMouseEnterHandler}
                    onMouseMove={onMouseMoveHandler}></div>
                <div className="landing-content-container" onMouseMove={onMouseMoveHandler}>
                    <div className="landing-content">
                        <h1 className="title" style={{marginLeft: "0px"}}>YES Internships</h1>
                        <h1 className="subtitle">connecting talented students with talented start-ups</h1>
                        <div className="navigate-container">
                            <div style={{flexDirection: 'row'}}>
                                <div className="links-container">
                                    <NavLink exact to="/students"><div className="link-container">I'm a student</div></NavLink>
                                    <NavLink exact to="/partners"><div className="link-container">I'm a start-up</div></NavLink>
                                </div>
                                <div className="links-container">
                                    <NavLink exact to="/about"><div className="link-container">Learn More</div></NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="perspective-container" ref={container}>
                    <PerspectiveBG ref={lighterBG} type={"lighter"}>
                        <LighterBlue />
                    </PerspectiveBG>
                    <PerspectiveBG ref={electricBG} type={"electric"}>
                        <ElectricBlue />
                    </PerspectiveBG>
                    <PerspectiveBG ref={darkerBG} type={"darker"}>
                        <DarkerBlue />
                    </PerspectiveBG>
                </div>
                <div className="full-container bg-darker-blue" style={{ height: "2px", /*marginBottom: "14px"*/ }}></div>
            </div>
            {/*<Navigation limit={window.innerHeight + 120} />
            <About />*/}
        </div>
    )
}