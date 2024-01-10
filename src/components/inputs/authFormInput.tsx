import { UseFormRegister } from "react-hook-form";

export function AuthFormInput({
  id,
  type,
  placeholder,
  register,
}: {
  id: string;
  type: string;
  placeholder?: string;
  register: UseFormRegister<any>;
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="block w-full px-3 py-2 bg-gray-100 shadow-sm border border-gray-300 ring-transparent text-gray-900 text-sm rounded-lg hover:ring-1 hover:ring-purple-500 hover:placeholder:text-purple-500 focus:placeholder-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
      {...register(id)}
    />
  );
}
