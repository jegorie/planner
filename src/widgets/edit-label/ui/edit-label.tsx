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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useEffect, type FC } from "react";
import { useForm } from "react-hook-form";
import { DialogDescription } from "@radix-ui/react-dialog";
import type { AvailableColors, Label } from "@/entities/label/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";

type Props = {
    open: boolean;
    onOpenChange: (bool: boolean) => void;
    defaultValues?: Label | null;
    parentTaskId?: string;
    onSubmit: (data: Label) => void;
};

const options: { title: string; value: AvailableColors }[] = [
    {
        title: "None",
        value: "NONE",
    },
    {
        title: "Orange",
        value: "ORANGE",
    },
];

export const EditLabel: FC<Props> = (props) => {
    const { open, onOpenChange, defaultValues, onSubmit } = props;
    const isEditing = !!defaultValues;
    const form = useForm<Label>({
        mode: "onChange",
        defaultValues: {
            id: "",
            title: "",
            color: "NONE",
            ...defaultValues,
        },
        values: { id: "", title: "", color: "NONE", ...defaultValues },
    });
    const { control, reset, handleSubmit } = form;

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
                    <DialogTitle>New label</DialogTitle>
                </DialogHeader>
                <DialogDescription hidden>Some desc</DialogDescription>
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
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a color" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {options.map((item) => (
                                                <SelectItem
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription hidden>
                                        You can manage label color.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
