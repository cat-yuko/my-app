"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Pagination from "@/app/components/pagination";

// 1ページあたりのアイテム数
const ITEMS_PER_PAGE = 5;

const getData = () => {
  // ダミーデータ
  return Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
};

export default function Home() {
  // 現在のパスを取得
  const pathname = usePathname();
  // クエリパラメータを取得
  const searchParams = useSearchParams();
  // 'page' パラメータを取得、デフォルトは '1'
  const page = searchParams.get("page") || "1";
  // 数値に変換
  const currentPage = parseInt(page, 10);

  const data = getData();
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {paginatedData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <Pagination
        pathname={pathname}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
}
