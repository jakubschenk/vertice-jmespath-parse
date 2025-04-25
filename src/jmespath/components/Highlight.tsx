type HighlightProps = {
  text: string;
  variant:
    | "none"
    | "function"
    | "variable"
    | "literal"
    | "number"
    | "quoted"
    | "unquoted"
    | "variable";
};

const COLOR_MAP = {
  none: "#000000",
  function: "#0000FF",
  variable: "#008000",
  literal: "#8000FF",
  number: "#0000FF",
  quoted: "#800080",
  unquoted: "#0000FF",
};

export const Highlight = ({ text, variant }: HighlightProps) => {
  const color = COLOR_MAP[variant];

  if (variant === "none") {
    return <span>{text === " " ? "\u00A0" : text}</span>;
  }

  return (
    <span
      className="relative inline-block z-10 leading-normal font-stretch-100%"
      style={{ color }}
    >
      {text}
    </span>
  );
};
