import GithubIcon from '@/assets/icons/github-logo.svg'
import LinkedinIcon from '@/assets/icons/linkedin-logo.svg'
import InstagramIcon from '@/assets/icons/instagram-logo.svg'
import { Contact } from '@/lib/constants'

export default function Footer() {
  const socialLinks = [
    { href: Contact.GITHUB, icon: GithubIcon },
    { href: Contact.LINKEDIN, icon: LinkedinIcon },
    { href: Contact.LINKEDIN, icon: InstagramIcon },
  ]

  return (
    <footer className="w-full border-t border-border">
      <div className="container flex flex-col gap-4 py-5 sm:py-8">
        <div className="flex items-center gap-5">
          {socialLinks.map(({ href, icon: Icon }, index) => (
            <a className="size-6 text-foreground transition duration-300 hover:text-primary" key={index} href={href} target="_blank">
              <Icon />
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
