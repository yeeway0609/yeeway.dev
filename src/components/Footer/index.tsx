import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/svg-icons'
import { Contact } from '@/lib/constants'

export function Footer() {
  const socialLinks = [
    { href: Contact.GITHUB, icon: <GithubIcon /> },
    { href: Contact.LINKEDIN, icon: <LinkedinIcon /> },
    { href: Contact.LINKEDIN, icon: <InstagramIcon /> },
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
              {Contact.EMAIL}
            </a>
          </p>
          <p>© 2024 Yiwei Su. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
