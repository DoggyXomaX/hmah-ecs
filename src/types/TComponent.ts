type TComponent = {
  name: string;
  data: Record<string, any>; // Is this safe?
  onAdd?: () => void;
};

export type { TComponent };
