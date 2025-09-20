import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import AddMemberModal from "@/components/team/AddMemberModal";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectTeam, removeUserFromProject } from "@/api/TeamAPI";
import { toast } from "react-toastify";

export default function ProjectTeamView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectTeam", projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false,
  });
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: removeUserFromProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
    },
  });

  if (isLoading) return "Loading...";
  if (isError) return <Navigate to={"/404"} />;
  if (data)
    return (
      <>
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-600 mb-3">
            Manage Work Team
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-600">
            Manage the work team for{" "}
            <span className="text-emerald-400 font-semibold">this project</span>
          </p>
        </div>

        {/* Navigation */}
        <nav className="mb-10 flex flex-wrap gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-6 py-3 text-white font-bold rounded-lg cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={() => navigate(location.pathname + "?addMember=true")}
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Team Member
          </button>
          <Link
            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 text-gray-200 hover:text-white font-semibold rounded-lg cursor-pointer transition-all duration-300 border border-gray-600"
            to={`/projects/${projectId}`}
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Project
          </Link>
        </nav>

        {/* Current Members Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <svg
              className="w-6 h-6 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.196-2.196m0 0L16 17m-2-3a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <h2 className="text-3xl font-bold text-white">Current Members</h2>
            {data.length > 0 && (
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                {data.length}
              </span>
            )}
          </div>

          {data.length ? (
            <div className="space-y-4">
              {data?.map((member) => (
                <div
                  key={member._id}
                  className="bg-[#1e293b] border border-gray-600 rounded-lg p-6 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar placeholder */}
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-emerald-400"
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
                    </div>

                    <div className="min-w-0 flex-auto">
                      <p className="text-xl font-bold text-white mb-1">
                        {member.name}
                      </p>
                      <p className="text-sm text-gray-400">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Menu as="div" className="relative">
                      <Menu.Button className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors duration-150">
                        <span className="sr-only">Member options</span>
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
                            <button
                              type="button"
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                              onClick={() =>
                                mutate({ projectId, userId: member._id })
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
                              Remove from team
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
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
                    d="M17 20h5v-2a3 3 0 00-5.196-2.196m0 0L16 17m-2-3a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <h3 className="text-lg font-bold text-white mb-2">
                  No team members yet
                </h3>
                <p className="text-gray-300 mb-6">
                  Add your first team member to start collaborating
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-6 py-3 text-white font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={() =>
                    navigate(location.pathname + "?addMember=true")
                  }
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add First Member
                </button>
              </div>
            </div>
          )}
        </div>

        <AddMemberModal />
      </>
    );
}
