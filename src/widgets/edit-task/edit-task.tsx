import { Button } from "@/shared/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/shared/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useEffect, type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { Priority, type Task } from "@/entities/task/types";
import { TextareaAutosize } from "@/shared/ui/textarea";
import { EditPriority } from "@/features/edit-priority";
import { EditLabels } from "@/features/edit-labels/edit-labels";
import { DialogDescription } from "@radix-ui/react-dialog";
import { FilteredLabelCards } from "@/entities/label/ui/filtered-label-cards";

type Props = {
    open: boolean;
    onOpenChange: (bool: boolean) => void;
    defaultValues?: Task;
    parentTaskId?: string;
    onSubmit: (data: Task) => void;
};

export const EditTask: FC<Props> = (props) => {
    const { open, onOpenChange, defaultValues, onSubmit } = props;
    const isEditing = !!defaultValues;
    const form = useForm<Task>({
        mode: "onChange",
        defaultValues: {
            priority: Priority.none,
            checked: false,
            title: "",
            desc: "",
            labels: [],
            subTasksIds: [],
            ...defaultValues,
        },
    });
    const { control, watch, reset, handleSubmit } = form;

    useEffect(() => {
        if (!open) {
            reset();
        }
        () => {
            reset();
        };
    }, [reset, open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New task</DialogTitle>
                </DialogHeader>
                <DialogDescription>Some desc</DialogDescription>
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="desc"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Desc</FormLabel>
                                    <FormControl>
                                        <TextareaAutosize
                                            className="resize-none"
                                            placeholder="Desc"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FilteredLabelCards labels={watch("labels")} />
                        <div className="flex gap-2 justify-between">
                            <div />
                            <div className="flex">
                                <Controller
                                    control={control}
                                    name="labels"
                                    render={({ field }) => (
                                        <EditLabels
                                            labels={field.value}
                                            setLabels={field.onChange}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="priority"
                                    render={({ field }) => (
                                        <EditPriority
                                            currentPriority={field.value}
                                            setCurrentPriority={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">
                                {isEditing ? "Save changes" : "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
