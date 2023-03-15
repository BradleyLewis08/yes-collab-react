import { Catalog, FilterOptions } from "shared/models";
import { SET_OPTIONS, FETCH_LISTINGS, VIEW_CATOLOG, FETCH_LISTINGS_FAILED, FETCHING_LISTINGS, SHUFFLE_LISTINGS, SET_SHOWING_FILTERS } from "../action-types";
import { LOADING, LOADED, FAILED } from "../status-types";

const initialState = {
    data: new Catalog(),
    status: LOADED,
    options: new FilterOptions(), 
    showingFilters: false,
}

function catalogReducer(state = initialState, action) {
    switch (action.type) {
        case SET_OPTIONS: {
            let new_opt = { ...state.options }
            new_opt[action.payload.Option] = action.payload.Value
            return {
                ...state,
                options: new_opt,
            };
        }
        case FETCHING_LISTINGS: {
            return {
                ...state,
                status: LOADING,
            }
        }
        case FETCH_LISTINGS: {
            return {
                ...state,
                data: action.payload,
                status: LOADED,
            };
        }
        case FETCH_LISTINGS_FAILED: {
            return {
                ...state,
                status: FAILED,
            }
        }
        case VIEW_CATOLOG: {
            const { startupId, positionId } = action.payload
            let new_opt = { ...state.options }
            new_opt.CurrentStartupId = startupId
            new_opt.CurrentPositionId = positionId
            return {
                ...state,
                options: new_opt,
            }
        }
        case SHUFFLE_LISTINGS: {
            return {
                ...state,
                data: action.payload
            }
        }
        case SET_SHOWING_FILTERS: {
            return {
                ...state,
                showingFilters: action.payload
            }
        }
        default:
            return state;
    }
}

export default catalogReducer 
