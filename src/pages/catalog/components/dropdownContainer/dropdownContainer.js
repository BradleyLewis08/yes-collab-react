import React from "react";
import Dropdown from "../dropdown"
import "./dropdownContainer.scss"
import { getCatalogFilterOptions } from "redux/selectors";
import { useSelector } from "react-redux";

export const DropdownContainer = ({ timeCommitments, industries, timePeriods, roles, experienceLevels, fundingTypes, isMobile }) => {
    
    const options = useSelector(state => getCatalogFilterOptions(state));
    
    return (
        <React.Fragment>
            <div className="dropdown-container">
                <Dropdown title="Industry" items={industries} filterName="IndustrySearch" isMobile={isMobile} options={options}/>
                <Dropdown title="Pay" items={["Paid", "Unpaid"]} filterName="Paid" isMobile={isMobile} options={options}/>
                <Dropdown title="International" items={["International", "Domestic"]} filterName="International" isMobile={isMobile} options={options}/>
                <Dropdown title="Duration" items={timePeriods} filterName="TimePeriod" isMobile={isMobile} options={options}/>
                <Dropdown title="Role" items={roles} filterName="Role" isMobile={isMobile} options={options}/>
                <Dropdown title="Experience" items={experienceLevels} filterName="Experience" isMobile={isMobile} options={options}/>
                <Dropdown title="Funding" items={fundingTypes} filterName="Funding" isMobile={isMobile} options={options}/>
                <Dropdown title="Time commitment" items={timeCommitments} filterName="TimeCommitment" isMobile={isMobile} options={options}/>
            </div>
        </React.Fragment>
    )
}
