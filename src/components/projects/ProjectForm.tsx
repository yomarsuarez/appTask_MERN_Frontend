import type { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { ProjectFormData } from "types";

type ProjectFormProps = {
  register: UseFormRegister<ProjectFormData>;
  errors: FieldErrors<ProjectFormData>;
};

export default function ProjectForm({ errors, register }: ProjectFormProps) {
  return (
    <>
      <div className="mb-6 space-y-2">
        <label
          htmlFor="projectName"
          className="font-medium text-sm text-gray-200 tracking-wide"
        >
          Project Name
        </label>
        <input
          id="projectName"
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          type="text"
          placeholder="Enter project name"
          {...register("projectName", {
            required: "The Project Title is mandatory",
          })}
        />

        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>

      {/* Client Name */}
      <div className="mb-6 space-y-2">
        <label
          htmlFor="clientName"
          className="font-medium text-sm text-gray-200 tracking-wide"
        >
          Client Name
        </label>
        <input
          id="clientName"
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          type="text"
          placeholder="Enter client name"
          {...register("clientName", {
            required: "Client name is required",
          })}
        />

        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      {/* Description */}
      <div className="mb-6 space-y-2">
        <label
          htmlFor="description"
          className="font-medium text-sm text-gray-200 tracking-wide"
        >
          Project Description
        </label>
        <textarea
          id="description"
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-vertical"
          placeholder="Describe your project goals, scope, and key requirements..."
          {...register("description", {
            required: "Project Description is Required",
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
