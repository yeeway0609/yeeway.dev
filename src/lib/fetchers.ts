"use server";

import { Issue, IssuesResponse } from "@/lib/types";

export async function getPosts(endCursor: string | null, perPage: number = 10): Promise<IssuesResponse> {
  const after = endCursor ? `\"${endCursor}\"` : null;
  const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
  const endpoint = "https://api.github.com/graphql";
  const repo_owner = "yeeway0609";
  const repo_name = "yeeway.dev";
  const query = `{
    repository(owner: "${repo_owner}", name: "${repo_name}") {
      issues(first: ${perPage}, after: ${after}, filterBy: {states: OPEN, createdBy: "${repo_owner}"}, orderBy: {field: CREATED_AT, direction: DESC}) {
        nodes {
          id
          title
          body
          url
          number
          createdAt
          labels(first: 10) {
            nodes {
              name
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${GITHUB_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query: query })
  };

  const response = await fetch(endpoint, options);
  if (!response.ok) throw Error;
  const response_data = await response.json();
  return response_data.data.repository.issues;
}

export async function getPostData(issueNumber: number): Promise<Issue> {
  const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
  const endpoint = "https://api.github.com/graphql";
  const repo_owner = "yeeway0609";
  const repo_name = "yeeway.dev";
  const query = `{
    repository(owner: "${repo_owner}", name: "${repo_name}") {
      issue(number: ${issueNumber}) {
        id
        title
        body
        url
        author {
          login
        }
        labels(first: 10) {
          nodes {
            name
          }
        }
        comments(first: 100) {
          nodes {
            author {
              login
              avatarUrl
            }
            body
          }
        }
      }
    }
  }`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${GITHUB_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query: query })
  };

  const response = await fetch(endpoint, options);
  if (!response.ok) throw Error;
  const response_data = await response.json();
  return await response_data.data.repository.issue;
}
