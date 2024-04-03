const GITHUB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;

export async function createPost(title: String, body: String){
  const endpoint = "https://api.github.com/graphql";
  const repositoryId = "R_kgDOLQ9BnQ";
  const mutation = `
    mutation CreateIssue {
      createIssue(input: {
        repositoryId: "${repositoryId}",
        title: "${title}"
        body: "${body}"
      }) {
        issue {
          id
          number
          title
          body
        }
      }
    }
  `;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${GITHUB_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query: mutation })
  };

  const response = await fetch(endpoint, options);
  if (!response.ok) throw Error;
  const response_data = await response.json();

  return true;
}

export async function updatePostTitle(issueId: String, title: String){
  const endpoint = "https://api.github.com/graphql";
  const mutation = `
    mutation UpdateIssueBody {
      updateIssue(input: {
        id: "${issueId}",
        title: "${title}"
      }) {
        issue {
          number
          body
        }
      }
    }
  `;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${GITHUB_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query: mutation })
  };

  const response = await fetch(endpoint, options);
  if (!response.ok) throw Error;
  const response_data = await response.json();

  return true;
}

export async function updatePostContent(issueId: String, commentBody: String){
  const endpoint = "https://api.github.com/graphql";
  const mutation = `
    mutation UpdateIssueBody {
      updateIssue(input: {
        id: "${issueId}",
        body: "${commentBody}"
      }) {
        issue {
          number
          body
        }
      }
    }
  `;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${GITHUB_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query: mutation })
  };

  const response = await fetch(endpoint, options);
  if (!response.ok) throw Error;
  const response_data = await response.json();

  return true;
}

export async function addPostComment(issueId: String, commentBody: String){
  const endpoint = "https://api.github.com/graphql";
  const mutation = `
    mutation AddCommentToIssue {
      addComment(input: {
        subjectId: "${issueId}",
        body: "${commentBody}"
      }) {
        commentEdge {
          node {
            author{
              login
            }
            createdAt
          }
        }
      }
    }
  `;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${GITHUB_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query: mutation })
  };

  const response = await fetch(endpoint, options);
  if (!response.ok) throw Error;
  const response_data = await response.json();

  return response_data.data.addComment.commentEdge.node.author.login;
}


