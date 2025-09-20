import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import type { UpdateCurrentUserPasswordForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/api/ProfileAPI";
import { toast } from "react-toastify";

export default function ChangePasswordView() {
  const initialValues: UpdateCurrentUserPasswordForm = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  const password = watch("password");

  const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) => {
    mutate(formData);
  };

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-600">
          Change Password
        </h1>
        <p className="text-lg md:text-xl font-light text-gray-600 mt-5">
          Use this form to change your password.
        </p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="mt-14 space-y-5 bg-gray-800 shadow-xl p-10 rounded-lg border border-gray-700"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold text-gray-400"
              htmlFor="current_password"
            >
              Current Password
            </label>
            <input
              id="current_password"
              type="password"
              placeholder="Current Password"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200"
              {...register("current_password", {
                required: "Current password is required",
              })}
            />
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold text-gray-400"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="New Password"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200"
              {...register("password", {
                required: "New Password is required",
                minLength: {
                  value: 8,
                  message: "New Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label
              htmlFor="password_confirmation"
              className="text-sm uppercase font-bold text-gray-400"
            >
              Repeat New Password
            </label>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repeat New Password"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200"
              {...register("password_confirmation", {
                required: "Repeat New Password is required",
                validate: (value) =>
                  value === password || "The passwords do not match",
              })}
            />
            {errors.password_confirmation && (
              <ErrorMessage>
                {errors.password_confirmation.message}
              </ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value="Change password"
            className="bg-emerald-500 w-full p-3 text-white uppercase font-bold hover:bg-emerald-600 cursor-pointer rounded-lg transition-colors duration-200 shadow-md"
          />
        </form>
      </div>
    </>
  );
}
