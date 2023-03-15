import React from "react";
// import { Row, Col, Container } from 'reactstrap';
import './campus-landing.scss'
import campus_landing_bg from "../../images/campus_landing_bg.png"
import { BsFillCircleFill } from "react-icons/bs"

export const CampusLanding = () => {

    return (

        <div className="wrapper">
            <div className="header-container">
                <h1 className="title">campus connects</h1>
                <h1 className="subtitle">our partners in crime</h1>
                <p className="first-content-desc">
                    We partner with student organizations at undergraduate institutions across the country. From entrepreneurship,
                    consulting, and venture capital clubs to cultural orgs, we build partnerships with groups of students who we find
                    are bright, driven, and diverse.</p>
                <hr className="section-break" />
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="text-col">
                                <h4><strong>Fly high as a student entrepreneur with these campus partners.</strong></h4>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="values-container">
                    <div className="row">
                        <div className="col-md-3 col-xs-6">
                            <BsFillCircleFill color="#14365B" />
                            <p className="value-description">Opportunities.</p>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <BsFillCircleFill color="#318EF5" />
                            <p className="value-description">Networking.</p>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <BsFillCircleFill color="#6DB0FB" />
                            <p className="value-description">Mentorship.</p>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <BsFillCircleFill color="#E4F2FF" />
                            <p className="value-description">Growth.</p>
                        </div>
                    </div>
                </div>
                <br />
                <div>
                    <h1 className="title">meet the partners</h1>
                </div>
            </div>
        </div>
    );
}