import Link from "next/link";
import styles from "@/app/components/pagination.module.css";

export default function Pagination({ pathname, totalPages, currentPage }) {
  // 表示するページを設定
  const pageNumbers = [];
  // 現在のページの前後に表示するページ数
  const displayRange = 1;
  // 表示するページの最大数
  const maxDisplayedPages = 7;

  // 最初のページを追加
  pageNumbers.push(1);

  // 中間ページ
  // 省略記号
  if (currentPage >= 5) {
    pageNumbers.push("...");
  }

  let start = currentPage - 1;
  let end = currentPage + 1;
  if (currentPage < 5) {
    start = 2;
    end = 5;
  } else if (currentPage > totalPages - 4) {
    start = totalPages - 4;
    end = totalPages - 1;
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  // 省略記号
  if (totalPages - 4 >= currentPage) {
    pageNumbers.push("...");
  }

  // 最後のページを追加
  if (totalPages > 1) {
    pageNumbers.push(totalPages);
  }

  return (
    <div className={styles.pagination}>
      {/* Previousボタン */}
      <Link
        href={`${pathname}/?page=${currentPage - 1}`}
        className={`${styles.button} ${currentPage === 1 ? styles.disabled : ""}`}
      >
        Prev
      </Link>

      {/* ページ番号 */}
      {pageNumbers.map((page, index) => (
        <Link
          key={index}
          href={`${pathname}/?page=${page}`}
          className={`${styles.button} ${
            currentPage === page ? styles.active : ""
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Nextボタン */}
      <Link
        href={`${pathname}/?page=${currentPage + 1}`}
        className={`${styles.button} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
      >
        Next
      </Link>
    </div>
  );
}
