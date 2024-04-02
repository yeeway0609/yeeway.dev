"use client";

import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() =>  setMounted(true), []);

  // if the component has not mounted, return a placeholder image to improve user experience
  if (!mounted) return (
    <Image
      src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
      width={48}
      height={48}
      sizes="48x48"
      priority={false}
      alt="Loading Light/Dark Toggle"
      title="Loading Light/Dark Toggle"
    />
  );

  if (resolvedTheme === "dark") return (
    <div className="flex h-full items-center justify-center">
      <MoonIcon
        className="size-8"
        onClick={() => setTheme("light")}
      />
    </div>
  );

  if (resolvedTheme === "light") return (
    <div className="flex h-full items-center justify-center">
      <SunIcon
        className="size-8"
        onClick={() => setTheme("dark")}
      />
    </div>
  );
}