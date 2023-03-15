import { Model, List } from "./base";
import { SkillsList } from "./skill.model"

export class Position extends Model {
    defaults() {
        return {
            StartupId: "",
            PositionId: "",
            Selected: false,
            Round: 0,
            Paid: "",
            PaidInfo: "",

            Title: "",
            Skills: new SkillsList(), 

            MaxInterns: 0,
            InternsFilled: 0,
            TimeCommitment: "",
            TimeCommitmentVal: [],
            Timezone: "",
            Location: "",
            TimePeriod: "", 
            TeamSize: "",

            Qualifications: "",
            Projects: "",
            Approved: false
        };
    }

    get isFilled() {
        try {
            var max = Number(this.MaxInterns)
            var filled = Number(this.InternsFilled)
            if (max - filled <= 0) {
                return true 
            }
        }
        catch {
            return false
        }
        return false
    }

    get openPositions() {
        var max = Number(this.MaxInterns)
        return String(max) + " available position(s)"
        // try {
        //     var max = Number(this.MaxInterns)
        //     var filled = Number(this.InternsFilled)
        //     if (max - filled <= 0) {
        //         return "All candidacy spots filled"
        //     }
        //     else {
        //         return String(max - filled) + " available position(s)"
        //     }
        // }
        // catch {
        //     return this.MaxInterns + " available position(s)"
        // }
    }
}

export const filterPositionWithOpt = (opt, pos) => {
    if (opt.Role.length > 0) {
        if (!opt.Role.includes(pos.Title.trim())) {
            return false
        }
    }
    if (opt.TimeCommitment.length > 0) {
        let tcs = opt.TimeCommitment.map(optTC => timeCommitments[optTC])
        if (!tcs.some(tc => overlap(tc, pos.TimeCommitmentVal))) {
            return false
        }
    }
    if (opt.TimePeriod.length > 0) {
        if (!opt.TimePeriod.includes(pos.TimePeriod.trim())) {
            return false
        }
    }
    if (opt.Experience.length > 0) {
        var expLevels = pos.Skills.models.map(skill => skill.Level)
        if (!expLevels.some(level => opt.Experience.indexOf(level.trim()) >= 0)) {
            return false
        }
    }
    return true
}

const timeCommitments = {
    "1-5 hrs/wk": [1,5], 
    "6-10 hrs/wk": [6, 10],
    "11-15 hrs/wk": [11, 15],
    "16-20 hrs/wk": [16, 20],
    "Fulltime": [40, 40]
}

const overlap = (a, b) => {
    if (a[1] === b[1] && a[0] === b[0]) return true
    return Math.max(0, Math.min(a[1], b[1]) - Math.max(a[0], b[0])) > 0
}

export class PositionList extends List {
    get model() {
        return Position
    }
}
