import { Model, List } from "./base";

export class Impression extends Model {
    defaults() {
        return {
            StartupId: "",
            StartupName: "",
            Index: 0,
            Count: 1,
        };
    }
}

export class ImpressionList extends List { //Note never will two entries in this list have the same (StartupId/Index) pair
    get model() {
        return Impression
    }

    addImpression(startupId, index, startupName) {
        let impression = this.models.find(imp => imp.StartupId === startupId && imp.Index === index)
        if (impression === undefined) {
            this.models.push(new Impression({StartupId: startupId, Index: index, StartupName: startupName}))
        }
        else {
            impression.Count += 1
        }
    }
}
