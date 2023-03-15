import { Model, List } from "./base";

export class CampusPartner extends Model {
    defaults() {
        return {
            ClubName: "",
            ClubUniversityName: "",
            ClubDescription: "",
            ClubLink: "",
            ClubLogo: "",
            ClubFgImage: "",
            ClubBgImage: "",
            ClubMainColor: "",
            ClubFgColor: "",
            ClubBgColor: "",
            PointsOfContact: [],
        };
    }
}

export class CampusPartnerList extends List { //Note never will two entries in this list have the same (StartupId/Index) pair
    get model() {
        return CampusPartner
    }
}
