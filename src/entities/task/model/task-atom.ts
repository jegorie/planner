import { atom, type PrimitiveAtom } from "jotai";
import { Priority, type Task } from "../types";

export const defaultTask = {
    checked: false,
    desc: "",
    title: "",
    labels: [],
    priority: Priority.low,
    subTasksIds: [],
};

const initialData: PrimitiveAtom<Task>[] = [];

export const taskAtoms = atom<PrimitiveAtom<Task>[]>(initialData);
