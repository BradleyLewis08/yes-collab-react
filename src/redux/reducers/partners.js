
import { PartnerList } from "shared/models";
import { FETCH_PARTNERS, FETCHING_PARTNERS, FETCH_PARTNERS_FAILED } from "../action-types";
import { LOADING, LOADED, FAILED } from "../status-types";

const initialState = {
    data: new PartnerList(),
    status: FAILED
}

function partnerReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_PARTNERS: {
            return {
                ...state,
                status: LOADING,
            }
        }
        case FETCH_PARTNERS: {
            return {
                ...state,
                data: action.payload,
                status: LOADED,
            };
        }
        case FETCH_PARTNERS_FAILED: {
            return {
                ...state,
                status: FAILED,
            }
        }
        default:
            return state;
    }
}

export default partnerReducer 
