import t from "./t";

declare namespace animationInput {
  type status = "pending" | "error" | "default";
  interface props {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
    type?: "text" | "password" | "int" | "float";
    status?: status;
    hidden?: boolean;
    errorText?: string | null;
    onVisibilityToggle?: () => void;
  }
}

export default animationInput;
