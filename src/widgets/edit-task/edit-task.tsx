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
import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import type { Task } from "@/entities/task/types";
import { TextareaAutosize } from "@/shared/ui/textarea";
import { EditPriority } from "@/features/edit-priority";

type Props = {
    open: boolean;
    onOpenChange: (bool: boolean) => void;
    defaultValues?: Task;
};

export const EditTask: FC<Props> = (props) => {
    const { open, onOpenChange, defaultValues } = props;
    const form = useForm<Task>({
        mode: "onChange",
        defaultValues,
    });
    const { control } = form;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New task</DialogTitle>
                </DialogHeader>
                <Form {...form}>
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
                    <div className="flex gap-2 justify-between">
                        <div />
                        <div className="flex">
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
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
