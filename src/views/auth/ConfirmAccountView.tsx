import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { ConfirmToken } from "@/types/index";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");

  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/auth/login");
    },
  });

  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };

  const handleComplete = (token: ConfirmToken["token"]) => {
    mutate({ token });
  };

  return (
    <>
      <h1 className="text-4xl md:text-5xl font-extrabold text-white">
        Confirm your account
      </h1>
      <p className="text-lg md:text-xl font-light text-gray-400 mt-5">
        Enter the code you received {""}
        <span className=" text-emerald-400 font-bold"> by e-mail</span>
      </p>
      <form className="space-y-8 p-10 bg-gray-800 mt-10 rounded-lg shadow-xl border border-gray-700">
        <label className="font-normal text-2xl text-center block text-white">
          6-digit code
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-12 h-12 p-3 text-2xl text-center rounded-lg border-gray-600 border bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200" />
            <PinInputField className="w-12 h-12 p-3 text-2xl text-center rounded-lg border-gray-600 border bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200" />
            <PinInputField className="w-12 h-12 p-3 text-2xl text-center rounded-lg border-gray-600 border bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200" />
            <PinInputField className="w-12 h-12 p-3 text-2xl text-center rounded-lg border-gray-600 border bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200" />
            <PinInputField className="w-12 h-12 p-3 text-2xl text-center rounded-lg border-gray-600 border bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200" />
            <PinInputField className="w-12 h-12 p-3 text-2xl text-center rounded-lg border-gray-600 border bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200" />
          </PinInput>
        </div>
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/request-code"
          className="text-center text-gray-300 font-normal hover:text-gray-100 transition-colors duration-200"
        >
          Request a new Code
        </Link>
      </nav>
    </>
  );
}
