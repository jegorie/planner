import { atom } from "jotai";
import { splitAtom } from "jotai/utils";
import type { Label } from "../types";

const initialData: Label[] = [
    { title: "Work", color: "blue" },
    { title: "Home", color: "red" },
    { title: "School", color: "cyan" },
];
export const labelAtoms = atom<Label[]>(initialData);
export const labelAtom = splitAtom(labelAtoms);
