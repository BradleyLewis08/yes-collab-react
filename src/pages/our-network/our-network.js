import React, { useEffect } from "react";
import "./our-network.scss";
import { usePartners } from "shared/hooks"
import { LOADED, LOADING } from "redux/status-types";
import { fetchPartners } from "redux/actions"
import store from "redux/store";
import { NavLink } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

import { containsHTML, extractFromHTML } from "utils/helper"

const OurNetwork = () => {

    const { partners, status } = usePartners()

    useEffect(() => {
        store.dispatch(fetchPartners)
    }, [])

    const getPairs = (partners) => {
        return partners.models.reduce((result, value, index, array) => {
            if (index % 2 === 0)
                result.push(array.slice(index, index + 2));
            return result;
        }, [])
    }

    return (
        <div className="our-network-container page-container">
            <div className="header-container">
                <h1 className="title">meet our startup network</h1>
                <h1 className="subtitle">the best of the best</h1>
                <p className="first-content-desc">
                    Our startups are pioneers in their space and revolutionizing their industries. Backed by YCombinator, Alchemist Incubator,
                    Republic VC, Acceleprise, and the Cleantech Open, our network comprises companies and people who are cutting-edge and exciting.</p>
                <NavLink exact to="/join-us"><div className="regular-button">Join our network</div></NavLink>
            </div>
            <div className="partner-blurbs-container final-container">
                {status === LOADED ? getPairs(partners).map((pair, index) =>
                    <div className="partner-blurbs-row" key={"" + index}>
                        {pair.map((listing, num) =>
                            <Blurb listing={listing.StartupInfo} key={"" + index + num}></Blurb>
                        )}
                    </div>
                ) : status === LOADING
                    ? <div className="loading-partners">
                        <p className="loading">Loading partners </p>
                        <BeatLoader color="#333333" size={15} />
                    </div>
                    : <p className="failed">Failed partners. Please reload the page.</p>}
            </div>
        </div>
    )
};

const Blurb = ({ listing }) => {
    return (
        <div className="partner-blurbs" onClick={() => window.open(listing.Website, "_blank")}>
            <div className="partner-info-container">
                <div className="img-container">
                    <img src={listing.LogoLink} alt="img" />
                </div>
                <div className="info-container">
                    <h4 className="partner-name">{listing.StartupName}</h4>
                    <p className="blurb">{containsHTML(listing.Blurb) ? extractFromHTML(listing.Blurb) : listing.Blurb}</p>
                </div>
            </div>
            <div className="industries-container">
                {listing.Industries.map((industry, index) =>
                    <p className="industry" key={index}>{industry}</p>
                )}
            </div>

        </div>
    )
};

export default OurNetwork