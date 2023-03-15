import {
    SET_OPTIONS,
    FETCHING_LISTINGS,
    FETCH_LISTINGS,
    FETCH_LISTINGS_FAILED,
    VIEW_CATOLOG,
    FETCHING_PARTNERS,
    FETCH_PARTNERS,
    FETCH_PARTNERS_FAILED,
    SHUFFLE_LISTINGS,
    SET_SHOWING_FILTERS,
    ADD_CLICK,
    ADD_IMPRESSION,
    SUBMIT_METRICS,
    SUBMIT_METRICS_FAILED,
    SET_METRICS
} from "./action-types";
import client from "./api"
import { catalogFactory, partnerListFactory, shuffledCatalog } from "shared/models"
import mock from "shared/models/tests/mock"
import { loadState, saveState } from "redux/api"

export const fetchPartners = (dispatch) => {
    dispatch({ type: FETCHING_PARTNERS })
    client.get('main-app', '/partners')
        .then(r => {
            let res = partnerListFactory(r)
            dispatch({
                type: FETCH_PARTNERS,
                payload: res
            })
        })
        .catch(err => {
            console.error(err); // log since might be a render err
            dispatch({
                type: FETCH_PARTNERS_FAILED,
                payload: err
            });
        })
}

// will need to include something involving batch size later on
export const fetchListings = (dispatch) => {
    dispatch({ type: FETCHING_LISTINGS })
    client.get('main-app', '/catalog')
        .then(r => {
            let res = catalogFactory(r)

            // Commenting this will cause all available positions to be shown
            // res.models.forEach(catPos => {
            //     catPos.Positions.models = catPos.Positions.models.filter(pos => { return pos.MaxInterns > pos.InternsFilled } )
            // })
            
            dispatch({
                type: FETCH_LISTINGS,
                payload: res
            })
            dispatch(viewCatalog())
        })
        .catch(err => {
            console.error(err); // log since might be a render err
            dispatch({
                type: FETCH_LISTINGS_FAILED,
                payload: err
            });
        })
}

export const fetchMockListings = (dispatch) => {
    let res = catalogFactory(mock.data)
    dispatch({
        type: FETCH_LISTINGS,
        payload: res
    })
    dispatch(viewCatalog())
}

export const shuffleCatalog = () => {
    return function (dispatch, getState) {
        dispatch({
            type: SHUFFLE_LISTINGS,
            payload: shuffledCatalog(getState().catalog.data)
        })
    }
}

export const viewCatalog = (startupId, positionId) => {
    return function(dispatch, getState) {
        if ((startupId === "" && positionId === "") || (!startupId && !positionId)) {
            let currentListing = loadState('currentListing')
            if (currentListing) {
                startupId = currentListing.StartupId
                positionId = currentListing.PositionId
            }
            else if (getState().catalog.data.models.length > 0) {
                let defaultListing = {
                    StartupId: getState().catalog.data.models[0].StartupInfo.StartupId,
                    PositionId: ""
                }
                startupId = defaultListing.StartupId
                positionId = defaultListing.PositionId
                saveState('currentListing', defaultListing)
            }       
        } else {
            let defaultListing = {
                StartupId: startupId,
                PositionId: positionId
            }
            saveState('currentListing', defaultListing)
        }
        if (!positionId) positionId = ""
        dispatch({
            type: VIEW_CATOLOG,
            payload: { startupId, positionId }
        })
    }
}

// need to implement options action
export const setOptions = options => ({
    type: SET_OPTIONS,
    payload: { ...options }
});

export const setShowingFilters = val => ({
    type: SET_SHOWING_FILTERS,
    payload: val,
});

export const addClick = (startupId, positionId, index, startupName, title) => {
    return function(dispatch, getState) {
        if (getState().metrics.isTrackingMetrics) {
            dispatch({
                type: ADD_CLICK,
                payload: { startupId, positionId, index, startupName, title}
            })
        }
    }
}

export const addImpression = (startupId, index, startupName) => {
    return function(dispatch, getState) {
        if (getState().metrics.isTrackingMetrics) {
            dispatch({
                type: ADD_IMPRESSION,
                payload: { startupId, index, startupName }
            })
        }
    }
}

export const submitMetrics = () => {
    return function(dispatch, getState) {
        if (getState().metrics.isTrackingMetrics) {
            try {
                if (getState().metrics.impressions.models.length > 0 || getState().metrics.clicks.clicks.models.length > 1 || 
                    (getState().metrics.clicks.clicks.models.length === 1 && getState().metrics.clicks.clicks.models[0].Count > 0)) {
                    var body = {
                        "Impressions": getState().metrics.impressions.models,
                        "Clicks": getState().metrics.clicks.clicks.models
                    }
                    client.post('main-app', '/metrics', body)
                        .then(r => {
                            dispatch({
                                type: SUBMIT_METRICS,
                                payload: r
                            })
                        })
                        .catch(err => {
                            console.error(err); 
                            dispatch({
                                type: SUBMIT_METRICS_FAILED,
                                payload: err
                            });
                        })
                }
            } catch {}
        }
    }
}

export const setMetrics = (isTrackingMetrics) => {
    return function (dispatch, getState) {
        dispatch({
            type: SET_METRICS,
            payload: {isTrackingMetrics}
        })
    }
}