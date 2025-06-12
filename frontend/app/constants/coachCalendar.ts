type CoachCalendar = {
    label: string;
    value: Date;
    type: "start" | "end";
}

const COACH_CALENDAR: CoachCalendar[] = [
    {
        label: "Aujourd'hui",
        value: new Date(),
        type: "start"
    }, {
        label: "Hier",
        value: new Date(new Date().setDate(new Date().getDate() - 1)),
        type: "start"
    }, {
        label: "7 derniers jours",
        value: new Date(new Date().setDate(new Date().getDate() - 7)),
        type: "start"
    }, {
        label: "30 derniers jours",
        value: new Date(new Date().setDate(new Date().getDate() - 30)),
        type: "start"
    }, {
        label: "Aujourd'hui",
        value: new Date(),
        type: "end"
    },
    {
        label: "Demain",
        value: new Date(new Date().setDate(new Date().getDate() + 1)),
        type: "end"
    }, {
        label: "Dans 7 jours",
        value: new Date(new Date().setDate(new Date().getDate() + 7)),
        type: "end"
    },
    {
        label: "Dans 30 jours",
        value: new Date(new Date().setDate(new Date().getDate() + 30)),
        type: "end"
    }
]

export {
    COACH_CALENDAR
}