import type { Project, ProjectFormData } from "@/types/index";
import ProjectForm from "./ProjectForm";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
  data: ProjectFormData;
  projectId: Project["_id"];
};

export default function EditProjectForm({
  data,
  projectId,
}: EditProjectFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    const data = { formData, projectId };
    mutate(data);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-600">
          Edit project
        </h1>
        <p className="text-lg md:text-xl font-light text-gray-600 mt-5">
          Fill out the form to Edit a project
        </p>
        <nav className="my-5">
          <Link
            className="bg-gray-700 hover:bg-gray-600 px-10 py-3 text-gray-200 text-lg font-bold rounded-lg cursor-pointer transition-colors duration-200"
            to="/"
          >
            Come back to projects
          </Link>
        </nav>
        <form
          className="mt-10 bg-gray-800 shadow-xl p-10 rounded-lg border border-gray-700"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value="Save changes"
            className="bg-emerald-500 hover:bg-emerald-600 w-full p-3 text-white uppercase font-bold cursor-pointer rounded-lg transition-colors duration-200 shadow-md"
          />
        </form>
      </div>
    </>
  );
}
