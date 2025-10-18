export enum Priority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW",
    NONE = "NONE",
}

export enum RepeatPeriods {
    NONE = 0,
    DAILY = 1,
    WEEKLY = 2,
    MONTHLY = 3,
    YEARLY = 4,
    CUSTOM = 5,
}

enum CustomRepeatPeriods {
    MINUTE = 1,
    HOURS = 2,
    DAILY = 3,
    WEEKLY = 4,
    MONTHLY = 5,
    YEARLY = 6,
}

enum EndType {
    NEVER = 0,
    ON_DATE = 1,
    AFTER = 2,
}

type OnDateEnd = {
    type: EndType.ON_DATE;
    date: string;
};

type OnAfterEnd = {
    type: EndType.AFTER;
    count: number;
};

type NeverEnd = {
    type: EndType.NEVER;
};

type End = OnAfterEnd | OnDateEnd | NeverEnd;

export type Repeat =
    | {
          type: Exclude<RepeatPeriods, RepeatPeriods.CUSTOM>;
      }
    | {
          type: RepeatPeriods.CUSTOM;
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
    labelIds: string[];
    priority: Priority;
    subTasksIds: string[];
};

export type UpdateTask = Partial<Omit<Task, "id">>;
