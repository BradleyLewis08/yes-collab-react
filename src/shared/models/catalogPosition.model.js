import { Model } from "./base";

import {
    FounderList,
    Position,
    PositionList,
    SkillsList,
    StartupInfo,
} from "shared/models"

export const competitiveStartups = [
    "Nithio",
    "Courier",
    "Bluespace.ai",
    "GoSite",
    "ProPhone",
    "Raise Green",
    "The Artemis Fund",
    "Segmed",
]

export class CatalogPosition extends Model {
    defaults() {
        return {
            Positions: new PositionList(),
            Founders: new FounderList(),
            StartupInfo: new StartupInfo(),
        };
    }

    get isCompetitive() {
        if (competitiveStartups.includes(this.StartupInfo.StartupName.trim())) {
            return true
        }
        return false
    }
}

export const catalogPositionFactory = (startup, data) => {
    var positions = (data.filter(pos => pos.StartupInfo.StartupId === startup.StartupInfo.StartupId)).map(startup => startup.Position)
    return new CatalogPosition({
        Founders: new FounderList(startup.Founders),
        Positions: new PositionList(positions.map(position => new Position({
            ...position,
            Title: position.Title + " Intern",
            TimeCommitment: getTimeCommitment(position.TimeCommitment),
            TimeCommitmentVal: position.TimeCommitment,
            Skills: new SkillsList(position.Skills),
            Paid: getPaid(position.Paid),
            PaidInfo: position.Paid
        }))),
        StartupInfo: new StartupInfo({
            ...startup.StartupInfo,
            Paid: getPaid(startup.StartupInfo.Paid),
            PaidInfo: startup.StartupInfo.Paid,
        })
    })
}

export const filterCatalogPositionWithOpt = (opt, startup) => {
    if (opt.KeywordSearch && opt.KeywordSearch !== "") {
        let search = opt.KeywordSearch.trim().toLowerCase()
        if (!startup.StartupInfo.StartupName.toLowerCase().includes(search) &&
            !startup.StartupInfo.Blurb.toLowerCase().includes(search) &&
            !startup.Positions.models.some(position => position.Title.toLowerCase().includes(search))) {
            return false
        }
    }
    if (opt.IndustrySearch.length > 0 && opt.IndustrySearch[0] !== "") {
        if (!startup.StartupInfo.Industries.some(industry => opt.IndustrySearch.includes(industry.trim()))) {
            return false
        }
    }
    if (opt.Funding.length > 0) {
        if (!opt.Funding.includes(startup.StartupInfo.Funding.trim())) {
            return false
        }
    }
    if (opt.Paid.length > 0) {
        if (!opt.Paid.includes(startup.StartupInfo.Paid.trim()) && !startup.Positions.models.some(position => opt.Paid.includes(position.Paid.trim()))) {
            return false
        }
    }
    if (opt.International.length > 0) {
        if ((!opt.International.includes("International") && startup.StartupInfo.International) ||
            (!opt.International.includes("Domestic") && !startup.StartupInfo.International)) {
            return false
        }
    }
    return true
}

export const compareCatalogPosition = (a, b) => {
    if (a.StartupInfo.StartupName < b.StartupInfo.StartupName) {
        return -1;
    }
    if (a.StartupInfo.StartupName > b.StartupInfo.StartupName) {
        return 1;
    }
    return 0;
}

function getTimeCommitment(tc) {
    console.log(tc)
    if ((tc[0] === 40 || tc[0] === "40") && (tc[1] === 40 || tc[1] === "40")) return "Full-time"
    return "" + tc[0] + "-" + tc[1] + " hrs/week"
}

function getPaid(opt) {
    if (opt && (opt.trim() === "Unpaid" || opt.trim() === "No")) return "Unpaid"
    else if (opt && opt === "") return ""
    else if (!opt) return ""
    return "Paid"
}

