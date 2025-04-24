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

const initialData: PrimitiveAtom<Task>[] = [
    atom<Task>({
        id: "1111-1111-1111-1111",
        checked: true,
        desc: "",
        title: "Купить картошку \nи макароны",
        labels: ["Work", "Home"],
        priority: Priority.high,
        subTasksIds: [],
    }),
    atom<Task>({
        id: "2222-2222-2222-2222",
        checked: false,
        title: "Очень важный текст",
        desc: "Тут могло быть что-то важное, но я забыл что хотел написать",
        labels: ["School"],
        priority: Priority.none,
        subTasksIds: [],
    }),
];

export const taskAtoms = atom<PrimitiveAtom<Task>[]>(initialData);
