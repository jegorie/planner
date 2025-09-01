import { useState, useMemo } from "react";
import { useStore } from "jotai";
import { Plus, X } from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
} from "@/shared/ui/sidebar";
import { Button } from "@/shared/ui/button";
import { useProjectsSync } from "@/entities/projects/hooks/use-projects-sync";
import { ProjectDialog } from "@/features/project-management/ui/create-edit-project-dialog";
import { ProjectItem } from "./project-item";
import { Input } from "@/shared/ui/input";
import { useNavigate, useParams } from "@tanstack/react-router";

export const ProjectsList: React.FC = () => {
    const [search, setSearch] = useState("");
    const { projects: projectsAtoms } = useProjectsSync();
    const store = useStore();
    const navigate = useNavigate();
    const params = useParams({ strict: false });
    const currentProjectId = params.projectId;
    
    const projects = useMemo(() => {
        return projectsAtoms.map((projectAtom) => store.get(projectAtom));
    }, [store.get, projectsAtoms]);

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    
    const handleSelectProject = (projectId: string) => {
        navigate({ to: "/$projectId", params: { projectId } });
    };

    const filteredProjects = search.length
        ? projects.filter((project) =>
              project.title.toLowerCase().includes(search.toLowerCase()),
          )
        : projects;

    return (
        <>
            <SidebarGroup>
                <SidebarGroupLabel className="flex justify-between">
                    <span>Projects</span>
                    <Button
                        size={"sm"}
                        variant={"ghost"}
                        className="hover:bg-transparent"
                        onClick={() => setIsCreateDialogOpen(true)}
                    >
                        <Plus />
                    </Button>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <div className="relative mb-2">
                        <Input
                            placeholder="Search projects"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            className="pr-7"
                        />
                        {search && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
                                onClick={() => setSearch("")}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        )}
                    </div>
                    <SidebarMenu>
                        {filteredProjects.length === 0 && search ? (
                            <div className="flex flex-col items-center px-2 py-4 text-sm text-muted-foreground">
                                No projects found :(
                            </div>
                        ) : (
                            filteredProjects.map((project) => {
                                const projectAtom = projectsAtoms.find(
                                    (atom) => store.get(atom).id === project.id,
                                );
                                if (!projectAtom) return null;
                                return (
                                    <ProjectItem
                                        key={project.id}
                                        projectAtom={projectAtom}
                                        isActive={
                                            project.id === currentProjectId
                                        }
                                        onSelect={handleSelectProject}
                                    />
                                );
                            })
                        )}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

            <ProjectDialog
                isOpen={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
            />
        </>
    );
};
