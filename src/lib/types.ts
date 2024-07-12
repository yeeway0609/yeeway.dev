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
  intro: string;
};

export type BlogPost = {
  title: string;
  date: string;
  labels: string[];
  body: string;
};