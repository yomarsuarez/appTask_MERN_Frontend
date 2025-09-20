import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFullProject } from "@/api/ProjectAPI";
import AddTaskModal from "../../components/tasks/AddTaskModal";
import TaskList from "../../components/tasks/TaskList";
import EditTaskData from "../../components/tasks/EditTaskData";
import TaskModalDetails from "../../components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useMemo } from "react";

export default function ProjectDetailsView() {
  const { data: user, isLoading: authLoading } = useAuth();

  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getFullProject(projectId),
    retry: false,
  });
  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);

  if (isLoading && authLoading) return "Loading...";
  if (isError) return <Navigate to="/404" />;

  if (data && user)
    return (
      <>
        {/* Project Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-600 mb-3">
            {data.projectName}
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-600 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Manager Actions */}
        {isManager(data.manager, user._id) && (
          <nav className="mb-8 flex flex-wrap gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-6 py-3 text-white font-bold rounded-lg cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => navigate(location.pathname + "?newTask=true")}
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
              Add Task
            </button>

            <Link
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-bold rounded-lg cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg"
              to={"team"}
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
                  d="M17 20h5v-2a3 3 0 00-5.196-2.196m0 0L16 17m-2-3a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Team Members
            </Link>
          </nav>
        )}

        {/* Task List Section */}
        <div className="bg-[#1e293b] border border-gray-600 rounded-xl shadow-lg p-6 mb-6">
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
                d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-white">Project Tasks</h2>
          </div>

          <TaskList tasks={data.tasks} canEdit={canEdit} />
        </div>

        {/* Quick Stats (Optional enhancement) */}
        {data.tasks && data.tasks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-emerald-400">
                  Completed
                </span>
              </div>
              <p className="text-2xl font-bold text-white mt-1">
                {
                  data.tasks.filter((task) => task.status === "completed")
                    .length
                }
              </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-yellow-400">
                  In Progress
                </span>
              </div>
              <p className="text-2xl font-bold text-white mt-1">
                {data.tasks.filter((task) => task.status === "pending").length}
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-blue-400">
                  Total Tasks
                </span>
              </div>
              <p className="text-2xl font-bold text-white mt-1">
                {data.tasks.length}
              </p>
            </div>
          </div>
        )}

        {/* Modals */}
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
