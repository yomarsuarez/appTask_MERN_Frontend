import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 className="font-extrabold text-center text-4xl text-white">
        Page not found
      </h1>
      <p className="mt-5 text-center text-gray-400">
        Do you want to return to{" "}
        <Link
          className="text-emerald-400 font-bold hover:text-emerald-500 transition-colors duration-200"
          to={"/"}
        >
          Projects
        </Link>
      </p>
    </>
  );
}
