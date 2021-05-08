import React from "react";
import { Pagination, PaginationLink, PaginationItem } from "reactstrap";

type PaginationBlockProps = {
  currentPage: number;
  onClick(e: any, currentPage: number): void;
  isLastPage: boolean;
};

const PaginationBlock: React.FC<PaginationBlockProps> = ({
  currentPage,
  onClick,
  isLastPage,
}) => {
  return (
    <Pagination className="d-flex justify-content-center ">
      <PaginationItem disabled={currentPage <= 1}>
        <PaginationLink
          className="border border-2 border-primary"
          onClick={(e) => onClick(e, currentPage - 1)}
          previous
          href="#"
        />
      </PaginationItem>
      <PaginationItem disabled={isLastPage}>
        <PaginationLink
          className="border border-2 border-primary"
          onClick={(e) => onClick(e, currentPage + 1)}
          next
          href="#"
        />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationBlock;
