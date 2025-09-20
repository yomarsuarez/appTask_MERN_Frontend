import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
      <div className="bg-[#0f172a] min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center">
            <Logo />
          </div>

          <div className="mt-8 bg-[#1e293b] shadow-xl rounded-xl p-8">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
