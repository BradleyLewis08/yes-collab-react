import "./join-us.scss";
import { FaPlusCircle, FaCheck } from "react-icons/fa";
import { BiRightArrowAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Pricing = () => {
  return (
    <div className="join-us-container page-container final-container">
      <div className="full-container">
        <div className="header-container">
          <h1 className="title">join us</h1>
          <h1 className="subtitle">
            drive team growth as your company scales.
          </h1>
          <p className="first-content-desc">
            We host recruiting cohorts twice a year – once each{" "}
            <span>Summer</span> 🌴 and <span>Winter ❄️</span>. During each
            cohort, we screen, interview, and refer exceptional undergraduate
            candidates to help our Growth Plan partners expand their teams.
          </p>
          <div className="desc-block pricing-container">
            <h2 className="pricing-title">Growth Plan</h2>
            <div className="pricing-header">
              <span>
                <h4>$XX</h4>
                <h5 className="pricing-unit">/cohort</h5>
              </span>
              <FaPlusCircle />
              <span>
                <h4>$XX</h4>
                <h5 className="pricing-unit">/intern hired</h5>
              </span>
            </div>
            <hr />
            <div className="pricing-component-main">
              <FaCheck /> Curated applicant pool
            </div>
            <div className="pricing-component-main">
              <FaCheck /> Resume screening
            </div>
            <div className="pricing-component-main">
              <FaCheck /> Behavioral interviews
            </div>
            <div className="pricing-component-main">
              <FaCheck /> Technical interviews
            </div>
            <div className="pricing-component-main">
              <FaCheck /> Up to 10 candidate referrals
            </div>
            <hr />
            <div className="pricing-component-main">
              <FaCheck /> Intern onboarding support
            </div>
            <div className="pricing-component-main">
              <FaCheck /> Job posting management
            </div>
            <hr />
            <p className="pricing-details">
              * Recruiting cohorts occur each summer and winter. Please{" "}
              <a href="mailto: internships@yesatyale.org">contact us</a> for
              pricing details.
            </p>
          </div>
          <div className="details-container">
            <div className="desc-block">
              <div>
                Join our network of over <span>150 start-ups</span> that recruit
                through YES Internships.
              </div>
              <NavLink
                className="meet-out-network-link"
                exact
                to="/our-network"
              >
                Meet our network{" "}
                <span>
                  <BiRightArrowAlt />
                </span>
              </NavLink>
              <a
                rel="noreferrer"
                className="join-link"
                target="_blank"
                href="https://www.portal.yesatyale.org/join"
              >
                <div className="regular-button">I want to join</div>
              </a>
            </div>
            <div className="desc-block">
              <div>
                Email{" "}
                <a href="mailto: internships@yesatyale.org">
                  internships@yesatyale.org
                </a>{" "}
                with any questions about our services and pricing.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
