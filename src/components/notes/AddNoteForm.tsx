import type { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

export default function AddNoteForm() {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTask")!;

  const initialValues: NoteFormData = {
    content: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      toast.success(data);
      reset();
    },
  });

  const handleAddNote = (formData: NoteFormData) => {
    mutate({ projectId, taskId, formData });
  };
  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-6"
      noValidate
    >
      <div className="space-y-2">
        <label
          className="font-medium text-sm text-gray-200 tracking-wide"
          htmlFor="content"
        >
          Create Note
        </label>
        <input
          type="text"
          id="content"
          placeholder="Enter your note content..."
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          {...register("content", { required: "Content is required" })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-emerald-500 hover:bg-emerald-600 p-3 text-white font-bold rounded-lg cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Create Note
      </button>
    </form>
  );
}
