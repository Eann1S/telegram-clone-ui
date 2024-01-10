
export const SubmitButton = ({ text }: { text: string }) => {
  return (
    <button
      type="submit"
      className="text-purple-700 text-md font-semibold p-2 rounded-lg ring-1 ring-gray-100 hover:bg-indigo-100 focus:bg-indigo-200"
    >
      {text}
    </button>
  );
};


