enum Priority {
    high = 1,
    medium = 2,
    low = 3,
    none = 4,
}
enum RepeatPeriods {
    none = 0,
    daily = 1,
    weekly = 2,
    monthly = 3,
    yearly = 4,
    custom = 5,
}

enum CustomRepeatPeriods {
    minute = 1,
    hours = 2,
    daily = 3,
    weekly = 4,
    monthly = 5,
    yearly = 6,
}

enum EndType {
    never = 0,
    onDate = 1,
    after = 2,
}

type OnDateEnd = {
    type: EndType.onDate;
    date: string;
};

type OnAfterEnd = {
    type: EndType.after;
    count: number;
};

type NeverEnd = {
    type: EndType.never;
};

export type Schedule = {
    date: string;
    repeat: {
        type: RepeatPeriods;
    } & {
        type: RepeatPeriods.custom;
        every: { type: CustomRepeatPeriods; count: number };
        end: OnAfterEnd | OnDateEnd | NeverEnd;
    };
};

export type Task = {
    id: string;
    checked: boolean;
    title: string;
    desc: string;
    schedule?: Schedule;
    labels: string[];
    priority?: Priority;
    subTasksIds: string[];
};
