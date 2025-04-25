import { useMemo, useState } from "react";
import { DataInput } from "./jmespath/components/DataInput";
import { ExpressionInput } from "./jmespath/components/ExpressionInput";
import jmespath from "jmespath";

function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState(
    JSON.stringify(
      {
        test: "test",
        child: { test: "test", child: { test: "test" } },
      },
      null,
      2,
    ),
  );

  const result = useMemo(() => {
    if (!value) {
      return "";
    }

    console.log(data, value);

    try {
      return jmespath.search(JSON.parse(data), value);
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [data, value]);

  console.log(result);

  return (
    <div className="flex flex-col w-full justify-center items-center h-screen gap-4">
      <h1>Epic Editor</h1>
      <div className="flex flex-row w-full justify-center items-center gap-4">
        <DataInput value={data} setValue={setData} />
        <ExpressionInput setValue={setValue} />
        <div className="flex flex-col w-2xl justify-center items-center gap-4">
          <h2>Result</h2>
          <div className="w-full h-20 bg-gray-200 rounded-md border-2 border-gray-600">
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
