import React, { useState } from 'react';
import "./blurb.scss";
import { viewCatalog, addClick } from "redux/actions"
import { useDispatch } from "react-redux";
import { Collapse } from 'react-bootstrap';

import { containsHTML, extractFromHTML } from "utils/helper"

/**
 * The short summary blurb that will be shown on the left side
 * of the catalog
 * @param {obj} listing
 */
export const Blurb = ({ setClosed, resetListingScroll, listing, isMobile, index }) => {
    const dispatch = useDispatch();
    const blurbRef = React.useRef(null);
    const [isActive, setIsActive] = useState(false);

    // for collapsible
    const [isOpen, setIsOpen] = useState(false);
    const [delayHandler, setDelayHandler] = useState(null)

    const onStartupClick = () => {
        if (!isActive) {
            setIsActive(!isActive);
        }
        dispatch(addClick(listing.StartupInfo.StartupId, "", index, listing.StartupInfo.StartupName, ""));
        dispatch(viewCatalog(listing.StartupInfo.StartupId))
    }

    const handleMouseEnter = event => {
        setDelayHandler(setTimeout(() => {
            setIsOpen(true)
        }, 300))
    }

    const handleMouseLeave = () => {
        clearTimeout(delayHandler)
        setIsOpen(false)
    }

    const onPositionClick = (e, position) => {
        e.stopPropagation();
        resetListingScroll();
        setClosed();
        dispatch(addClick(listing.StartupInfo.StartupId, position.PositionId, index, listing.StartupInfo.StartupName, position.Title));
        dispatch(viewCatalog(listing.StartupInfo.StartupId, position.PositionId));
    }

    const shouldCollapse = () => {
        if (isMobile) {
            return isOpen
        } else {
            return isOpen || listing.Positions.models.some(position => position.Selected)
        }
    }

    var payInfo
    if (listing.StartupInfo.Paid === "") {
        if (listing.Positions.models.some(position => position.Paid === "Paid")) {
            payInfo = "Paid"
        } else {
            payInfo = "Unpaid"
        }
    } else {
        payInfo = listing.StartupInfo.Paid
    }

    return (
        <div ref={blurbRef} className={`blurb-container ${isOpen ? 'active' : 'inactive'}`} onClick={onStartupClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className="blurb-info-container">
                <div>
                    <img src={listing.StartupInfo.LogoLink} alt="img" />
                </div>
                <div className="blurb-startup-container">
                    <h1>{listing.StartupInfo.StartupName}<span className="red-asterisk">{listing.isCompetitive ? "*" : ""}</span></h1>
                    <p className="blurb">{containsHTML(listing.StartupInfo.Blurb) ? extractFromHTML(listing.StartupInfo.Blurb) : listing.StartupInfo.Blurb}</p>
                    {/* {containsHTML(listing.StartupInfo.Blurb) ?
                        <div className="embedded-description blurb" dangerouslySetInnerHTML={{ __html: listing.StartupInfo.Blurb }}></div> :
                        listing.StartupInfo.Blurb.split('\n').map((blurb, index) => blurb.trim() === "" ? <span key={index} /> : <p key={index} className="text">{blurb}</p>)} */}
                    <p className="funding">{listing.StartupInfo.Funding} {listing.StartupInfo.International ? " | International" : ""}</p>
                    <div className="rounded-info-container">
                        <p className="rounded-info pay" disabled>{payInfo}</p>
                        {listing.StartupInfo.Industries.map((industry, index) =>
                            <p className="rounded-info industry" key={index}>{industry}</p>
                        )}
                    </div>
                </div>
            </div>
            <Collapse in={shouldCollapse()}>
                <div>
                    <div className="positions-list-container">
                        {listing.Positions.models.map((position, index) =>
                            <div className={`position-listing-container ${!isMobile && position.Selected ? 'active-position' : 'inactive'}`} key={index} onClick={(e) => { onPositionClick(e, position) }}>
                                <div className="title-container">
                                    <p className="position-title">{position.Title}</p>
                                    {/* <p className="positions-available">{position.isFilled ? "Positions filled" : position.openPositions}</p> */}
                                    <p className="positions-available">{position.MaxInterns + " available position(s)"}</p>
                                </div>
                                <p className="rounded-info time-commitment" disabled>{position.TimeCommitment}</p>
                            </div>)}
                    </div>
                </div>
            </Collapse>
        </div>
    )
};
