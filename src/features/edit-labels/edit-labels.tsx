import { Button } from "@/shared/ui/button";
import { PlusIcon, TagIcon } from "lucide-react";
import { useState } from "react";
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
import { useIsMobile } from "@/shared/hooks/use-mobile";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/shared/ui/drawer";
import { useLabelsSync } from "@/entities/label/hooks/use-labels-sync";

type Props = {
    labels: string[] | undefined;
    setLabels: (labels: string[]) => void;
    projectId: string;
};

export const EditLabels: React.FC<Props> = (props) => {
    const { labels, setLabels, projectId } = props;
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
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
                            labels={labels}
                            setLabels={setLabels}
                            projectId={projectId}
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
                    labels={labels}
                    setLabels={setLabels}
                    projectId={projectId}
                />
            </PopoverContent>
        </Popover>
    );
};

type CommandProps = {
    search: string;
    setSearch: (search: string) => void;
    setOpen: (open: boolean) => void;
    labels: string[] | undefined;
    setLabels: (labels: string[]) => void;
    projectId: string;
};

const EditLabelsCommand: React.FC<CommandProps> = (props) => {
    const { search, setSearch, setOpen, labels, setLabels, projectId } = props;

    const {
        labels: availableLabels,
        createLabel,
        isCreating,
    } = useLabelsSync({ projectId });

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
                            disabled={isCreating}
                            onClick={() => {
                                createLabel(
                                    {
                                        title: search,
                                        color: "NONE",
                                    },
                                    {
                                        onSuccess: (label) => {
                                            setLabels([
                                                ...(labels ?? []),
                                                label.id,
                                            ]);
                                            setOpen(false);
                                        },
                                    },
                                );
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
                                (item) => item === availableLabel.id,
                            ) >= 0;

                        return (
                            <CommandItem
                                key={availableLabel.id}
                                value={availableLabel.id}
                                onSelect={() => {
                                    if (isSelected) {
                                        setLabels(
                                            labels.filter(
                                                (item) =>
                                                    item !== availableLabel.id,
                                            ),
                                        );
                                    } else {
                                        setLabels([
                                            ...(labels ?? []),
                                            availableLabel.id,
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
