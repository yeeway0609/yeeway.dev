import type { Metadata } from 'next'
import { Project } from '@/lib/types'
import { projectsData } from '@content/projects'
import { ProjectCard } from './ProjectCard'

export const metadata: Metadata = {
  title: '專案作品',
}

export default function Page() {
  return (
    <main className="layout-container w-full pb-20">
      <h1 className="page-title">專案作品</h1>
      <p className="page-sub-title">展示過往的一些作品和貢獻</p>

      <div className="grid place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {projectsData.map((project: Project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  )
}
