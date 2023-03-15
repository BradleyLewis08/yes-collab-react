import { Model, List } from "./base";

export class Click extends Model {
    defaults() {
        return {
            StartupId: "",
            StartupName: "",
            PositionId: "",
            Title: "",
            Index: 0,
            Count: 0,
            ValidCount: 0,
            AverageTime: 0
        };
    }
}

export class ClickList extends List { //Note never will two entries in this list have the same (StartupId/Index) pair
    get model() {
        return Click
    }
}

export class ClickTracker extends Model {
    defaults() {
        return {
            clicks: new ClickList(),
            lastClick: null,
            startTime: null
        };
    }
    
    addClick(startupId, positionId, index, startupName, title) {//Updates click count and time spent on previous click
        var click = this.clicks.models.find(c => c.StartupId === startupId && c.PositionId === positionId && c.Index === index)
        if (click == null && startupId !== "") {
            click = new Click({StartupId: startupId, PositionId: positionId, Index: index, StartupName: startupName, Title: title})
            this.clicks.models.push(click)
        }
        var time = (new Date()).getTime();
        if (this.lastClick != null) {
            this.lastClick.Count += 1
            if (time<this.startTime+1000*60*15) {
                this.lastClick.ValidCount+=1
                this.lastClick.AverageTime = (this.lastClick.AverageTime*(this.lastClick.ValidCount-1)+(time-this.startTime)/1000)/this.lastClick.ValidCount
            }
        }
        this.lastClick = click;
        this.startTime = time;
    }

    resetClicks() {
        if (this.lastClick != null) {
            this.lastClick.Count = 0
            this.lastClick.ValidCount = 0
            this.lastClick.AverageTime = 0
            this.clicks.models = this.clicks.models.filter(c => c.StartupId === this.lastClick.StartupId && c.PositionId === this.lastClick.PositionId && c.Index === this.lastClick.Index)
        }
    }
}
