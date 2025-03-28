import { atom } from "jotai";
import { splitAtom } from "jotai/utils";
import type { Task } from "./types";

const initialData: Task[] = [
    {
        id: "1111-1111-1111-1111",
        checked: true,
        desc: "",
        title: "Купить картошку \nи макароны",
        labels: ["Work", "Home"],
        priority: 1,
    },
    {
        id: "2222-2222-2222-2222",
        checked: false,
        title: "Очень важный текст",
        desc: "Тут могло быть что-то важное, но я забыл что хотел написать",
        labels: ["School"],
        priority: 4,
    },
];

export const taskAtoms = atom<Task[]>(initialData);
export const taskAtom = splitAtom(taskAtoms);
