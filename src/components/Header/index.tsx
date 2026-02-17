'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ThemeSwitch } from './ThemeSwitch'

const ROUTES = [
  { title: 'Blog', href: '/blog', icon: <Icon icon="heroicons:newspaper-solid" className="mr-1.5 size-4" /> },
  { title: 'Projects', href: '/projects', icon: <Icon icon="heroicons:command-line-solid" className="mr-1.5 size-4" /> },
  { title: 'About', href: '/about', icon: <Icon icon="heroicons:user-solid" className="mr-1.5 size-4" /> },
  { title: 'Uses', href: '/uses', icon: <Icon icon="heroicons:bolt-solid" className="mr-1.5 size-4" /> },
  { title: 'Library', href: '/library', icon: <Icon icon="heroicons:bookmark-solid" className="mr-1.5 size-4" /> },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-foreground-300/30 bg-background/70 h-header sticky top-0 z-50 flex w-full items-center justify-center border-b-[0.5px] py-3 shadow-md backdrop-blur-md">
      <div className="layout-container border-foreground-300/30 flex items-center justify-between">
        <Link href="/" className="cursor-pointer">
          <Image src="/logo.png" alt="Alex Su' Website" width={36} height={36} />
        </Link>

        {/* Desktop */}
        <nav className="hidden gap-x-6 sm:flex">
          {ROUTES.map((route) => (
            <Link key={route.title} className="hover:text-primary flex cursor-pointer items-center bg-transparent text-sm" href={route.href}>
              {route.icon} {route.title}
            </Link>
          ))}
        </nav>
        <div className="hidden sm:flex sm:gap-3">
          <ThemeSwitch />
        </div>

        {/* Mobile */}
        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="block">
              <Icon icon="heroicons:bars-3" className="size-8" />
            </SheetTrigger>
            <SheetContent className="flex w-[270px] flex-col p-4">
              <SheetTitle className="sr-only">Mobile menu</SheetTitle>
              <div className="flex justify-between">
                <ThemeSwitch />
                <SheetClose>
                  <Icon icon="heroicons:x-mark" className="hover:text-primary active:text-primary size-7 transition-colors" />
                </SheetClose>
              </div>
              <nav className="mt-5 flex flex-col gap-8 px-1">
                {ROUTES.map((route) => (
                  <Link key={route.title} className="flex items-center" href={route.href} onClick={() => setOpen(false)}>
                    {route.icon} {route.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
