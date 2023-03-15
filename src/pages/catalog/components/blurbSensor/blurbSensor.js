import React, { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import Blurb from "../blurb"
import { addImpression } from "redux/actions"
import { useDispatch } from "react-redux";

/**
 * An impression sensor for the blurbs that show on the left
 * side of the catalog
 * @param {obj} listing
 */
export const BlurbSensor = ({ setClosed, resetListingScroll, listing, isMobile, index }) => {

    const dispatch = useDispatch();
    const [visiblity, setVisiblity] = useState(false);
    const [updatedTime, setUpdatedTime] = useState((new Date(0)).getTime());

    const onVisibilityChange = (isVisible) => {
        if (visiblity !== isVisible && isVisible && (new Date()).getTime() > updatedTime+1000*60) {
            setUpdatedTime((new Date()).getTime())
            dispatch(addImpression(listing.StartupInfo.StartupId, index, listing.StartupInfo.StartupName));
        }
        setVisiblity(isVisible)
    }

    return (
        <VisibilitySensor onChange={(isVisible) => {onVisibilityChange(isVisible)}}>
            <Blurb setClosed={setClosed} resetListingScroll={resetListingScroll} listing={listing} isMobile={isMobile} index={index} />
        </VisibilitySensor>
    )
};