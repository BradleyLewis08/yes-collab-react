import React from 'react';
import "./listing.scss";
import pay from "../../images/pay.svg";
import time from "../../images/time.svg";
import team_size from "../../images/team_size.svg";
import duration from "../../images/duration.svg";
import open_pos from "../../images/open_pos.svg";
import industry from "../../images/industry.svg"
import link from "../../images/link.svg";
import work from "../../images/work.svg";
import linkedin from "../../images/linkedin.svg";
import location from "../../images/location.svg";
import { viewCatalog } from "redux/actions"
import { useDispatch } from "react-redux";
import coatOfArms from 'pages/catalog/coatOfArms';

import { containsHTML, extractHTMLContent } from "utils/helper"

const getBenefit = (benefit) => {
    return extractHTMLContent(benefit) === "" ? "" : benefit
}

/**
 * The detailed listing for the chosen position
 * @param {obj} listing
 */
export const Listing = ({ listing }) => {

    const dispatch = useDispatch();

    if (!listing) {
        return (
            <div className="no-listing-container">
                <h3 className="no-listing">Welcome! Click on an internship position on the left scrollbar to learn more.</h3>
            </div>
        )
    } else {

        var payInfo
        if (listing.Position.Paid !== "") {
            payInfo = listing.Position.Paid === "Paid" ? "Paid: " + listing.Position.PaidInfo : "Unpaid"
        } else {
            payInfo = listing.StartupInfo.Paid === "Paid" ? "Paid: " + listing.StartupInfo.PaidInfo : "Unpaid"
        }

        const listingDetails = [
            { icon: open_pos, suffix: "", alt: "positions", value: listing.Position.openPositions },
            { icon: time, suffix: "", alt: "time", value: listing.Position.TimeCommitment },
            { icon: team_size, suffix: "employee(s)", alt: "size", value: listing.Position.TeamSize },
            { icon: pay, suffix: "", alt: "pay", value: listing.Position.Paid || listing.StartupInfo.Paid },
            { icon: duration, suffix: "", alt: "duration", value: listing.Position.TimePeriod },
            { icon: industry, suffix: "", alt: "funding", value: listing.StartupInfo.Funding },
            { icon: location, suffix: "", alt: "location", value: listing.StartupInfo.Location + (listing.StartupInfo.International ? " (International)" : "") },
            { icon: work, suffix: "", alt: "location", value: listing.Position.Location }
        ]

        const infoDetails = [
            { title: "Projects", values: listing.Position.Projects },
            { title: "Desired skillsets", values: listing.Position.Qualifications },
            { title: "Intern benefits", values: getBenefit(listing.StartupInfo.Benefits) +
                    getBenefit(listing.StartupInfo.ProfessionalGrowth) +
                    getBenefit(listing.StartupInfo.Mentorship) +
                    getBenefit(listing.StartupInfo.NetworkOpportunities) +
                    getBenefit(listing.StartupInfo.TeamCulture) },
            { title: "Intern here if you're interested in", values: listing.StartupInfo.Interests },
        ]

        return (
            <div className="listing-container">
                <div className="title-container">
                    <div className="title-info-container">
                        <div className="startup-name-container">
                            <h1 onClick={() => dispatch(viewCatalog(listing.StartupInfo.StartupId))}>{listing.StartupInfo.StartupName}<span className="red-asterisk">{listing.isCompetitive ? "*" : ""}</span></h1>
                            <a href={listing.StartupInfo.Website} target="_blank" rel="noreferrer noopener" className="learn-more"><img src={link} alt="link" className="button-icon" /></a>
                        </div>
                        <p className="role-title">{listing.Position.Title}</p>
                        <p className="pay-info">{payInfo}</p>
                        <div className="rounded-info-container">
                            {listing.StartupInfo.Industries.map((industry, index) =>
                                <p className="rounded-info" key={index}>{industry}</p>
                            )}
                        </div>
                    </div>
                    <div className="logo-container">
                        <img src={listing.StartupInfo.LogoLink} alt="img" className="logo" />
                    </div>
                </div>

                <div className="listing-details-container">
                    <div className="details-block founder-details">
                        <h4>Founders</h4>
                        <div className="founders-container">
                            {listing.Founders.models.map((founder, index) =>
                                <div key={index} className="founder">
                                    <p>{founder.Name === "" ? founder.FirstName + " " + founder.LastName : founder.Name}</p>
                                    <a target="_blank" rel="noreferrer noopener" href={founder.LinkedIn} className="button-icon">
                                        <img className="linkedin-icon" src={linkedin} alt="linkedin" />
                                    </a>
                                    {coatOfArms[founder.AlmaMater] ? <img src={coatOfArms[founder.AlmaMater]} /> : <></>}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="details-block listing-details">
                        {listingDetails.map((detail, index) =>
                            typeof detail.value !== 'undefined' && detail.value !== "" ? <div className="listing-detail" key={index}>
                                <img src={detail.icon} alt={detail.alt} className="icon" />
                                <p>{detail.value} {detail.suffix}</p>
                            </div> : <span key={index}></span>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="info-heading">About The Company</h2>
                    {containsHTML(listing.StartupInfo.Blurb) ?
                        <div className="embedded-description" dangerouslySetInnerHTML={{ __html: listing.StartupInfo.Blurb }}></div> :
                        listing.StartupInfo.Blurb.split('\n').map((blurb, index) => blurb.trim() === "" ? <span key={index} /> : <p key={index} className="text">{blurb}</p>)}
                </div>

                {infoDetails.map((infoDetail, detailIndex) => {
                    if (infoDetail.values.length === 0 || (infoDetail.values.length === 1 && infoDetail.values[0].trim() === "")) {
                        return <span key={detailIndex} />
                    }
                    else {
                        return (
                            <div key={detailIndex}>
                                <h2 className="info-heading">{infoDetail.title}</h2>
                                {containsHTML(infoDetail.values) ?
                                    <div className="embedded-description" dangerouslySetInnerHTML={{ __html: infoDetail.values }}></div> :
                                    <ul>
                                        {infoDetail.values.split('\n').map((detail, index) =>
                                            detail.trim() === "" ? <span key={index} /> : <li key={index}>{detail}</li>
                                        )}
                                    </ul>}
                            </div>
                        )
                    }
                })}
                {listing.Position.Skills.models.length > 0 ? <div>
                    <h2 className="info-heading">Project Skill Level</h2>
                    <ul>
                        {listing.Position.Skills.models.map((skill, index) => (
                            <li key={index}><span className="info-skill">{skill.Skill}: </span>{skill.Level}</li>
                        ))}
                    </ul>
                </div> : <></>}
            </div>
        )
    }
};
