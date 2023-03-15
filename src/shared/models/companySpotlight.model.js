import { Model } from "./base";
import { StartupInfo, FounderList, PositionList } from "shared/models"

export class CompanySpotlight extends Model {
    defaults() {
        return {
            StartupInfo: new StartupInfo(),
            Founders: new FounderList(),
            Positions: new PositionList()
        };
    }
}

const companySpotlightFactory = (data, startUpID) => {
    return new CompanySpotlight({
        Founders: new FounderList(partner.Founders),
        StartupInfo: new StartupInfo(partner.StartupInfo)
    })
}
