import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePasswordWithToken } from "@/api/AuthAPI";

type NewPasswordFormProps = {
  token: ConfirmToken["token"];
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate();
  const initialValues: NewPasswordForm = {
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate("/auth/login");
    },
  });

  const handleNewPassword = (formData: NewPasswordForm) => {
    const data = { formData, token };
    mutate(data);
  };

  const password = watch("password");

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-8 p-10 bg-gray-800 mt-10 rounded-lg shadow-xl border border-gray-700"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl text-gray-400">Password</label>

          <input
            type="password"
            placeholder="Registration Password"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "The password must be at least 8 characters long.",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl text-gray-400">
            Repeat Password
          </label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repeat Registration Password"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200"
            {...register("password_confirmation", {
              required: "Repeat Password is mandatory",
              validate: (value) =>
                value === password || "Passwords are not the same",
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Set Password"
          className="bg-emerald-500 hover:bg-emerald-600 w-full p-3 text-white font-black text-xl cursor-pointer rounded-lg transition-colors duration-200 shadow-md"
        />
      </form>
    </>
  );
}
