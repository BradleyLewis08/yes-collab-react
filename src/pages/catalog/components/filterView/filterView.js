import React, { useEffect } from "react";
import {
    getShowingFilters
} from "redux/selectors"
import "./filterView.scss"

import { setOptions, shuffleCatalog, setShowingFilters } from "redux/actions";
import { LOADED } from "redux/status-types";
import DropdownContainer from "../dropdownContainer"
import { AiOutlineCloseCircle, AiOutlineInfoCircle } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';

import { useSelector, useDispatch } from "react-redux";

export const FilterView = ({ options, status, timeCommitments, industries, fundingTypes, roles, experienceLevels, timePeriods }) => {

    const dispatch = useDispatch();
    const showingFilters = useSelector(state => getShowingFilters(state))

    const showFilters = (e) => {
        e.stopPropagation()
        dispatch(setShowingFilters(true))
    }

    const wrapperRef = React.useRef(null);
    useOutsideAlerter(wrapperRef, () => dispatch(setShowingFilters(false)));

    return (
        <div ref={wrapperRef}>
            <div className={`filter-search ${showingFilters ? "showing" : ""}`}>
                <button className="filterview-button" onClick={() => dispatch(shuffleCatalog())}>Shuffle</button>
                <button className="filterview-button" onClick={showFilters}>Filter</button>
                <input
                    className="catalog-input"
                    type="text"
                    value={options.KeywordSearch}
                    placeholder="Search keyword or title"
                    autoComplete="off"
                    onChange={e => dispatch(setOptions({ Option: "KeywordSearch", Value: e.target.value }))}></input>
                <div className="info-hover-container">
                    <AiOutlineInfoCircle size="22px" className="info-hover" data-tip data-for="happyFace" />
                    <ReactTooltip id="happyFace" type="info" backgroundColor="white" border={true} borderColor="black" textColor="black">
                        <span>Hover over a start-up and click</span><br/>
                        <span>one of its positions to learn more.</span><br/>
                        <span>This catalog is regularly updated.</span>
                    </ReactTooltip>
                </div>
            </div>
            <div className={`filters-container ${showingFilters ? "showing" : ""}`}>
                <div className="filters-view-header">
                    <h4 className='filter-title'>Filters</h4>
                    <AiOutlineCloseCircle className="close-filters" onClick={() => dispatch(setShowingFilters(false))} />
                </div>
                <hr></hr>
                <div className="filters-view-container">
                    {status === LOADED ?
                        <DropdownContainer timeCommitments={timeCommitments} industries={industries} fundingTypes={fundingTypes} roles={roles} experienceLevels={experienceLevels} timePeriods={timePeriods} />
                        : <></>}
                </div>
            </div>
        </div>
    )
};

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, res) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                res()
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
