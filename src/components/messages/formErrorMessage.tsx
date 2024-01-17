export const FormErrorMessage = ({
  errorMessage,
}: {
  errorMessage?: string;
}) => {
  return (
    <p className="text-xs font-normal text-destructive">{errorMessage}</p>
  );
};
