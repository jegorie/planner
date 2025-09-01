import { ChevronsUpDown, GalleryVerticalEnd } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/ui/sidebar";

type Props = {
    apps: string[];
};

export function AppSwitcher({ apps }: Props) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <GalleryVerticalEnd className="size-4" />
                            </div>
                            <div className="flex flex-col gap-0.5 leading-none">
                                <span className="font-medium">MindKeeper</span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width)"
                        align="start"
                    >
                        {apps.map((app) => (
                            <DropdownMenuItem
                                key={app}
                                //onSelect={() => setSelectedVersion(version)}
                            >
                                {app}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
