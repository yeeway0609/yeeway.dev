export type Project = {
  title: string;
  description: string;
  imageURL: string;
  tags?: string[];
  websiteURL?: string;
  githubURL?: string;
  githubTitle?: string;
  blogURL?: string;
  blogTitle?: string;
}

export type BlogPostInfo = {
  slug: string;
  title: string;
  date: string;
  labels: string[];
  desc: string;
};

export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  labels: string[];
  desc: string;
  body: string;
  open_graph: string;
};