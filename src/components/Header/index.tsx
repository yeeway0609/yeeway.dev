'use client'

import { useState } from 'react'
import { Bars3Icon, XMarkIcon, NewspaperIcon, UserIcon, CommandLineIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import logoIcon from '@/assets/logo.png'
import { SpotifyPlayer } from '@/components/SpotifyPlayer'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ThemeSwitch } from './ThemeSwitch'

const ROUTES = [
  { title: 'Blog', href: '/', Icon: NewspaperIcon },
  { title: 'Projects', href: '/projects', Icon: CommandLineIcon },
  { title: 'About', href: '/about', Icon: UserIcon },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="border-foreground-300/30 bg-background/70 fixed z-50 flex h-16 w-full items-center justify-center border-b-[0.5px] py-3 shadow-md backdrop-blur-md">
      {/* TODO: h-16 要抽成 header 高度變數 */}
      <div className="layout-container border-foreground-300/30 flex items-center justify-between">
        <Link href="/" className="cursor-pointer">
          <Image src={logoIcon} alt="Yiwei Su' Website" width={36} height={36} />
        </Link>

        {/* Desktop */}
        <NavigationMenu className="hidden sm:block">
          <NavigationMenuList>
            {ROUTES.map((route) => (
              <NavigationMenuItem key={route.title}>
                <Link href={route.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={` ${navigationMenuTriggerStyle()} hover:text-primary cursor-pointer bg-transparent ${pathname.split('/')[1] === route.href.split('/')[1] ? 'text-primary' : ''} `}
                  >
                    {<route.Icon className="mr-2 size-5" />}
                    {route.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="hidden sm:flex sm:gap-3">
          <ThemeSwitch />
        </div>

        {/* Mobile */}
        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="block">
              <Bars3Icon className="size-8" />
            </SheetTrigger>
            <SheetContent className="flex w-[270px] flex-col p-4">
              <SheetTitle className="sr-only">Mobile menu</SheetTitle>
              <div className="flex justify-between">
                <ThemeSwitch />
                <SheetClose>
                  <XMarkIcon className="hover:text-primary transition-colors active:text-primary size-7" />
                </SheetClose>
              </div>
              <nav className="mt-5 flex flex-col gap-8 px-1">
                {ROUTES.map((route) => (
                  <Link
                    key={route.title}
                    href={route.href}
                    className={`flex ${pathname.split('/')[1] === route.href.split('/')[1] ? 'text-primary' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    {<route.Icon className="mr-2 size-5" />}
                    {route.title}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto px-1">
                Recent 😍 songs:
                <SpotifyPlayer />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
