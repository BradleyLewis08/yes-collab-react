import React from 'react';
import "./company.scss";
import link from "../../images/link.svg";
import linkedin from "../../images/linkedin.svg";
import { viewCatalog } from "redux/actions"
import { useDispatch } from "react-redux";
import coatOfArms from 'pages/catalog/coatOfArms';

import { containsHTML, extractHTMLContent } from "utils/helper"

const getBenefit = (benefit) => {
    return extractHTMLContent(benefit) === "" ? "" : benefit
}

/**
 * The detailed company for the chosen position
 * @param {obj} company
 */
export const Company = ({ company }) => {

    const dispatch = useDispatch();

    if (!company) {
        return (
            <div className="no-company-container">
                <h3 className="no-company">Welcome! Click on an internship position on the left scrollbar to learn more.</h3>
            </div>
        )
    } else {

        const infoDetails = [
            { title: "Intern benefits", values: getBenefit(company.StartupInfo.Benefits) +
                    getBenefit(company.StartupInfo.ProfessionalGrowth) +
                    getBenefit(company.StartupInfo.Mentorship) +
                    getBenefit(company.StartupInfo.NetworkOpportunities) +
                    getBenefit(company.StartupInfo.TeamCulture) },
        ]

        return (
            <div className="company-container">
                <div className="title-container">
                    <div className="title-info-container">
                        <div className="startup-name-container">
                            <h1>{company.StartupInfo.StartupName}<span className="red-asterisk">{company.isCompetitive ? "*" : ""}</span></h1>
                            <a href={company.StartupInfo.Website} target="_blank" rel="noreferrer noopener" className="learn-more"><img src={link} alt="link" className="button-icon" /></a>
                        </div>
                        <p className="funding">{company.StartupInfo.Funding} {company.StartupInfo.International ? " | International" : ""}</p>
                        <div className="rounded-info-container">
                            {company.StartupInfo.Industries.map((industry, index) =>
                                <p className="rounded-info" key={index}>{industry}</p>
                            )}
                        </div>
                    </div>
                    <div className="logo-container">
                        <img src={company.StartupInfo.LogoLink} alt="img" className="logo" />
                    </div>
                </div>

                <div className="company-details-container">
                    <div className="details-block founder-details">
                        <h4>Founders</h4>
                        <div className="founders-container">
                            {company.Founders.models.map((founder, index) =>
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
                    <div className="details-block position-details">
                        <h4>Positions (click to see more)</h4>
                        <div className="positions-container">
                            {company.Positions.models.map((position, index) =>
                                <div onClick={() => dispatch(viewCatalog(company.StartupInfo.StartupId, position.PositionId))} className="rounded-info position-detail" key={index}>
                                    <p>{position.Title}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="info-heading">About The Company</h2>
                    {containsHTML(company.StartupInfo.Blurb) ?
                        <div className="embedded-description" dangerouslySetInnerHTML={{ __html: company.StartupInfo.Blurb }}></div> :
                        company.StartupInfo.Blurb.split('\n').map((blurb, index) => blurb.trim() === "" ? <span key={index} /> : <p key={index} className="text">{blurb}</p>)}
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
            </div>
        )
    }
};
