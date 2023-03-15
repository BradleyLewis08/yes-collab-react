import React from 'react';
import "./dropdown.scss";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { setOptions } from "redux/actions"
import { useDispatch } from "react-redux";

const customStyles = {
    menuList: () => ({
        // none of react-select's styles are passed to <Control />
        maxHeight: '120px',
        overflow: 'scroll',
        zIndex: 9999,
    }),
}

export const Dropdown = ({ title, items, filterName, isMobile, options }) => {

    const dispatch = useDispatch();

    const handleChange = (e) => {
        // if item is being removed
        if (e) {
            dispatch(setOptions({ Option: filterName, Value: e.map(opt => opt.value) }));
        } else {
            dispatch(setOptions({ Option: filterName, Value: [] }));
        }
    }

    const animatedComponents = makeAnimated();
    let dropdownOptions = items.map(item => {
        return {
            value: item,
            label: item,
        }
    })
    var selectedOptions = []
    if (options[filterName]) {
        selectedOptions = options[filterName].map(item => {
            return {
                value: item,
                label: item,
            }
        })
    }
    

    return (
        <div className="dropdown">
            <Select
                options={dropdownOptions}
                isMulti
                value={selectedOptions}
                name="dropdown"
                className={`basic-multi-select ${(title === "Pay" || title === "Duration" || title === "International") ? "no-scroll" : "scroll"}`}
                classNamePrefix="select"
                components={animatedComponents}
                onChange={handleChange}
                menuPosition={isMobile ? "absolute" : "fixed"}
                placeholder={title}
                styles={customStyles} />
        </div>
    )
}