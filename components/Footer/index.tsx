import { Icon } from '@iconify/react'
import { Profile } from '@/lib/constants'

export function Footer() {
  const socialLinks = [
    { href: Profile.LINKEDIN, icon: <Icon icon="tabler:brand-linkedin" className="size-7" /> },
    { href: Profile.GITHUB, icon: <Icon icon="tabler:brand-github" className="size-7" /> },
    { href: Profile.LINKEDIN, icon: <Icon icon="tabler:brand-instagram" className="size-7" /> },
  ]

  return (
    <footer className="border-border mt-auto w-full border-t">
      <div className="layout-container flex flex-col gap-4 py-5 sm:py-8">
        <div className="flex items-center gap-5">
          {socialLinks.map(({ href, icon }, index) => (
            <a className="fill-foreground hover:fill-primary size-6 transition duration-300" key={index} href={href} target="_blank">
              {icon}
            </a>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-1 sm:flex-row">
          <p>
            Contact me:&nbsp;
            <a className="text-primary transition duration-300" href="mailto:hi@yeewy.dev">
              {Profile.EMAIL}
            </a>
          </p>
          <p>© 2024 Yiwei Su. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
