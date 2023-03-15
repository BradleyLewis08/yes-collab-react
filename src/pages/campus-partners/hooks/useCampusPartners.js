import { useState, useEffect } from "react";
import { mockData } from "./mock-data";
import { LOADED, LOADING, FAILED } from "redux/status-types";
import client from "redux/api";
import { CampusPartnerList } from "shared/models/campusPartner.model";

const shouldUseMockData = false
const mockDataList = new CampusPartnerList(mockData)

export function useCampusPartners() {

    const [data, setData] = useState(mockDataList.models)
    const [state, setState] = useState(LOADING)

    useEffect(() => {
        if (!shouldUseMockData) {
            setState(LOADING)
            client.get('main-app', '/getClubs')
                .then(r => {
                    var campusPartners = new CampusPartnerList(r)
                    setData(campusPartners.models.sort((a, b) => a.ClubName > b.ClubName ? 1 : -1))
                    setState(LOADED)
                })
                .catch(err => {
                    console.log(err)
                    setState(FAILED)
                })
        }
    }, [])

    return [
        data,
        state
    ];
}