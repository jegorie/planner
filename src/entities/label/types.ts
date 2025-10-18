export type Label = {
    id: string;
    title: string;
    color: AvailableColors;
};

export type UpdateLabel = Partial<Omit<Label, "id">>;

export type AvailableColors = "ORANGE" | "NONE";
