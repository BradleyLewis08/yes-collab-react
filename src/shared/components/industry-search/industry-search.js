import React, { useEffect, useState } from 'react';
import "./industry-search.scss";
import Icon from 'shared/images/search-icon.png'
import { setOptions } from "redux/actions"
import { useSelector, useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";
import Autosuggest from 'react-autosuggest';

import { getIndustries } from "redux/selectors"

/**
 * Search bar that appears on the landing
 */
export const IndustrySearchBar = () => {

    const industries = useSelector(state => getIndustries(state))
    const [value, setValue] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setOptions({ Option: "IndustrySearch", Value: [] }))
        setValue("")
    }, [dispatch])

    // Set input value
    const onChange = (event, { newValue }) => {
        setValue(newValue)
    };

    // Get suggestions
    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : (industries.filter(industry =>
            industry.toLowerCase().slice(0, inputLength) === inputValue
        )).map(industry => industry === "Saas" ? "SaaS" : industry);
    };

    // Set suggestions
    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    // Clear suggestions
    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    // Suggestion getter
    const getSuggestionValue = suggestion => suggestion

    // When selection is click 
    const onSuggestionSelected = (event, { suggestion }) => {
        dispatch(setOptions({ Option: "IndustrySearch", Value: [suggestion] }))
    }

    // Use your imagination to render suggestions.
    const renderSuggestion = suggestion => (
        <NavLink exact to="/catalog">
            <div>
                {suggestion}
            </div>
        </NavLink>

    );

    // Input for auto suggests
    const inputProps = {
        placeholder: 'Search Industries',
        className: "industry-search-input",
        value,
        onChange: onChange
    };

    return (
        <div className="industry-search-bar-container">
            <div className="industry-input-container">
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    onSuggestionSelected={onSuggestionSelected}
                    inputProps={inputProps}
                />
            </div>
            <NavLink exact to="/catalog" onClick={e => dispatch(setOptions({ Option: "IndustrySearch", Value: [value] }))}>
                <div className="icon-container">
                    <img className="industry-search-icon" src={Icon} alt="Search" />
                </div>
            </NavLink>
        </div>
    )
};
