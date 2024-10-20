import Link from "next/link";
import styles from "@/app/components/pagination.module.css";

export default function Pagination({ pathname, totalPages, currentPage }) {
  // 現在のページの前後に表示するページ数
  const displayRange = 1;
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - displayRange && i <= currentPage + displayRange)
    ) {
      paginationItems.push(i);
    } else if (paginationItems[paginationItems.length - 1] !== "...") {
      // 省略記号
      paginationItems.push("...");
    }
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
      {paginationItems.map((page, index) => (
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
