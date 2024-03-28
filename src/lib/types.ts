export type Issue = {
  title: string;
  body: string;
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
    }[];
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
