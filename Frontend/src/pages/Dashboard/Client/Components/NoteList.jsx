import React from "react";
import useFetchNotes from "../../../../hooks/useFetchNotes"; // We'll create this hook
import NoteCard from "../Components/LawyerNotes";

const NoteList = () => {
  const { notes, loading } = useFetchNotes();

  return (
    <div
      className="bg-white text-gray-900 rounded-xl shadow-sm p-6 max-w-lg mx-auto h-[550px]"
      aria-labelledby="notes-header"
    >
      {/* Header with Purple Dot Indicator */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
          <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(147,51,234,0.3)]"></span>
        </div>
        <h2
          id="notes-header"
          className="text-xl font-semibold text-gray-800"
        >
          LAWYER NOTES
        </h2>
      </div>

      {/* Divider with Animation */}
      <div className="h-[5px] bg-purple-500 w-113 rounded-full my-4 transition-all duration-300 hover:w-113 hover:bg-purple-300"></div>

      {/* Loading State */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-100 rounded-xl p-4"
              role="status"
              aria-label="Loading note"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : notes.length > 0 ? (
        // Notes List with Scrollable Container
        <div
          className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide hover:scrollbar-default"
          aria-label="Notes list"
        >
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      ) : (
        // Enhanced Empty State
        <div
          className="text-center py-8 bg-gray-50 rounded-xl"
          role="alert"
          aria-live="polite"
        >
          <p className="text-gray-600 text-sm">
            No notes found.
            <span className="block mt-2 text-xs text-gray-500">
              Notes will appear here once added.
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default NoteList;