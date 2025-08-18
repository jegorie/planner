import { atom, type PrimitiveAtom } from "jotai";
import type { Project } from "../types";

export const projectAtoms = atom<PrimitiveAtom<Project>[]>([]);