import React, { useEffect, useState } from "react";
import queryString from 'query-string';

import "./catalog.scss";

import Blurb from "./components/blurb"
import BlurbSensor from "./components/blurbSensor"
import Listing from "./components/listing"
import Company from "./components/company"
import BottomSlider from "shared/components/bottom-slider";
import DropdownContainer from "./components/dropdownContainer"
import FilterView from "./components/filterView"
import ReactTooltip from 'react-tooltip';

import { useCatalog } from "shared/hooks"
import {
    getRoles,
    getTimePeriods,
    getIndustries,
    getFundingTypes,
    getExperienceLevels,
    getCatalogFilterOptions,
    getShowingFilters,
    getTimeCommitments
} from "redux/selectors"
import { setOptions, shuffleCatalog, submitMetrics, addClick, setMetrics } from "redux/actions";
import { LOADING, LOADED } from "redux/status-types";
import { fetchListings, fetchMockListings, viewCatalog } from "redux/actions"
import { useSelector, useDispatch } from "react-redux";

import { useMediaQuery } from 'react-responsive'
import BarLoader from "react-spinners/BarLoader";
import { useLocation } from "react-router-dom";

var didSearch = false;
var isTrackingMetrics = false;

export const Catalog = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(fetchListings)
    }, [])

    // For mobile
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 900px)' })
    const [mobileDropdowns, setMobileDropdowns] = useState(true);
    const [mobileListing, setMobileListing] = useState(true);
    const [intervalId, setIntervalId] = useState();

    // ?id=StartupId (http://localhost:3000/catalog?id=05752f7c-520b-11eb-bf6e-08d40c610f6b)
    const params = queryString.parse(location.search)

    useEffect(() => {
        if ("id" in params && !didSearch) {
            dispatch(viewCatalog(params["id"]))
            didSearch = true;
            if (!isDesktopOrLaptop) {
                setMobileListing(false)
            }
        }
        if (isTrackingMetrics) {
            setIntervalId(setInterval(
                () => {dispatch(submitMetrics())},
                1000*60
            ))
            return () => {
                dispatch(addClick("", "", 0, "", ""));
                clearTimeout(intervalId);
            }
        }
        else {
            dispatch(setMetrics(false))
            return () => {}
        }
        

        
    }, [])

    const { catalog, currentListing, status, currentCompany } = useCatalog()

    const showingFilters = useSelector(state => getShowingFilters(state))
    const options = useSelector(state => getCatalogFilterOptions(state))

    const industries = useSelector(state => getIndustries(state))
    const timePeriods = useSelector(state => getTimePeriods(state))
    const roles = useSelector(state => getRoles(state))
    const experienceLevels = useSelector(state => getExperienceLevels(state))
    const fundingTypes = useSelector(state => getFundingTypes(state))
    const timeCommitments = useSelector(state => getTimeCommitments(state))

    const listing = React.useRef()

    const resetListingScroll = () => {
        listing.current.scrollTop = 0
    }

    const getMainView = () => {
        if (options.CurrentPositionId === "") {
            return <Company company={currentCompany} className="fade-in" />
        } else {
            return <Listing listing={currentListing} className="fade-in" />
        }
    }

    if (!isDesktopOrLaptop) {
        return (
            <React.Fragment>
                <div className="catalog-container">
                    <div className="mobile-catalog-container">
                        <h2>Catalog</h2>
                        <p>Tap on a start-up and one of its positions to learn more. {/*Student applications close on March 15, 2022. <a href="https://bit.ly/YES-Internships-Apply-S22" target="_blank" rel="noreferrer noopener">Apply Here!</a>*/}</p>
                    </div>
                    <div className="catalog-search-container">
                        <input
                            type="text"
                            value={options.KeywordSearch}
                            placeholder="Search keyword or title"
                            autoComplete="off"
                            onChange={e => dispatch(setOptions({ Option: "KeywordSearch", Value: e.target.value }))}></input>
                        <button onClick={() => dispatch(shuffleCatalog())}>Shuffle</button>
                        <button onClick={() => setMobileDropdowns(!mobileDropdowns)}>Filters</button>
                    </div>
                    <div className="catalog-blurbs">
                        {status === LOADING ?
                            <div className="no-blurbs-container">
                                <p className="loading">Loading Catalog.</p>
                                <BarLoader color="#333333" size={150} />
                            </div> : catalog.models.length === 0 ?
                                <div className="no-blurbs-container">
                                    <p>No Search Results.</p>
                                </div> :
                                catalog.models.map((listing, index) =>
                                    <BlurbSensor resetListingScroll={resetListingScroll} setClosed={() => setMobileListing(false)} listing={listing} isMobile={true} key={`blurb-${listing.StartupInfo.StartupId}-${index}`} />
                                )}
                    </div>
                </div>
                <BottomSlider closed={mobileDropdowns} setClosed={setMobileDropdowns}>
                    {status === LOADED ?
                        <React.Fragment>
                            <h4>Filters</h4>
                            <p className="asterisk-info-mobile"><span className="red-asterisk">*</span> indicates start-ups that, based on early application submissions, are very popular and will likely be more competitive.</p>
                            <hr />
                            <DropdownContainer timeCommitments={timeCommitments} industries={industries} fundingTypes={fundingTypes} roles={roles} experienceLevels={experienceLevels} timePeriods={timePeriods} isMobile={true} />
                        </React.Fragment> : <></>}
                </BottomSlider>
                {status === LOADED ?
                    <BottomSlider closed={mobileListing} setClosed={setMobileListing}>
                        <div ref={listing}>{getMainView()}</div>
                    </BottomSlider>
                    : status === LOADING ? <div className="loading">

                    </div> : <p className="failed">Failed to Load Catalog</p>}
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <div className="catalog-container">
                    <p className="asterisk-info-hover" data-tip data-for="asterisk-info"><span className="red-asterisk">*</span> (hover)</p>
                    <ReactTooltip id="asterisk-info" type="info" backgroundColor="white" border={true} borderColor="black" textColor="black">
                        <span>Based on early application submissions,</span><br />
                        <span>these start-ups are very popular and will</span><br />
                        <span>likely be more competitive.</span>
                    </ReactTooltip>
                    <div className="catalog-info-container">
                        <div className="catalog-filter-container">
                            <div className={`catalog-blurbs ${showingFilters ? "showing-filters" : ""}`}>
                                {catalog.models.length === 0 ?
                                    <div className="no-blurbs-container">
                                        <p>No search results.</p>
                                    </div> :
                                    catalog.models.map((listing, index) =>
                                        <BlurbSensor setClosed={() => { }} resetListingScroll={resetListingScroll} listing={listing} isMobile={false} index = {index} key={`blurb-${listing.StartupInfo.StartupId}-${index}`} />
                                    )}
                            </div>
                            <FilterView options={options} status={status} timeCommitments={timeCommitments} industries={industries} fundingTypes={fundingTypes} roles={roles} experienceLevels={experienceLevels} timePeriods={timePeriods} isMobile={false} ></FilterView>
                        </div>
                        <div ref={listing} className="catalog-listing">
                            {status === LOADED ? getMainView() :
                                status === LOADING ? <div className="no-listing-container">
                                    <p className="loading">Loading Catalog</p>
                                    <BarLoader color="#333333" size={150} />
                                </div> : <div className="no-listing-container">
                                    <p className="failed">Failed to Load Catalog.</p>
                                </div>}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
};

