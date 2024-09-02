type TComponent = {
  name: string;
  type: string;
  data: Record<string, unknown>;
  onAdd?: () => void;
};

export type { TComponent };
