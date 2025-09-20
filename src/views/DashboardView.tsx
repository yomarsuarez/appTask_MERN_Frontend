import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/ProjectAPI";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import DeleteProjectModal from "@/components/projects/DeleteProjectModal";

export default function DashboardView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user, isLoading: authLoading } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading && authLoading) return "Loading...";
  if (data && user)
    return (
      <>
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-700 mb-3">
            My Projects
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-600">
            Manage and administer your projects efficiently
          </p>
        </div>

        <nav className="mb-8">
          <Link
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-6 py-3 text-white font-bold rounded-lg transition-all duration-300 shadow-md"
            to="projects/create"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Project
          </Link>
        </nav>

        {data.length ? (
          <div className="space-y-6 mt-10">
            {data.map((project) => (
              <div
                key={project._id}
                className="bg-[#1e293b] border border-gray-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    {/* Badge de rol */}
                    <div className="mb-4">
                      {isManager(project.manager, user._id) ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Manager
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Team Member
                        </span>
                      )}
                    </div>

                    {/* Información del proyecto */}
                    <div className="space-y-3">
                      <Link
                        to={`/projects/${project._id}`}
                        className="block text-white hover:text-emerald-400 cursor-pointer transition-colors duration-200"
                      >
                        <h3 className="text-2xl font-bold mb-1">
                          {project.projectName}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
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
                          <span className="font-medium text-gray-300">
                            Client:
                          </span>
                          <span className="text-emerald-400 font-semibold">
                            {project.clientName}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Menu de opciones */}
                  <div className="ml-4 flex-shrink-0">
                    <Menu as="div" className="relative">
                      <Menu.Button className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                        <span className="sr-only">Options</span>
                        <EllipsisVerticalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-gray-800 py-2 shadow-xl ring-1 ring-gray-600 focus:outline-none">
                          <Menu.Item>
                            <Link
                              to={`/projects/${project._id}`}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-emerald-400 transition-colors"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              View Project
                            </Link>
                          </Menu.Item>
                          {isManager(project.manager, user._id) && (
                            <>
                              <Menu.Item>
                                <Link
                                  to={`/projects/${project._id}/edit`}
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-emerald-400 transition-colors"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                  </svg>
                                  Edit Project
                                </Link>
                              </Menu.Item>
                              <div className="border-t border-gray-600 my-1"></div>
                              <Menu.Item>
                                <button
                                  type="button"
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                                  onClick={() =>
                                    navigate(
                                      location.pathname +
                                        `?deleteProject=${project._id}`
                                    )
                                  }
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                  Delete Project
                                </button>
                              </Menu.Item>
                            </>
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#1e293b] rounded-xl border-2 border-dashed border-gray-600">
            <div className="mx-auto max-w-md">
              <svg
                className="mx-auto h-16 w-16 text-gray-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="text-lg font-bold text-white mb-2">
                No projects yet
              </h3>
              <p className="text-gray-300 mb-6">
                Get started by creating your first project
              </p>
              <Link
                to="projects/create"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-6 py-3 text-white font-bold rounded-lg transition-all duration-300 shadow-md"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Project
              </Link>
            </div>
          </div>
        )}

        <DeleteProjectModal />
      </>
    );
}
