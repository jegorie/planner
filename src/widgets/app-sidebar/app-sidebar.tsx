import {
    CalendarDaysIcon,
    ChevronRight,
    InboxIcon,
    StarIcon,
    TagIcon,
} from "lucide-react";

import { AppSwitcher } from "./app-switcher";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/shared/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/shared/ui/sidebar";
import { cn } from "@/shared/lib/utils";
import type { ReactNode } from "react";
import { ModeToggle } from "@/shared/ui/mode-toggle";
import { Link } from "@tanstack/react-router";

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

const itemsArr: {
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
        <Sidebar {...props}>
            <SidebarHeader>
                <AppSwitcher apps={data.apps} />
            </SidebarHeader>
            <SidebarContent className="gap-0">
                <SidebarGroup className="grid grid-cols-2 grid-rows-2 w-full gap-2">
                    {itemsArr.map((item) => (
                        <Item {...item} key={item.to} />
                    ))}
                </SidebarGroup>
                <ModeToggle />
                {data.navMain.map((item) => (
                    <Collapsible
                        key={item.title}
                        title={item.title}
                        defaultOpen
                        className="group/collapsible"
                    >
                        <SidebarGroup>
                            <SidebarGroupLabel
                                asChild
                                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                            >
                                <CollapsibleTrigger>
                                    {item.title}{" "}
                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent
                                className={cn(
                                    "text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                                )}
                            >
                                <SidebarGroupContent>
                                    <SidebarMenuSub>
                                        {item.items.map((item) => (
                                            <SidebarMenuSubItem
                                                key={item.title}
                                            >
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={item.isActive}
                                                >
                                                    <a href={item.url}>
                                                        {item.title}
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
