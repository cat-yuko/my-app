"use client";

import React, { useState } from 'react';

export default function Home() {
  const file = "/assets/animals.pdf";
  const [currentPage, setCurrentPage] = useState(1);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>PDF</h2>
      <p>PDFを表示</p>
      <div style={{ textAlign: 'center' }}>
        <iframe
          src={`${file}#page=${currentPage}&toolbar=0&zoom=FitH`} // PDF URLを直接指定
          width="100%"  // 幅をウィンドウ幅に合わせる
          height="600px" // 高さを指定（必要に応じて調整）
          style={{ border: 'none' }}
        />
        <div>
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage}
          </span>
          <button onClick={goToNextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
