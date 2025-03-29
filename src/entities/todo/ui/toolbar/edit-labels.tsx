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
import { useIsMobile } from "@/shared/hooks/use-mobile";
import type { Label } from "@/entities/label/types";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/shared/ui/drawer";

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

    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer
                open={open}
                onOpenChange={(open) => {
                    console.log("ChAngE");
                    setOpen(open);
                }}
            >
                <DrawerTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <TagIcon />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="h-[80dvh]">
                    <DrawerHeader className="hidden">
                        <DrawerTitle>Labels</DrawerTitle>
                        <DrawerDescription>
                            Choose available labels
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="mt-4 border-t text-base">
                        <EditLabelsCommand
                            search={search}
                            setSearch={setSearch}
                            setOpen={setOpen}
                            availableLabels={availableLabels}
                            setAvailableLabels={setAvailableLabels}
                            labels={labels}
                            setLabels={setLabels}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                    <TagIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <EditLabelsCommand
                    search={search}
                    setSearch={setSearch}
                    setOpen={setOpen}
                    availableLabels={availableLabels}
                    setAvailableLabels={setAvailableLabels}
                    labels={labels}
                    setLabels={setLabels}
                />
            </PopoverContent>
        </Popover>
    );
};

type CommandProps = {
    search: string;
    setSearch: (search: string) => void;
    setOpen: (open: boolean) => void;
    availableLabels: Label[];
    setAvailableLabels: (useMediaQuery: Label[]) => void;
    labels: string[] | undefined;
    setLabels: (labels: string[]) => void;
};

const EditLabelsCommand: React.FC<CommandProps> = (props) => {
    const {
        search,
        setSearch,
        setOpen,
        availableLabels,
        setAvailableLabels,
        labels,
        setLabels,
    } = props;

    return (
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
                                setOpen(false);
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
    );
};
