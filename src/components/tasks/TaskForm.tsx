import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TaskFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";

type TaskFormProps = {
  errors: FieldErrors<TaskFormData>;
  register: UseFormRegister<TaskFormData>;
};

export default function TaskForm({ errors, register }: TaskFormProps) {
  return (
    <>
      {/* Task Name */}
      <div className="mb-6 space-y-2">
        <label
          htmlFor="name"
          className="font-medium text-sm text-gray-200 tracking-wide"
        >
          Task Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter task name"
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          {...register("name", {
            required: "Name of the task is required",
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      {/* Task Description */}
      <div className="mb-6 space-y-2">
        <label
          htmlFor="description"
          className="font-medium text-sm text-gray-200 tracking-wide"
        >
          Task Description
        </label>
        <textarea
          id="description"
          placeholder="Describe the task objectives, requirements, and acceptance criteria..."
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-vertical"
          {...register("description", {
            required: "Description of the task is required",
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
