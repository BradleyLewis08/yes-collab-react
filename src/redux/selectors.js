
import { FAILED } from "redux/status-types";
import { FilterOptions } from "shared/models";

/**
 * Grabs current catalog state
 * @param {*} store 
 */
export const getCatalogState = store => store.catalog;

/**
 * Grabs current catalog state
 * @param {*} store 
 */
export const getPartnersState = store => store.partners;

/**
 * Gets the catalog data
 * @param {*} store 
 */
export const getCatalog = store =>
    getCatalogState(store) ? getCatalogState(store).data : [];

/**
 * Gets the current catalog status
 * @param {*} store 
 */
export const getCatalogStatus = store =>
    getCatalogState(store) ? getCatalogState(store).status : FAILED;

/**
 * Gets the current catalog filtering options
 * @param {*} store 
 */
export const getCatalogFilterOptions = store =>
    getCatalogState(store) ? getCatalogState(store).options : new FilterOptions();

/**
 * Gets the current catalog filtering options
 * @param {*} store 
 */
export const getShowingFilters = store =>
    getCatalogState(store) ? getCatalogState(store).showingFilters : false;

/**
 * Gets the current listing by the current state 
 * @param {*} store 
 */
export const getCurrentListing = (store) =>
    getCatalogState(store) ? getCatalog(store).getListingById(getCatalogFilterOptions(store).CurrentStartupId, getCatalogFilterOptions(store).CurrentPositionId) : {};

/**
 * Gets the current company by the current state 
 * @param {*} store 
 */
export const getCurrentCompany = (store) =>
    getCatalogState(store) ? getCatalog(store).getCompanyById(getCatalogFilterOptions(store).CurrentStartupId) : {};

/**
 * Gets catalog data according to current options and filters
 * @param {*} store 
 */
export const getFilteredCatalog = (store) =>
    getCatalogState(store) ? getCatalog(store).sorted(getCatalogState(store).options) : {}

/**
 * Gets all unique start-up infos
 * @param {*} store 
 */
export const getPartners = (store) =>
    getCatalogState(store) ? getPartnersState(store).data : [];

/**
 * Gets all unique start-up infos
 * @param {*} store 
 */
export const getPartnersStatus = (store) =>
    getCatalogState(store) ? getPartnersState(store).status : FAILED;

/**
 * These get the filter options
 * @param {*} store 
 */
export const getRoles = (store) =>
    getCatalogState(store) ? getCatalogState(store).data.roles : [];
export const getTimePeriods = (store) =>
    getCatalogState(store) ? getCatalogState(store).data.timePeriods : [];
export const getIndustries = (store) =>
    getCatalogState(store) ? getCatalogState(store).data.industries : [];
export const getFundingTypes = (store) =>
    getCatalogState(store) ? getCatalogState(store).data.fundingTypes : [];
export const getExperienceLevels = (store) =>
    getCatalogState(store) ? getCatalogState(store).data.experienceLevels : [];
export const getTimeCommitments = (store) => 
    getCatalogState(store) ? getCatalogState(store).data.timeCommitments : [];