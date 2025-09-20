import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import type { TeamMemberForm } from "@/types/index";
import { findUserByEmail } from "@/api/TeamAPI";
import SearchResults from "./SearchResults";

export default function AddMemberForm() {
  const initialValues: TeamMemberForm = {
    email: "",
  };
  const params = useParams();
  const projectId = params.projectId!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: findUserByEmail,
  });

  const handleSearchUser = async (formData: TeamMemberForm) => {
    const data = { projectId, formData };
    mutation.mutate(data);
  };

  const resetData = () => {
    reset();
    mutation.reset();
  };

  return (
    <>
      <form
        className="space-y-6"
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className="space-y-2">
          <label
            className="font-medium text-sm text-gray-200 tracking-wide"
            htmlFor="name"
          >
            User Email
          </label>
          <input
            id="name"
            type="email"
            placeholder="Enter the email of the user to add..."
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid Email",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 p-3 text-white font-bold text-lg rounded-lg cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Search User
        </button>
      </form>

      <div className="mt-8">
        {mutation.isPending && (
          <div className="flex items-center justify-center gap-2 py-6">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-emerald-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-gray-300">Searching user...</span>
          </div>
        )}

        {mutation.error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-red-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-400 font-medium">
                {mutation.error.message}
              </p>
            </div>
          </div>
        )}

        {mutation.data && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mt-4">
            <SearchResults user={mutation.data} reset={resetData} />
          </div>
        )}
      </div>
    </>
  );
}
