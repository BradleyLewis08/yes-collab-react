import { List } from "./base";
import {
    CatalogPosition,
    CurrentListing,
    Position,
    FounderList,
    StartupInfo
} from "shared/models"
import { catalogPositionFactory, compareCatalogPosition, filterCatalogPositionWithOpt } from "./catalogPosition.model"
import { filterPositionWithOpt, PositionList } from "./position.model"
import { loadState, saveState } from "redux/api"

import { unique } from "utils/helper"

export class Catalog extends List {
    get model() {
        return CatalogPosition
    }

    // Gets all industries
    get industries() {
        var ret = new Set()
        this.models.forEach(pos => {
            pos.StartupInfo.Industries.forEach(industry =>
                ret.add(industry.trim())
            )
        })
        return (Array.from(ret)).sort()
    }

    get order() {
        return this.models.map(startup => startup.StartupInfo.StartupId)
    }

    // Gets all roles
    get roles() {
        let roles = this.models.map(startup => startup.Positions.models.map(pos => pos.Title))
        return unique([].concat.apply([], roles)).sort()
    }

    // Gets all Time Periods
    get timePeriods() {
        let timePeriods = this.models.map(startup => startup.Positions.models.map(pos => pos.TimePeriod))
        return unique([].concat.apply([], timePeriods))
    }

    // Gets all Startup Ids
    get ids() {
        return unique(this.models.map(pos => pos.StartupInfo.StartupId))
    }

    // Gets all Funding types
    get fundingTypes() {
        return unique(this.models.map(pos => pos.StartupInfo.Funding)).sort()
    }

    // Get all experience levels
    get experienceLevels() {
        return [
            "Proficient",
            "Comfortable",
            "Willing to Learn"
        ]
    }

    // Get time commitments
    get timeCommitments() {
        return [
            "1-5 hrs/wk", 
            "6-10 hrs/wk", 
            "11-15 hrs/wk",
            "16-20 hrs/wk",
            "Fulltime"
        ]
    }

    sorted(opt) {
        // Filters each position by not including if it does not include
        // a filtering property. Also only filters to include APPROVED positions.
        var startups = new Catalog(this.models)
        startups = startups.models.filter(startup => filterCatalogPositionWithOpt(opt, startup))
        startups.forEach(startup => {
            startup.Positions = new PositionList(startup.Positions.models.filter(pos => filterPositionWithOpt(opt, pos)))
        })
        return (new Catalog(startups.filter(startup => startup.Positions.models.length > 0)))
    }

    getListingById(startupId, positionId) {
        let startup = this.models.find(pos => pos.StartupInfo.StartupId === startupId)
        if (startup == null) return null

        this.models.forEach(catalogPosition => {
            catalogPosition.Selected = false;
            catalogPosition.Positions.models.forEach(pos => {
                if (pos.PositionId === positionId) {
                    pos.Selected = true;
                    catalogPosition.Selected = true;
                }
                else pos.Selected = false;
            })
        })

        let position = startup.Positions.models.find(pos => pos.PositionId === positionId)
        return new CurrentListing({
            Position: new Position(position),
            Founders: new FounderList(startup.Founders.models),
            StartupInfo: new StartupInfo(startup.StartupInfo),
        })
    }

    getCompanyById(startupId) {
        let startup = this.models.find(pos => pos.StartupInfo.StartupId === startupId)
        if (startup === undefined) return null

        this.models.forEach(catalogPosition => {
            catalogPosition.Selected = false;
            if (catalogPosition.StartupId === startupId) {
                catalogPosition.Selected = true;
            }
        })

        return startup
    }
}

export const catalogFactory = (data) => {
    const order = loadState('catalogOrder')
    const approvedStartups = data.filter(pos => pos.Position.Approved !== null && pos.Position.Approved)
    const ids = unique(approvedStartups.map(catPos => catPos.StartupInfo.StartupId))
    const startups = ids.map(id => approvedStartups.find(catPos => catPos.StartupInfo.StartupId === id))
    const ret = startups.map(startup => catalogPositionFactory(startup, approvedStartups))

    if (order) {
        function sortByOrder(a, b) {
            if (order.indexOf(a.StartupInfo.StartupId) < order.indexOf(b.StartupInfo.StartupId)) {
                return -1;
            }
            if (order.indexOf(a.StartupInfo.StartupId) > order.indexOf(b.StartupInfo.StartupId)) {
                return 1;
            }
            return 0;
        }
        return new Catalog(ret.sort(sortByOrder))
    } 
    return shuffledCatalog(new Catalog(ret))
}

export const shuffledCatalog = (catalog) => {
    var data = [...catalog.models]
    var currentIndex = data.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = data[currentIndex];
        data[currentIndex] = data[randomIndex];
        data[randomIndex] = temporaryValue;
    }

    let ids = data.map(startup => startup.StartupInfo.StartupId)
    saveState('catalogOrder', ids)

    return new Catalog(data);
}
