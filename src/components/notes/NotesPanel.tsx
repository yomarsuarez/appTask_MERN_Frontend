import AddNoteForm from "./AddNoteForm";
import type { Task } from "@/types/index";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
  notes: Task["notes"];
};

export default function NotesPanel({ notes }: NotesPanelProps) {
  return (
    <>
      <AddNoteForm />

      <div className="mt-8">
        {notes.length ? (
          <>
            <div className="flex items-center gap-2 mb-6">
              <svg
                className="w-5 h-5 text-emerald-400"
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
              <h4 className="font-bold text-xl text-white">Notes</h4>
              <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-sm font-medium">
                {notes.length}
              </span>
            </div>

            <div className="space-y-4">
              {notes.map((note) => (
                <NoteDetail key={note._id} note={note} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="flex flex-col items-center gap-3">
              <svg
                className="w-12 h-12 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <p className="text-gray-400 font-medium">No notes yet</p>
              <p className="text-sm text-gray-500">
                Add your first note to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
