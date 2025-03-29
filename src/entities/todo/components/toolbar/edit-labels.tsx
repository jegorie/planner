import { Button } from "@/shared/ui/button";
import { PlusIcon, TagIcon } from "lucide-react";
import type { Task } from "../../types";
import { useAtom, type PrimitiveAtom } from "jotai";
import { useMemo, useState } from "react";
import { focusAtom } from "jotai-optics";

import { Check } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { labelAtoms } from "@/entities/label/atoms/allLabelsAtom";

type Props = {
    atom: PrimitiveAtom<Task>;
};

export const EditLabels: React.FC<Props> = (props) => {
    const [search, setSearch] = useState("");
    const { atom } = props;
    const [open, setOpen] = useState(false);
    const [availableLabels, setAvailableLabels] = useAtom(labelAtoms);
    const [labels, setLabels] = useAtom(
        useMemo(() => {
            return focusAtom(atom, (optic) => optic.prop("labels"));
        }, [atom]),
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                    <TagIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Labels"
                        value={search}
                        onValueChange={setSearch}
                    />
                    <CommandList>
                        <CommandEmpty>
                            <div>No label found.</div>
                            <div>
                                <Button
                                    variant={"outline"}
                                    size="sm"
                                    className="mt-1"
                                    onClick={() => {
                                        setLabels([...(labels ?? []), search]);
                                        setAvailableLabels([
                                            ...availableLabels,
                                            { title: search, color: "black" },
                                        ]);
                                    }}
                                >
                                    <PlusIcon />
                                    {search}
                                </Button>
                            </div>
                        </CommandEmpty>
                        <CommandGroup>
                            {availableLabels?.map((availableLabel) => {
                                const isSelected =
                                    labels &&
                                    labels.findIndex(
                                        (item) => item === availableLabel.title,
                                    ) >= 0;

                                return (
                                    <CommandItem
                                        key={availableLabel.title}
                                        value={availableLabel.title}
                                        onSelect={() => {
                                            if (isSelected) {
                                                setLabels(
                                                    labels.filter(
                                                        (item) =>
                                                            item !==
                                                            availableLabel.title,
                                                    ),
                                                );
                                            } else {
                                                setLabels([
                                                    ...(labels ?? []),
                                                    availableLabel.title,
                                                ]);
                                            }
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                isSelected
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                            )}
                                        />
                                        {availableLabel.title}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
