import React, { useEffect, useState } from "react";
import "./bottom-slider.scss";
import Draggable from 'react-draggable'

const vh = window.innerHeight * 0.01 // 1 percent of view port height

// The following positions have an origin starting at the top of the screen
const boundMargin = 4 * vh  // margin for snap closing
const boundDown = 50 * vh   // minimum position when slider is open
const bottom = 100 * vh     // minimum position of slider
const top = 5 * vh         // maximum position of slider


/**
 * Mobile component that displays information in a slider that can be opened
 * and closed using the "closed" and "setClosed" props
 * 
 * Can be closed when users scroll to the top or grab the handle 
 * at the top of the view. 
 * 
 * You can use props.children to add content
 * 
 * 
 * This view utilizes react-draggable to handle events, but a lot of the positioning 
 * and event handling are done manually to get smooth animations and to improve UX. 
 */
export const BottomSlider = (props) => {

    const { closed, setClosed } = props

    // Keep track of position
    const [position, setPosition] = useState({ x: 0, y: bottom })
    const [lastY, setLastY] = useState(-1)

    // Whether to turn on CSS animations for view
    const [animate, setAnimate] = useState(false)

    // Bounds for React Draggable view
    const [bounds, setBounds] = useState({ left: 0, right: 0, top: top, bottom: bottom })

    // Whether the entire slider is currently being presented
    const [showingFull, setShowingFull] = useState(false)

    // Whether slider should have visibility hidden/visible
    const [visible, setVisible] = useState(false)

    const infoExtensionRef = React.useRef(null)

    useEffect(() => {
        setAnimate(true)
        if (!closed && !showingFull) {
            setVisible(true)
            open()
        } else if (closed && showingFull) {
            close()
        }
    }, [closed])

    function setNoScroll(shouldSet) {
        var body = document.body
        if (shouldSet) body.classList.add('noscroll')
        else body.classList.remove('noscroll')
    }

    function handleDrag(e, p) {
        e.stopPropagation()
        setPosition(p)
        if (p.y < bottom) {
            if (closed) {
                setClosed(false)
            }
        }
    }

    function open() {
        setBounds({ left: 0, right: 0, top: top, bottom: boundDown })
        setPosition({ x: 0, y: top })
        setShowingFull(true)
        setNoScroll(true)
        setTimeout(() => {
            setAnimate(false)
        }, 300)
    }

    function close() {
        setBounds({ left: 0, right: 0, top: top, bottom: bottom })
        setPosition({ x: 0, y: bottom })
        setShowingFull(false)
        setNoScroll(false)
        setTimeout(() => {
            setAnimate(false)
            setVisible(false)
        }, 300)
    }

    function dragEnded(e, p) {
        if (p.y > top && p.y <= boundDown - boundMargin) {
            setAnimate(true)
            open()
        }
        else if (p.y <= boundDown && p.y > boundDown - boundMargin) {
            setClosed(true)
        }
    }

    function touchMoved(e) {
        e.stopPropagation()
        if (showingFull) {
            var currentY = e.touches[0].clientY;
            if (lastY !== -1) {
                var dy = currentY - lastY
                if (position.y !== top || (infoExtensionRef.current.scrollTop <= 0 && dy > 0)) {
                    e.stopPropagation()
                    infoExtensionRef.current.scrollTop = 0

                    var newY = position.y + dy
                    newY = Math.min(newY, boundDown)
                    newY = Math.max(top, newY)

                    setPosition({ x: 0, y: newY })
                }
            }
            setLastY(currentY)
        }
    }

    function touchEnded(e) {
        if (showingFull) {
            setLastY(-1)
            dragEnded(e, position)
        }
    }

    return (
        <div className="bottom-slider-container">
            <div className={`translucent-overlay ${showingFull ? "show" : ""}`} onClick={(e) => {
                e.preventDefault()
                if (showingFull) setClosed(true)
            }}></div>
            <div className={`drag-container ${visible ? "shouldDisplay" : "shouldHide"}`} onTouchEnd={touchEnded} onTouchMove={touchMoved}>
                <Draggable handle="strong" position={position} axis='y' bounds={bounds} onDrag={handleDrag} onStop={dragEnded}>
                    <div className={`drag-content-container ${animate ? "animate" : ""}`}>
                        <strong>
                            <div className="drag-header">
                                <div className="drag-handle"></div>
                            </div>
                        </strong>
                        <div className="drag-content" ref={infoExtensionRef}>
                            {props.children}
                        </div>
                    </div>
                </Draggable>
            </div>
        </div>
    )
}


