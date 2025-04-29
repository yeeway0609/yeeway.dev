import { Metadata } from 'next'
import { ProjectCard } from '../../../components/ProjectCard'
import { projectsData } from '../../../data/projectsData'
import { Project } from '../../../lib/types'

export const metadata: Metadata = {
  title: 'Projects',
}

export default function Page() {
  return (
    <main>
      <h1 className="page-title">Projects</h1>
      <h2 className="page-sub-title">Showcase of my works or interesting plans.</h2>
      <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project: Project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            tags={project.tags}
            imageURL={project.imageURL}
            websiteURL={'websiteURL' in project ? project.websiteURL : undefined}
            githubURL={'githubURL' in project ? project.githubURL : undefined}
            githubTitle={'githubTitle' in project ? project.githubTitle : undefined}
            blogURL={'blogURL' in project ? project.blogURL : undefined}
            blogTitle={'blogTitle' in project ? project.blogTitle : undefined}
          />
        ))}
      </div>
    </main>
  )
}
