import "./faq.scss";
import React from "react";
import Collapsible from "react-collapsible";

export default function StudentsFAQ() {
  return (
    <div className="faq-container page-container">
      <div className="overall">
        <div className="header-container">
          <h1 className="title">frequently asked questions</h1>
          <h1 className="subtitle">YES Internships</h1>
        </div>
        <div className="content-container faq-header">
          <h2>Students:</h2>
          <p>How can we help you land the perfect internship?</p>
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
                      YES Internships aims to give undergraduates the chance to
                      earn work experience in a dynamic start-up environment.
                      Through these opportunities, students will get the chance
                      to network and connect with experienced founders to find
                      future mentors and open-up new, interesting opportunities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="info-container">
                  <div className="info-container-desc">
                    <h4>What role does YES play?</h4>
                    <p>
                      Many start-ups do not have the time and resources to
                      launch intense recruitment efforts to find talent. YES
                      works as a liaison between start-ups and the undergraduate
                      talent pool, connecting those with an entrepreneurial and
                      motivated spirit to companies that give their interns real
                      responsibility and meaningful experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="column">
                <div className="info-container">
                  <div className="info-container-desc">
                    <h4>
                      How is this different from other places where I can find
                      job opportunities?
                    </h4>
                    <p>
                      YES has formed and is continuing to form relationships
                      with various start-up incubators, programs, and alumni. We
                      ensure that interns will work closely with the founders,
                      CEOs, or executive teams of the start-ups they are paired
                      with so they get the mentorship they need to launch their
                      careers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="info-container">
                  <div className="info-container-desc">
                    <h4>What is the time commitment like?</h4>
                    <p>
                      This will mainly be up to you and your paired start-up.
                      Through our many conversations, many start-ups have
                      indicated great flexibility but interns can expect
                      anywhere from 5 to 40 hours a week. Based on the
                      information you fill out in our application form, we will
                      try and pair you up the best we can.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="column">
                <div className="info-container">
                  <div className="info-container-desc">
                    <h4>
                      I don't have all the qualifications for a position? Should
                      I still apply?
                    </h4>
                    <p>
                      Absolutely! Many start-ups are flexible and have adopted a
                      learn-as-they-go process. If you are interested about a
                      particular start-up and indicate that in your application,
                      we will definitely pair you up.
                    </p>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="info-container">
                  <div className="info-container-desc">
                    <h4>I'm an international student. How do I fit in?</h4>
                    <p>
                      Even if you are applying for an unpaid role, if you are an
                      international student applying through the YES Internship
                      Program for a U.S.-based start-up, you will need CPT or
                      OPT work authorization. Accomodations might be made for
                      international students who will be working remotely
                      outside of the U.S. for a non-U.S.-based start-up, but
                      these situations are conditional on the labor laws of the
                      country the start-up is based in.
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
