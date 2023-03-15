import './campus-partner.scss'
import React from "react";
// import { Card } from 'reactstrap';
//import Collapsible from 'react-collapsible';

export const CampusPartner = ({ bgColor, club, university, description, fgColor, logo, link, fgImage, bgImage, mainColor }) => {

    const bgC = bgColor.startsWith("#") ? bgColor : "#" + bgColor
    const fgC = fgColor.startsWith("#") ? fgColor : "#" + fgColor

    return (
        <div className="campus-partner-container">
            <div onClick={() => window.open(link, "_blank")} className="campus-partner-header-container" style={{ borderColor: fgC }}>
                <div className="img-container">
                    <img className="campus-partner-logo" src={logo} alt="logo" />
                </div>
            </div>
            <div className="campus-partner-content-container" style={{ backgroundColor: bgC, borderColor: bgC }}>
                <h4 className="campus-partner-name">{club}</h4>
                <div className="left-separator"></div>
                <h5 className="campus-partner-university">{university} </h5>
                <div className="left-separator"></div>
                <p className="campus-partner-content">{description}</p>
            </div>
        </div>
    );
}