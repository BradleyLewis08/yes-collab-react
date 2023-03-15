import { ImpressionList, ClickTracker } from "shared/models";
import {ADD_CLICK, ADD_IMPRESSION, SUBMIT_METRICS, SUBMIT_METRICS_FAILED, SET_METRICS } from "../action-types";
import { LOADING, LOADED, FAILED } from "../status-types";

const initialState = {
    isTrackingMetrics: true,
    impressions: new ImpressionList(),
    clicks: new ClickTracker(),
    status: LOADED
}

function metricsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CLICK: {
            let {startupId, positionId, index, startupName, title} = action.payload
            state.clicks.addClick(startupId, positionId, index, startupName, title)
            return {
                ...state
            };
        }
        case ADD_IMPRESSION: {
            let {startupId, index, startupName} = action.payload
            state.impressions.addImpression(startupId, index, startupName)
            return {
                ...state
            };
        }
        case SUBMIT_METRICS: {
            state.impressions = new ImpressionList()
            state.clicks.resetClicks()
            return {
                ...state,
                status: LOADED,
            };
        }
        case SUBMIT_METRICS_FAILED: {
            return {
                ...state,
                status: FAILED,
            };
        }
        case SET_METRICS: {
            return {
                ...state,
                isTrackingMetrics: action.payload.isTrackingMetrics,
            };
        }
        default:
            return state;
    }
}

export default metricsReducer 