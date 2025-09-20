import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { ForgotPasswordForm } from "../../types";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const handleForgotPassword = (formData: ForgotPasswordForm) => {
    mutate(formData);
  };

  return (
    <>
      {/* Título */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white">
        Reset your password
      </h1>

      <p className="text-lg md:text-2xl font-light text-center text-gray-300 mt-4">
        Forgot your password? Enter your email and
        <span className="text-emerald-400 font-semibold"> reset it</span>
      </p>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-6 p-8 mt-8 bg-[#1e293b] rounded-xl shadow-lg"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-gray-200" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your registration email"
            className={`w-full p-3 rounded-lg bg-gray-800 border text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors.email ? "border-red-500" : "border-gray-600"
            }`}
            {...register("email", {
              required: "Registration Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid Email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg transition-all duration-300 shadow-md"
        >
          Send Instructions
        </button>
      </form>

      {/* Navegación */}
      <nav className="mt-6 flex flex-col space-y-3">
        <Link
          to="/auth/login"
          className="text-center text-gray-300 text-sm hover:text-emerald-400 transition-colors"
        >
          Already have an account?{" "}
          <span className="font-semibold">Sign in</span>
        </Link>

        <Link
          to="/auth/register"
          className="text-center text-gray-300 text-sm hover:text-emerald-400 transition-colors"
        >
          Don’t have an account?{" "}
          <span className="font-semibold">Create one</span>
        </Link>
      </nav>
    </>
  );
}
