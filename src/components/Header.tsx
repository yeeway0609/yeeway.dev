"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon, NewspaperIcon, UserIcon, CommandLineIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeSwitch from "@/components/ThemeSwitch";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const routes = [
    { title: "Blog", href: "/blog", Icon: NewspaperIcon },
    { title: "Projects", href: "/projects", Icon: CommandLineIcon },
    { title: "About", href: "/about", Icon: UserIcon },
    { title: "Resume", href: "https://resume.yeeway.dev", Icon: BriefcaseIcon, }
  ];

  return (
    <nav className="border-foreground-300/30 fixed flex w-full items-center justify-center border-b-[0.5px] bg-background/30 py-3 shadow-md backdrop-blur-md">
      <div className="border-foreground-300/30 container flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="Alex Su' Website" width={36} height={36} />
        </Link>

        {/* Desktop */}
        <NavigationMenu className="hidden sm:block">
          <NavigationMenuList>
            {routes.map((route) => (
              <NavigationMenuItem key={route.title}>
                <Link href={route.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`
                      ${navigationMenuTriggerStyle()}
                      bg-transparent hover:text-primary
                      ${pathname.startsWith(route.href) ? "text-primary" : ""}
                  `}>
                    {<route.Icon className="mr-2 size-5" />}
                    {route.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="hidden sm:block">
          <ThemeSwitch />
        </div>

        {/* Mobile */}
        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="block">
              <Bars3Icon className="size-8" />
            </SheetTrigger>
            <SheetContent className="flex w-[270px] flex-col p-4">
              <div className="flex justify-between">
                <ThemeSwitch />
                <SheetTrigger className="block">
                  <XMarkIcon className="size-8" />
                </SheetTrigger>
              </div>
              <div className="mt-5 flex flex-col gap-8">
                {routes.map((route) => (
                  <Link
                    key={route.title}
                    href={route.href}
                    className={`flex ${pathname.startsWith(route.href) ? "text-primary" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    {<route.Icon className="mr-2 size-5" />}
                    {route.title}
                  </Link>
                ))}
                <Link href="https://resume.yeeway.dev" target="_blank" className="flex">
                  <BriefcaseIcon className="mr-2 size-5" />
                  Resume
                </Link>
              </div>
              <div className="mt-auto">
                Recent 😍 songs:
                <SpotifyPlayer />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
