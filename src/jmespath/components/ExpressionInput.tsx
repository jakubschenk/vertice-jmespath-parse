import { forwardRef, memo, useEffect, useRef, useState } from "react";
import { Highlight } from "./Highlight";
import { jmesPathParseToTree } from "../utils/jmesPathParseToTree";
import { highlightJmespath } from "../utils/jmesPathHighlighter";

export const ExpressionInput = ({
  setValue,
}: {
  setValue: (value: string) => void;
}) => {
  const [innerValue, setInnerValue] = useState("");
  const [scrollValue, setScrollValue] = useState(0);
  const keyWordsRef = useRef<HTMLDivElement>(null);

  const parsedTokens = highlightJmespath(
    innerValue,
    jmesPathParseToTree(innerValue),
  );

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInnerValue(e.target.value);
    setValue(e.target.value);
  };
  const scrollHandler = (e: React.UIEvent<HTMLTextAreaElement>) => {
    setScrollValue(e.currentTarget.scrollLeft);
  };

  useEffect(() => {
    if (keyWordsRef.current) {
      keyWordsRef.current.scrollLeft = scrollValue;
    }
  }, [scrollValue, keyWordsRef]);

  return (
    <div className="relative">
      <div
        ref={keyWordsRef}
        className="w-96 h-10 whitespace-nowrap py-2 m-0.5 px-3 [&::-webkit-scrollbar]:hidden flex items-center absolute overflow-x-scroll top-0 left-0"
      >
        {parsedTokens ? (
          parsedTokens.map((token) => (
            <Highlight
              key={Math.floor(Math.random() * parsedTokens.length * 1000)}
              variant={token.variant}
              text={token.char}
            />
          ))
        ) : (
          <span>{innerValue}</span>
        )}
      </div>
      <textarea
        className="border-2 border-gray-600 rounded-md w-96 h-10 whitespace-nowrap py-2 px-3 [&::-webkit-scrollbar]:hidden bg-transparent color-transparent resize-none relative align-middle caret-blue-200"
        value={innerValue}
        onChange={changeHandler}
        onScroll={scrollHandler}
        onDrag={scrollHandler}
        rows={1}
      />
    </div>
  );
};

const MemoInput = memo(forwardRef(ExpressionInput));

export default MemoInput;
