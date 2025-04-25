type DataInputProps = {
  value: string;
  setValue: (value: string) => void;
};

export const DataInput = ({ value, setValue }: DataInputProps) => {
  return (
    <div>
      <textarea
        className="border-2 w-96 resize-y border-gray-600 rounded-md h-48 whitespace-nowrap py-2 px-3 [&::-webkit-scrollbar]:hidden bg-transparent color-transparent relative align-middle caret-blue-200"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={10}
      />
    </div>
  );
};
