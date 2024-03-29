'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import ThemeSwitch from '@/components/ThemeSwitch';

export default function Header() {
  const pathname = usePathname();
  const routes = [
    {
      title: "Blog",
      href: "/blog"
    },
    {
      title: "Projects",
      href: "/projects"
    },
    {
      title: "About",
      href: "/about"
    }
  ];

  return (
    <nav className="flex w-full items-center justify-around px-3 py-4 md:px-2">
      <Link href="/">
        <Image src="/logo.png" alt="Alex Su' Website" width={36} height={36} />
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          {routes.map((route) => (
            <NavigationMenuItem key={route.title}>
              <Link href={route.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`
                  ${navigationMenuTriggerStyle()}
                    hover:text-primary
                    ${pathname.startsWith(route.href) ? "text-primary" : ""}
                `}>
                  {route.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <Link href="https://resume.yeeway.dev" target="_blank" legacyBehavior passHref>
              <NavigationMenuLink
                className={`
                  ${navigationMenuTriggerStyle()}
                  hover:text-primary
              `}>
                Resume
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div>
      <ThemeSwitch />
      </div>
    </nav>
  );
}
