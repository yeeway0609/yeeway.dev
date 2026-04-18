import { CONTACTS } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="w-full border-t border-border">
      <div className="layout-container flex flex-col gap-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:py-6">
        <div>
          <p>
            Contact me:&nbsp;
            <a
              className="text-primary transition duration-300"
              href={`mailto:${CONTACTS.email}`}
              target="_blank"
            >
              {CONTACTS.email}
            </a>
          </p>
          <p>
            RSS:&nbsp;
            <a
              className="text-primary transition duration-300"
              href="/feed.xml"
              target="_blank"
            >
              /feed.xml
            </a>
          </p>
        </div>

        <p className="text-sm text-muted-foreground">© 2024 Alex Su. All rights reserved.</p>
      </div>
    </footer>
  )
}
