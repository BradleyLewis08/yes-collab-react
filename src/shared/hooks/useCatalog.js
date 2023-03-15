import { useSelector } from "react-redux";
import { 
    getFilteredCatalog, 
    getCurrentListing, 
    getCatalogStatus,
    getCurrentCompany,
 } from "redux/selectors";

export default function useCatalog() {
    const catalog = useSelector(state => {
        return getFilteredCatalog(state);
    });
    const currentCompany = useSelector(state => {
        return getCurrentCompany(state)
    })
    const currentListing = useSelector(state => {
        return getCurrentListing(state);
    });
    const status = useSelector(state => {
        return getCatalogStatus(state)
    })
    return {
        catalog,
        currentListing,
        status,
        currentCompany,
    }
}
