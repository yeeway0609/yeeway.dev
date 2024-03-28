'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import ThemeSwitch from '@/components/ThemeSwitch';

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full justify-around px-3 py-4 md:px-2">
      <Link href="/">
        <Image src="/logo.png" alt="Alex Su' Website" width={48} height={48} />
      </Link>
      <div className="flex">
        <Link href="/blog" className="flex h-12 items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <p className="hidden md:block">文章</p>
        </Link>
        <Link href="/about" className="flex h-12 items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <p className="hidden md:block">關於我</p>
        </Link>
        <a href="https://resume.yeeway.dev" target="_blank" className="flex h-12 items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <p className="hidden md:block">履歷</p>
        </a>
      </div>
      <div>
        <ThemeSwitch />
      </div>
    </nav>
  );
}
