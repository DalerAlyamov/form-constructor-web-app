declare namespace IIcon {
  interface svgList {
    checkbox: React.ReactNode;
    checkBoxOutlineBlank: React.ReactNode;
    visibility: React.ReactNode;
    visibilityOff: React.ReactNode;
  }

  type name = keyof svgList;

  interface props {
    name: name;
    size?: number;
    className?: string;
  }
}

export default IIcon;
