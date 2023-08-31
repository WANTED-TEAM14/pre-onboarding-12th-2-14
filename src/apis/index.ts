import { Octokit } from '@octokit/rest';

export const REPO_INFO = {
  organization: 'facebook',
  repository: 'react',
};

const TOKEN = process.env.REACT_APP_TOKEN;

const octokit = new Octokit({ auth: TOKEN });

const { organization, repository } = REPO_INFO;

export const getIssues = async (page: number) => {
  try {
    const issueList = await octokit.request(`GET /repos/${organization}/${repository}/issues`, {
      sort: 'comments',
      state: 'open',
      page: page,
      per_page: 10,
    });

    return issueList.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
