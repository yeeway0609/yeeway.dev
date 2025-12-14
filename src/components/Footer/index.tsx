import { Profile } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-border w-full border-t">
      <div className="layout-container flex flex-col gap-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:py-6">
        <div>
          <p>
            Contact me:&nbsp;
            <a className="text-primary transition duration-300" href="mailto:hi@yeewy.dev" target="_blank" rel="noopener noreferrer">
              {Profile.EMAIL}
            </a>
          </p>
          <p>
            RSS:&nbsp;
            <a className="text-primary transition duration-300" href="/feed.xml" target="_blank" rel="noopener noreferrer">
              /feed.xml
            </a>
          </p>
        </div>

        <p className="text-muted-foreground text-sm">© 2024 Alex Su. All rights reserved.</p>
      </div>
    </footer>
  )
}
