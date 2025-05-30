export enum Priority {
    high = 1,
    medium = 2,
    low = 3,
    none = 4,
}

export enum RepeatPeriods {
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

type End = OnAfterEnd | OnDateEnd | NeverEnd;

export type Repeat =
    | {
          type: Exclude<RepeatPeriods, RepeatPeriods.custom>;
      }
    | {
          type: RepeatPeriods.custom;
          every: { type: CustomRepeatPeriods; count: number };
          end: End;
      };

export type Schedule = {
    date: string;
    repeat?: Repeat;
};

export type Task = {
    id: string;
    checked: boolean;
    title: string;
    desc: string;
    schedule?: Schedule;
    labels: string[];
    priority: Priority;
    subTasksIds: string[];
};
