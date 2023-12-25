export function AuthFormInputContainer({
  inputName,
  errorMessage,
  children,
}: {
  inputName: string;
  errorMessage?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <span className="text-sm font-medium block">{inputName}</span>
      {children}
      <p className="ml-2 text-xs font-medium text-red-500">{errorMessage}</p>
    </div>
  );
}
