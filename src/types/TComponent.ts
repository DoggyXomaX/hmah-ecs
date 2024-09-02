type TComponent = {
  name: string;
  type: string;
  data: Record<string, any>; // Is this safe?
  onAdd?: () => void;
};

export type { TComponent };
