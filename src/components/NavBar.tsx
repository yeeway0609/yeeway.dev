'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { HomeIcon, DocumentDuplicateIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const links = [
  { name: "首頁", href: "/", icon: HomeIcon },
  { name: "文章", href: "/posts", icon: DocumentDuplicateIcon },
  { name: "關於我", href: "/about", icon: UserCircleIcon },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full px-3 py-4 md:px-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`
              flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
              ${pathname === link.href ? "text-blue-600" : ""}
            `}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </nav>
  );
}
