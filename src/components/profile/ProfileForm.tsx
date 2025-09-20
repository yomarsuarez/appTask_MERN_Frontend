import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { User, UserProfileForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/api/ProfileAPI";
import { toast } from "react-toastify";

type ProfileFormProps = {
  data: User;
};

export default function ProfileForm({ data }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileForm>({ defaultValues: data });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleEditProfile = (formData: UserProfileForm) => {
    mutate(formData);
  };

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-600">
          My Profile
        </h1>
        <p className="text-lg md:text-xl font-light text-gray-600 mt-5">
          Here you can update your information
        </p>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className="mt-14 space-y-5 bg-gray-800 shadow-xl p-10 rounded-lg border border-gray-700"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold text-gray-400"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200"
              {...register("name", {
                required: "Username is required",
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold text-gray-400"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid E-mail",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          {/* Botón con el estilo unificado */}
          <input
            type="submit"
            value="Save Changes"
            className="bg-emerald-500 w-full p-3 text-white uppercase font-bold hover:bg-emerald-600 cursor-pointer rounded-lg transition-colors duration-200 shadow-md"
          />
        </form>
      </div>
    </>
  );
}
