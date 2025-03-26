import type { Task } from "@/types/task";
import { Checkbox } from "../ui/checkbox";
import { Tag } from "./tag";
import { Button } from "../ui/button";
import {
	AlarmClockIcon,
	CalendarDaysIcon,
	ChevronUpIcon,
	EllipsisVerticalIcon,
	FlagIcon,
	PaperclipIcon,
	PinIcon,
	PlusIcon,
	TagIcon,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const data: Task = {
	id: "1111-1111-1111-1111",
	title: "Title",
	desc: "Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc",
	labels: ["foo", "bar"],
	priority: 1,
};

export const TaskItem = () => {
	const [isOpen, setIsOpen] = useState(false);

	console.log(isOpen);

	return (
		<div
			className={cn("max-w-4xl w-full rounded-lg transition-all", {
				"p-3 border shadow": isOpen,
			})}
			onClick={() => {
				!isOpen && setIsOpen(true);
			}}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<Checkbox className="mr-2" />
					<div className="font-medium">{data.title}</div>
				</div>
				<Button
					variant="ghost"
					size="icon"
					className={cn("-m-2 opacity-0 transition-opacity", {
						"opacity-100": isOpen,
					})}
					onClick={() => {
						setIsOpen(false);
					}}
				>
					<ChevronUpIcon />
				</Button>
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="mx-6 overflow-hidden"
						initial={{ height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
						animate={{
							height: isOpen ? "auto" : 0,
							opacity: isOpen ? 1 : 0,
							marginTop: isOpen ? 8 : 0,
							marginBottom: isOpen ? 8 : 0,
						}}
						exit={{ height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
					>
						{data.desc}
					</motion.div>
				)}
			</AnimatePresence>
			<div className="flex ml-6 gap-1">
				<Tag title="School" />
				<Tag title="Work" />
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="flex ml-6 justify-between mt-2 overflow-hidden"
						initial={{ height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
						animate={{
							height: isOpen ? "auto" : 0,
							opacity: isOpen ? 1 : 0,
							marginTop: isOpen ? 8 : 0,
							marginBottom: isOpen ? 8 : 0,
						}}
						exit={{ height: 0, opacity: 0, marginTop: 0, marginBottom: 0 }}
					>
						<Button variant="ghost" className="-ml-3">
							<CalendarDaysIcon />
							Schedule
						</Button>
						<div>
							<Button variant="ghost" size="icon">
								<PlusIcon />
							</Button>
							<Button variant="ghost" size="icon">
								<PaperclipIcon />
							</Button>
							<Button variant="ghost" size="icon">
								<TagIcon />
							</Button>
							<Button variant="ghost" size="icon">
								<FlagIcon />
							</Button>
							<Button variant="ghost" size="icon">
								<AlarmClockIcon />
							</Button>
							<Button variant="ghost" size="icon">
								<PinIcon />
							</Button>
							<Button variant="ghost" size="icon">
								<EllipsisVerticalIcon />
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
