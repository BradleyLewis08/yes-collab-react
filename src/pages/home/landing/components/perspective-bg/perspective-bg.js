import React, { forwardRef, useImperativeHandle } from 'react';
import "./perspective-bg.scss";

/**
 * Background for landing page that moves with mouse
 */
export const PerspectiveBG = forwardRef((props, ref) => {

    const backgroundContainer = React.useRef()
    const background = React.useRef()

    useImperativeHandle(ref, () => ({
        update(mouse) {
            updateTransformStyle(
                (mouse.y / background.current.offsetHeight / 2).toFixed(2),
                (mouse.x / background.current.offsetWidth / 2).toFixed(2))
        }
    }))

    var updateTransformStyle = function (x, y) {
        var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
        background.current.style.transform = style;
        background.current.style.webkitTransform = style;
        background.current.style.mozTransform = style;
        background.current.style.msTransform = style;
        background.current.style.oTransform = style;
    };

    return (
        <div className={"background-container-" + props.type} ref={backgroundContainer}>
            <div className="background" ref={background}>{props.children}</div>
        </div>
    )
});
