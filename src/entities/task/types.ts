export enum Priority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW",
    NONE = "NONE",
}

export enum RepeatPeriods {
    NONE = "NONE",
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
    CUSTOM = "CUSTOM",
}

enum CustomRepeatPeriods {
    MINUTE = "MINUTE",
    HOURS = "HOURS",
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
}

enum EndType {
    NEVER = "NEVER",
    ON_DATE = "ON_DATE",
    AFTER = "AFTER",
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
    updatedAt: string;
    createdAt: string;
    position: number;
};

export type UpdateTask = Partial<Omit<Task, "id">> & { afterTaskId?: string };
