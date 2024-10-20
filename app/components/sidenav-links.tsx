"use client";

import {
  Home as HomeIcon,
  Pets as PetsIcon,
  MusicNote as MusicNoteIcon,
  PictureAsPdf as PictureAsPdfIcon,
  ViewInAr as ViewInArIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/components/sidenav.module.css";

// ナビバー
const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Pets", href: "/pets", icon: PetsIcon },
  { name: "Music", href: "/music", icon: MusicNoteIcon },
  { name: "Pdf", href: "/pdf", icon: PictureAsPdfIcon },
  { name: "3D", href: "/view", icon: ViewInArIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`${styles.button} ${pathname === link.href ? styles.active : ""}`}
          >
            <LinkIcon />
            <p className={`${styles.hidden}`}>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
