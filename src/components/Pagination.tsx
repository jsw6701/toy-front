
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If total pages are less than max pages to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate start and end of middle pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(start + maxPagesToShow - 3, totalPages - 1);
      
      // Adjust start if we're near the end
      if (end === totalPages - 1) {
        start = Math.max(2, end - (maxPagesToShow - 3));
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push("...");
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <nav className="flex justify-center items-center space-x-3 py-12">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`pagination-link flex items-center justify-center border border-border hover:border-primary/50 transition-all duration-300 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Previous Page"
      >
        <ChevronLeft size={18} />
      </button>
      
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className="px-2 text-muted-foreground">•••</span>
          ) : (
            <button
              onClick={() => typeof page === "number" && onPageChange(page)}
              className={`pagination-link relative overflow-hidden ${
                currentPage === page 
                  ? "pagination-link-active font-medium" 
                  : "hover:text-primary border border-border hover:border-primary/50 transition-all duration-300"
              }`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
              {currentPage === page && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-post-violet to-post-blue"></span>
              )}
            </button>
          )}
        </React.Fragment>
      ))}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`pagination-link flex items-center justify-center border border-border hover:border-primary/50 transition-all duration-300 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Next Page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
};

export default Pagination;
