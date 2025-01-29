import { Metadata } from 'next'
import { ProjectCard } from '@/components/ProjectCard'
import { projectsData } from '@/data/projectsData'
import { Project } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Projects',
}

export default function ProjectsPage() {
  return (
    <>
      <section className="py-12">
        <h1 className="animate-slide-in-right flex gap-2 text-5xl font-bold tracking-wider">Projects</h1>
        <h2 className="animate-slide-in-right mt-3 text-2xl text-muted-foreground delay-100">Showcase of my works or interesting plans.</h2>
      </section>
      <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project: Project) => {
          return (
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
          )
        })}
      </div>
    </>
  )
}
