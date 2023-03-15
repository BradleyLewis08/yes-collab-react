import React from "react";
import { LOADING, LOADED, FAILED } from "redux/status-types";

import './campus-partners.scss'
import CampusLanding from "./components/campus-landing"
import CampusPartner from "./components/campus-partner"
import BeatLoader from "react-spinners/BeatLoader";
import useCampusPartners from './hooks';

export const CampusPartners = () => {

    const [data, state] = useCampusPartners()

    return (
        <>
            <div className="partner-wrapper final-container">
                <div className="landing-container">
                    <CampusLanding />
                </div>
                <div className="partner-container">
                    {state == LOADED
                        ? data.map((campusPartner) => (
                            <CampusPartner
                                bgColor={campusPartner.ClubBgColor}
                                club={campusPartner.ClubName}
                                university={campusPartner.ClubUniversityName}
                                description={campusPartner.ClubDescription}
                                link={campusPartner.ClubLink}
                                logo={campusPartner.ClubLogo}
                                fgImage={campusPartner.ClubFgImage}
                                bgImage={campusPartner.ClubBgImage}
                                mainColor={campusPartner.ClubMainColor}
                                fgColor={campusPartner.ClubFgColor} />
                        ))
                        : <div className="loading-partners">
                            <p className="loading">Loading partners </p>
                            <BeatLoader color="#333333" size={15} />
                        </div>}
                </div>
            </div>
        </>
    );
}
