"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number; // default 5
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 2,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Hitung halaman yang akan ditampilkan
  const visiblePages: number[] = [];
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) visiblePages.push(i);

  return (
    <div className="flex justify-center items-center gap-2 mt-1">
      {/* Tombol Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Prev
      </button>

      {/* Jika halaman tidak mulai dari 1 */}
      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              currentPage === 1
                ? "bg-blue-600 text-white shadow"
                : "bg-white border border-gray-300 hover:bg-blue-50"
            }`}
          >
            1
          </button>
          {start > 2 && <span className="px-1 text-gray-500">...</span>}
        </>
      )}

      {/* Halaman aktif */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            currentPage === page
              ? "bg-blue-600 text-white shadow"
              : "bg-white border border-gray-300 hover:bg-blue-50"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Jika tidak berakhir di totalPages */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-1 text-gray-500">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              currentPage === totalPages
                ? "bg-blue-600 text-white shadow"
                : "bg-white border border-gray-300 hover:bg-blue-50"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Tombol Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
}
