"use client";

import {useState, useEffect} from 'react'
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Pagination from "@/app/components/pagination";
import Pagination_mui from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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

  const [mui_page, setPage] = useState(1)

  const data = getData();
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  console.log("🐖=====>"+currentPage);
  console.log("🚀=====>"+totalPages)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    // currentPageが変わったらクエリパラメータを更新してページを再読み込み
    router.push(`?page=${currentPage}`);
    setPage(currentPage)
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
      <Stack spacing={2}>
      <Pagination_mui 
        count={totalPages} 
        page={mui_page} 
        onChange={(e, mui_page) =>setPage(mui_page)}
        color="secondary"
      />
    </Stack>
    </div>
  );
}
