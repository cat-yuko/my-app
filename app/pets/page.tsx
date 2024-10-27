"use client";

import {useEffect} from 'react'
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Pagination from "@/app/components/pagination";

// 1ページあたりのアイテム数
const ITEMS_PER_PAGE = 5;

const getData = () => {
  // ダミーデータ
  return Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
};

export default function Home() {
  const router = useRouter();
    // 現在のパスを取得
  const pathname = usePathname();
  // クエリパラメータを取得
  const searchParams = useSearchParams();
  // 'page' パラメータを取得、デフォルトは '1'
  const page = searchParams.get("page") || "1";
  // 数値に変換
  let currentPage = parseInt(page, 10);

   const data = getData();
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    // currentPageが変わったらクエリパラメータを更新してページを再読み込み
    router.push(`?page=${currentPage}`);
  }, [currentPage, router]);

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
