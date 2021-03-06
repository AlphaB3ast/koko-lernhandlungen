import * as React from "react";

interface Person {
  firstName: string;
  lastName: string;
}

interface Props {
  text: string;
  ok?: boolean;
  i?: number;
  fn?: (bob: string) => void | number | string;
  obj?: {
    f1: string;
  };
  person: Person;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement> | undefined
  ) => void;
}

interface TextNode {
  text: string;
}

export const TextField: React.FC<Props> = ({ handleChange }) => {
  const [count, setCount] = React.useState<TextNode>({ text: "hello" });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const divRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef}>
      <input ref={inputRef} onChange={handleChange} />
    </div>
  );
};
