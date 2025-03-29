import { atom } from "jotai";
import { splitAtom } from "jotai/utils";

type Label = {
    title: string;
    color: string;
};

const initialData: Label[] = [
    { title: "Work", color: "blue" },
    { title: "Home", color: "red" },
    { title: "School", color: "cyan" },
];
export const labelAtoms = atom<Label[]>(initialData);
export const labelAtom = splitAtom(labelAtoms);
