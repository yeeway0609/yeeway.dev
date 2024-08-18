export default function TableOfContents({ headers }: { headers: string[] }) {
  return (
    <aside className="mb-4">
      <h2 className="text-xl font-bold">Table of Contents</h2>
      <ul>
        {headers.map((header, index) => (
          <li key={index}>
            <a href={`#${header}`}>{header}</a>
          </li>
        ))}
      </ul>
    </aside>
  )
}