export type Project = {
    id: string;
    title: string;
    isInbox: boolean;
    createdAt: string;
    updatedAt: string;
    members: ProjectMember[];
};

export type ProjectMember = {
    userId: string;
    role: "OWNER" | "EDITOR" | "VIEWER";
    userEmail: string;
};
