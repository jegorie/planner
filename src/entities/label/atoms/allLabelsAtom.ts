import { atom, type PrimitiveAtom } from "jotai";
import type { Label } from "../types";

const initialData: PrimitiveAtom<Label>[] = [
    atom<Label>({ title: "Work", color: "blue" }),
    atom<Label>({ title: "Home", color: "red" }),
    atom<Label>({ title: "School", color: "cyan" }),
];
export const labelAtoms = atom<PrimitiveAtom<Label>[]>(initialData);
