import { Metadata } from 'next'
import { projectsData } from '@/content/projects'
import { Project } from '@/lib/types'
import { ProjectCard } from './ProjectCard'

export const metadata: Metadata = {
  title: 'Projects',
}

export default function Page() {
  return (
    <main className="layout-container pb-20">
      <h1 className="page-title">Projects</h1>
      <p className="page-sub-title">Showcase of my works and contributions</p>
      <div className="grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {projectsData.map((project: Project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  )
}
