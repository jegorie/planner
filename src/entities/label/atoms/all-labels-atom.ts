import { atom, type PrimitiveAtom } from "jotai";
import type { Label } from "../types";

const initialData: PrimitiveAtom<Label>[] = [
    atom<Label>({ title: "Work", color: "orange", id: "1" }),
    atom<Label>({ title: "Home", color: "orange", id: "2" }),
    atom<Label>({ title: "School", color: "none", id: "3" }),
];
export const labelAtoms = atom<PrimitiveAtom<Label>[]>(initialData);
