import { ChevronsUpDown, LogOutIcon, MoonIcon, SunIcon, UserIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { useTheme } from "@/shared/providers/theme-provider";
import { useLogout } from "@/features/logout/use-logout";
import { useState } from "react";

export function ProfileButton() {
    const { theme, setTheme } = useTheme();
    const { mutate: logout, isPending } = useLogout();
    const [open, setOpen] = useState(false);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <UserIcon className="size-4" />
                            </div>
                            <span className="font-medium">Profile</span>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" side="top" className="w-(--radix-dropdown-menu-trigger-width)">
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                {theme === "dark" ? (
                                    <MoonIcon className="mr-2 size-4" />
                                ) : (
                                    <SunIcon className="mr-2 size-4" />
                                )}
                                Theme
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem onSelect={() => setTheme("light")}>
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setTheme("dark")}>
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setTheme("system")}>
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            variant="destructive"
                            disabled={isPending}
                            onSelect={() => {
                                setOpen(false);
                                logout();
                            }}
                        >
                            <LogOutIcon className="mr-2 size-4" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
