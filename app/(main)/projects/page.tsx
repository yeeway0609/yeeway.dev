import { Metadata } from 'next'
import { ProjectCard } from '@/components/ProjectCard'
import { projectsData } from '@/content/projectsData'
import { Project } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Projects',
}

export default function Page() {
  return (
    <main className="layout-container pb-20">
      <h1 className="page-title">Projects</h1>
      <p className="page-sub-title">Showcase of my works or interesting plans.</p>
      <div className="flex flex-wrap gap-5">
        {projectsData.map((project: Project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  )
}
