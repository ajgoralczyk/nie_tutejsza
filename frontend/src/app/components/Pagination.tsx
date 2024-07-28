'use client'

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export type PaginationButtonProps = {
  children: React.ReactNode,
  url?: string,
  isDisabled?: boolean,
  isCurrent?: boolean,
}

export type PaginationProps = {
  pageCount: number,
}

function PaginationButton(props: PaginationButtonProps) {
  const { children, url, isDisabled, isCurrent } = props;
  const router = useRouter();
  const disabledClassName = isDisabled ? "cursor-default" : "";
  const currentClassName = isCurrent ? "cursor-default bg-black text-white" : "";

  return (
    <button
      onClick={() => url ? router.push(url) : null}
      className={`w-8 h-8 rounded ${disabledClassName} ${currentClassName}`}
      aria-disabled={isDisabled}
      disabled={isDisabled}
    >
      {children}
    </button>
  );

}

export default function Pagination(props: PaginationProps) {
  if (props.pageCount === 1) {
    return null;
  }

  const { pageCount } = props;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="mx-auto px-4 lg:px-6 pb-4 lg:pb-6 max-w-screen-lg flex gap-2 justify-center">
      <PaginationButton url={createPageURL(currentPage-1)} isDisabled={currentPage === 1}>
        <FaChevronLeft className="mx-auto text-sm" />
      </PaginationButton>
      <PaginationButton url={createPageURL(1)} isCurrent={currentPage === 1}>1</PaginationButton>
      {pageCount > 2 && (
        <>
          {currentPage-2 > 2 && <PaginationButton isDisabled={true}>...</PaginationButton>}
          {currentPage-2 > 1 && <PaginationButton url={createPageURL(currentPage-2)}>{currentPage-2}</PaginationButton>}
          {currentPage-1 > 1 && <PaginationButton url={createPageURL(currentPage-1)}>{currentPage-1}</PaginationButton>}
          {currentPage > 1 && <PaginationButton isCurrent={true}>{currentPage}</PaginationButton>}
          {currentPage+1 < pageCount && <PaginationButton url={createPageURL(currentPage+1)}>{currentPage+1}</PaginationButton>}
          {currentPage+2 < pageCount && <PaginationButton url={createPageURL(currentPage+2)}>{currentPage+2}</PaginationButton>}
          {currentPage+2 < pageCount-1 && <PaginationButton isDisabled={true}>...</PaginationButton>}
        </>
      )}
      <PaginationButton url={createPageURL(2)} isCurrent={currentPage === pageCount}>{pageCount}</PaginationButton>
      <PaginationButton url={createPageURL(currentPage+1)} isDisabled={currentPage === pageCount}>
        <FaChevronRight className="mx-auto text-sm" />
      </PaginationButton>
    </div>
  );
}
