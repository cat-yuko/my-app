"use client";

import React, { useState } from "react";
import ConfirmationDialog from "@/app/components/confirmationDialog";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = () => {
    // 削除処理をここに追加
    console.log("削除しました");
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };
  return (
    <div>
      <h2>music</h2>
      <button onClick={() => setIsDialogOpen(true)}>削除</button>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onConfirm={handleDelete}
        onCancel={handleCancel}
        message="本当に削除してもよろしいですか？"
      />
    </div>
  );
}
