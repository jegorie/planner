import { atom, type PrimitiveAtom } from "jotai";
import type { Label } from "../types";

const initialData: PrimitiveAtom<Label>[] = [];
export const labelAtoms = atom<PrimitiveAtom<Label>[]>(initialData);
