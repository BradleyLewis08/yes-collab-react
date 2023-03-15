import "./faq.scss";
import React from "react";
import Collapsible from "react-collapsible";

export default function PartnersFAQ() {
  return (
    <div className="faq-container page-container">
      <div className="overall">
        <div className="header-container">
          <h1 className="title">frequently asked questions</h1>
          <h1 className="subtitle">YES Internships</h1>
        </div>

        <div className="content-container faq-header">
          <h2>Start-ups:</h2>
          <p>How can we help you bring on amazing interns?</p>
        </div>

        <div>
          <div className="content-container">
            <hr />
            <div className="row">
              <div className="column">
                <div className="info-container">
                  <div className="info-container-desc">
                    <h4>What is the purpose of YES Internships?</h4>
                    <p>
                      Start-ups have sh*t to do. You don't have the resources to
                      launch intensive recruiting efforts, so we're here to
                      help. We recruit and vet students through a comprehensive
                      written application and interview process. Our team
                      includes writers, coders, and graphic designers who have
                      the expertise and undergraduate perspective to identify
                      great, young talent.
                    </p>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="info-container">
                  <div className="info-container-desc">
                    <h4>Does YES function like other recruiting firms?</h4>
                    <p>
                      No. Unlike most recruiting platforms, we hold recruiting
                      cohorts (Summer and Winter) that gives you direct access
                      to a talent pool unlike any other: students from Yale,
                      Harvard, and Stanford who want to get their hands dirty
                      and help you grow. Plus, our team is passionate about
                      entrepreneurship, just like you!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="column">
                <div className="info-container">
                  <div className="info-container-desc">
                    <h4>What kind of interns can YES provide?</h4>
                    <p>
                      All of them — our candidates have diverse skillsets. Our
                      interns are software engineers, data scientists, business
                      developers, and writers. Our talent pool reflects the
                      positions available to students, so we can certainly find
                      an intern who accommodates the qualifications and
                      qualities you require.
                    </p>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="info-container">
                  <div className="info-container-desc">
                    <h4>How experienced are YES interns?</h4>
                    <p>
                      Our strongest applicants are software engineers at
                      Facebook and Amazon, trained consultants at MBB, and
                      financial modeling whizzes who’ve worked at top investment
                      banks globally. Regardless of experience, all candidates
                      will be smart, driven, and passionate team members who
                      want to test and build their skills.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className="bottom-wave-container">
          <div className="bottom-wave-info-container">
            <h2>Have more questions?</h2>
            <p>
              Feel free to email{" "}
              <a href="mailto: internships@yesatyale.org">
                internships@yesatyale.org
              </a>
              .
            </p>
          </div>
          <svg
            className="bottom-wave"
            width="100%"
            height="100%"
            viewBox="0 0 1560 580"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M359.5 23.764C194.613 -36.8796 67.1667 44.9958 2 78.0728V585.5H1565V250.387C1544 191.385 1396 78.0728 1213 155.849C1076.28 213.957 987.454 273.776 810 250.387C576 219.545 565.5 99.5287 359.5 23.764Z"
              fill="#4A8FEE"
              stroke="#4A8FEE"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
