import React from "react";
import styles from "@/app/components/confirmationDialog.module.css";

export default function ConfirmationDialog({
  isOpen,
  onConfirm,
  onCancel,
  message,
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            OK
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
}
