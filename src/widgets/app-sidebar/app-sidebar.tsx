import { CalendarDaysIcon, InboxIcon, StarIcon, TagIcon } from "lucide-react";

import { AppSwitcher } from "./app-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarRail,
} from "@/shared/ui/sidebar";
import { cn } from "@/shared/lib/utils";
import { type ReactNode } from "react";
import { ModeToggle } from "@/shared/ui/mode-toggle";
import { Link } from "@tanstack/react-router";
import { ProjectsList } from "@/widgets/projects-sidebar/ui/projects-list";

// This is sample data.
const data = {
    apps: ["planner"],
    navMain: [
        {
            title: "Home project",
            url: "#",
            items: [
                {
                    title: "Introduction",
                    url: "#",
                    isActive: true,
                },
                {
                    title: "Project Structure",
                    url: "#",
                },
            ],
        },
        {
            title: "Team project",
            url: "#",
            items: [
                {
                    title: "Routing",
                    url: "#",
                },
                {
                    title: "Data Fetching",
                    url: "#",
                },
                {
                    title: "Rendering",
                    url: "#",
                },
                {
                    title: "Caching",
                    url: "#",
                },
                {
                    title: "Styling",
                    url: "#",
                },
            ],
        },
    ],
};

type TAvailableColors = "blue" | "green" | "orange" | "purple";

const hotMenuItems: {
    to: string;
    title: string;
    color: TAvailableColors;
    icon: ReactNode;
}[] = [
    {
        to: "/",
        title: "Inbox",
        color: "blue",
        icon: <InboxIcon className="size-4" />,
    },
    {
        to: "/today",
        title: "Today",
        color: "green",
        icon: <StarIcon className="size-4" />,
    },
    {
        to: "/scheduled",
        title: "Scheduled",
        color: "purple",
        icon: <CalendarDaysIcon className="size-4" />,
    },
    {
        to: "/labels",
        title: "Labels",
        color: "orange",
        icon: <TagIcon className="size-4" />,
    },
];

const Item = (props: {
    title: string;
    icon: ReactNode;
    color: TAvailableColors;
    to: string;
}) => {
    const { title, icon, color, to } = props;

    const colorsMap = {
        blue: "text-blue-card bg-blue-card-foreground hover:bg-blue-card-action",
        green: "text-green-card bg-green-card-foreground hover:bg-green-card-action",
        orange: "text-orange-card bg-orange-card-foreground hover:bg-orange-card-action",
        purple: "text-purple-card bg-purple-card-foreground hover:bg-purple-card-action",
    } as const;

    return (
        <Link
            to={to}
            className={cn(
                "p-2 rounded-sm font-bold text-sm cursor-pointer transition-colors hover:shadow",
                colorsMap[color],
            )}
        >
            {icon}
            <div>{title}</div>
        </Link>
    );
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props} variant="floating">
            <SidebarHeader>
                <AppSwitcher apps={data.apps} />
            </SidebarHeader>
            <SidebarContent className="gap-0">
                <SidebarGroup className="grid grid-cols-2 grid-rows-2 w-full gap-2">
                    {hotMenuItems.map((item) => (
                        <Item {...item} key={item.to} />
                    ))}
                </SidebarGroup>
                <ModeToggle />
                <ProjectsList />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
