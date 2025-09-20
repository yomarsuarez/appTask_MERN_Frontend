import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProjectForm from "@/components/projects/ProjectForm";
import type { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";

export default function CreateProjectView() {
  const navigate = useNavigate();

  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    mutation.mutateAsync(formData);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-600 mb-3">
            Create Project
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-600">
            Fill out the form to create a{" "}
            <span className="text-emerald-400 font-semibold">new project</span>
          </p>
        </div>

        {/* Navigation */}
        <nav className="mb-8">
          <Link
            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 text-gray-200 hover:text-white font-semibold rounded-lg transition-all duration-300 border border-gray-600"
            to="/"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Projects
          </Link>
        </nav>

        {/* Form */}
        <form
          className="bg-[#1e293b] border border-gray-600 shadow-xl p-8 rounded-xl"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <div className="space-y-6">
            <ProjectForm register={register} errors={errors} />

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 p-3 text-white font-bold text-lg rounded-lg cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Create Project
              </button>
            </div>
          </div>
        </form>

        {/* Optional: Additional info or tips */}
        <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-emerald-400">Pro tip</p>
              <p className="text-sm text-gray-300 mt-1">
                Choose a descriptive project name and clear description to help
                your team understand the project scope.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
