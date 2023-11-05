import React from 'react';

const Pagination = ({ page, setPage }: { page; setPage }) => {
  const nextPage = () => {
    if (page === null) {
      setPage({ page: 2 });
    } else {
      setPage({ page: +page + 1 });
    }
  };

  const prevPage = () => {
    setPage({ page: +page - 1 });
  };

  const prevBtn = <button onClick={prevPage}>&lt;</button>;
  const nextBtn = <button onClick={nextPage}>&gt;</button>;

  if (+page <= 1) {
    return nextBtn;
  }

  if (+page >= 9) {
    return prevBtn;
  }

  return (
    <div>
      {prevBtn}
      {nextBtn}
    </div>
  );
};

export default Pagination;
