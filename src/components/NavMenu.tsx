import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import type { User } from "../types";
import { useLogout } from "../hooks/useAuth";

type NameMenuProps = {
  name: User["name"];
};

export default function NavMenu({ name }: NameMenuProps) {
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 p-2 rounded-lg bg-[#1e293b] border border-gray-600 hover:bg-gray-700 transition-colors duration-200 shadow-md">
        <Bars3Icon className="w-6 h-6 text-gray-200" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-3 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-64 shrink rounded-xl bg-[#1e293b] border border-gray-600 p-1 text-sm font-medium shadow-xl ring-1 ring-gray-600/50">
            {/* Header con saludo */}
            <div className="px-4 py-3 border-b border-gray-600">
              <p className="text-center text-gray-200 font-semibold">
                Hello, <span className="text-emerald-400">{name}</span>
              </p>
            </div>

            {/* Menu items */}
            <div className="py-2">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-emerald-400 transition-all duration-200 rounded-lg mx-1"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                My Profile
              </Link>

              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-emerald-400 transition-all duration-200 rounded-lg mx-1"
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                My Projects
              </Link>

              {/* Separador */}
              <div className="border-t border-gray-600 my-2 mx-1"></div>

              <button
                className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 rounded-lg mx-1"
                type="button"
                onClick={handleLogout}
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Log Out
              </button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
