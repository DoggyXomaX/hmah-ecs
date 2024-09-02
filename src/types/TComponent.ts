type TComponent = {
  name: string;
  data: Record<string, unknown>;
  onAdd?: () => void;
};

export type { TComponent };
