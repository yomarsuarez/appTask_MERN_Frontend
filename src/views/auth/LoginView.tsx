import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
  });

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData);
  };

  return (
    <>
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white">
        Login
      </h1>
      <p className="text-lg md:text-2xl font-light text-center text-gray-300 mt-4">
        Start planning your projects by{" "}
        <span className="text-emerald-400 font-semibold">
          logging in using this form.
        </span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-6 p-8 mt-8 bg-[#1e293b] rounded-xl shadow-lg"
        noValidate
      >
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-medium text-sm text-gray-200 tracking-wide"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="font-medium text-sm text-gray-200 tracking-wide"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg transition-all duration-300 shadow-md"
        >
          Login
        </button>
      </form>

      {/* Navigation */}
      <nav className="mt-6 flex flex-col space-y-3">
        <Link
          to={"/auth/register"}
          className="text-center text-gray-300 text-sm hover:text-emerald-400 transition-colors"
        >
          Don’t have an account?{" "}
          <span className="font-semibold">Create one</span>
        </Link>
        <Link
          to={"/auth/forgot-password"}
          className="text-center text-gray-300 text-sm hover:text-emerald-400 transition-colors"
        >
          Forgot your password? <span className="font-semibold">Reset</span>
        </Link>
      </nav>
    </>
  );
}
