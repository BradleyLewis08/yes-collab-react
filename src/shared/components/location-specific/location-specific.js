import React from "react";
import { useLocation } from "react-router-dom";

export const LocationSpecific = ({hideAt, showAt, styleName, children}) => {

    const { pathname } = useLocation();

    if (hideAt && hideAt.length > 0) {
        return (
            <div className={styleName} style={hideAt.includes(pathname) ? {display: "none"} : {}}>
                {hideAt.includes(pathname) ? <div></div> : children}
            </div >
        )
    }
    if (showAt && showAt.length > 0) {
        return (
            <div className={styleName} style={!showAt.includes(pathname) ? {display: "none"} : {}}>
                {!showAt.includes(pathname) ? <div></div> : children}
            </div >
        )
    }

    
}