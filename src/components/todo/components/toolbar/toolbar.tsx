import { motion } from "motion/react";
import type { Task } from "../../types";
import type { PrimitiveAtom } from "jotai";
import { Button } from "@/components/ui/button";
import {
    AlarmClockIcon,
    CalendarDaysIcon,
    EllipsisVerticalIcon,
    FlagIcon,
    PaperclipIcon,
    PinIcon,
    PlusIcon,
} from "lucide-react";
import { EditLabels } from "./edit-labels";

type Props = {
    atom: PrimitiveAtom<Task>;
    isOpen: boolean;
};

export const Toolbar: React.FC<Props> = (props) => {
    const { isOpen, atom } = props;

    return (
        <motion.div
            className="flex ml-4 justify-between mt-2 overflow-hidden"
            initial={{
                height: 0,
                opacity: 0,
                marginTop: 0,
            }}
            animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
                marginTop: isOpen ? 8 : 0,
            }}
            exit={{
                height: 0,
                opacity: 0,
                marginTop: 0,
            }}
        >
            <Button variant="ghost" disabled>
                <CalendarDaysIcon />
                Schedule
            </Button>
            <div>
                <Button variant="ghost" size="icon" disabled>
                    <PlusIcon />
                </Button>
                <Button variant="ghost" size="icon" disabled>
                    <PaperclipIcon />
                </Button>
                <EditLabels atom={atom} />
                <Button variant="ghost" size="icon" disabled>
                    <FlagIcon />
                </Button>
                <Button variant="ghost" size="icon" disabled>
                    <AlarmClockIcon />
                </Button>
                <Button variant="ghost" size="icon" disabled>
                    <PinIcon />
                </Button>
                <Button variant="ghost" size="icon" disabled>
                    <EllipsisVerticalIcon />
                </Button>
            </div>
        </motion.div>
    );
};
