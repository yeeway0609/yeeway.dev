export type Issue = {
  title: string;
  body: string;
  createdAt: string;
  id?: string;
  url?: string;
  number?: number;
  author?: {
    login: string;
  };
  labels?: {
    nodes: {
      name: string;
    }[];
  };
  comments?: {
    nodes: {
      author: {
        login: string;
        avatarUrl: string;
      };
      body: string;
      createdAt: string;
    }[];
    totalCount: number;
  };
};

export type PageInfo = {
  endCursor: string | null;
  startCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type IssuesResponse = {
  nodes: Issue[];
  pageInfo: PageInfo;
};

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