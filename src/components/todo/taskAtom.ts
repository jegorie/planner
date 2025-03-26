import { atom } from "jotai";
import { splitAtom } from "jotai/utils";
import type { Task } from "./types";

const initialData: Task[] = [
    {
        id: "1111-1111-1111-1111",
        title: "Купить картошку \nи макароны",
        labels: ["School", "Work"],
        priority: 1,
    },
    {
        id: "2222-2222-2222-2222",
        title: "Очень важный текст",
        desc: "Тут могло быть что-то важное, но я забыл что хотел написать",
        labels: ["Work"],
        priority: 4,
    },
];

export const taskAtoms = atom<Task[]>(initialData);
export const taskAtom = splitAtom(taskAtoms);

//export const taskTitleAtom = atom(
//    (get) => get(taskAtom).title,
//    (get, set, newTitle: string) => {
//        set(taskAtom, { ...get(taskAtom), title: newTitle });
//    },
//);
//
//export const taskDescAtom = atom(
//    (get) => get(taskAtom).desc,
//    (get, set, newDesc: string) => {
//        set(taskAtom, { ...get(taskAtom), desc: newDesc });
//    },
//);
