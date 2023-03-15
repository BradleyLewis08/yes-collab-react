import React from "react";

const Apply = () => {
    return (
        <div className="page-container full-container final-container">
            <h2 style={{ marginTop: 50 }}>apply for our summer 2023 cohort</h2>
            <p>
                Join our community of 300+ YES Interns working at some of the most exciting companies in the startup space
            </p>
            <button
                style={{
                    color: "white",
                    backgroundColor: "#328ef6",
                    border: "none",
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 20,
                    marginBottom: 20,
                    width: "20%",
                    ":hover": {
                        backgroundColor: "red",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                        transform: "scale(1.1)",
                    },
                }}
            >
                <a style={{color:"white", textDecoration:"none"}} href="https://bit.ly/yesinternships-application" target="_blank" rel="noreferrer noopener">Apply</a>
            </button>
            <p>
                Applications due March 17th.
            </p>
        </div>
    );
};

export default Apply;