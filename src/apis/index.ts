import { REPO_INFO } from 'constant';
import { Octokit } from 'octokit';

export const TOKEN =
  'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC4DOxU9RmcuhKJ99ddMYXC7+giuDc2ixsXnYiM27r7w0M1frQCt2UaIdu30HxBeeFWc8U/RS7+LTN1rh/RRGFEYe+QQeUKxTwRGdJ93IZAEOflKcomIJ5lJiBbrx5IuOOGa7e88sJpoJj0Jej0Y2rpE6vteZfkjsrs9DkKRnrKkHtWJduYvGlj3G52NEdERtYxhnSotPk8M96Ld8GBhOzr2DaSY/0K5URptO9SZQXy5IWqMSdYZXg6qj+oso+v0P5ptAhLvTbmKBN3dQyDvCaocowLODBV1kHfOPFaNff7VS4L0gxyTZU+ml00kAx+HGLfvtA44CRL6XL3ZDpDizRGsA3HBo5uh0XjwMXQaBTUXUfu9bM2pEDTABSTVila4zgpLs05Yj8oDtTLneg/CKj87rXM8qFWPzZjc5pNK8g0ckwqWlBxoplmuwQAA3sacmE+WcwPtRRzkCGF25wo+UCdmsjZohq3XIsAbMG2Zzaa51q2REZRZnw9Uy9amB7WaF1NBOacGMvFvNApy6b9dnxl2b5debjNSxiyC0faNluS4/vJVb1XEL1oGhMO1Ep0/KiBdVbAvdQcMle3dVrNToewqJCFbZbYWvxkMqYGJPGPEGpFKgqO/jyUNIkeGUMtEljKIoKdBnTq335btSTw4ujcAmbNvkQzygky2p6QgBloaQ==';

const octokit = new Octokit({
  auth: TOKEN,
});

const { organization, repository } = REPO_INFO;

// const BASE_URL = `https://api.github.com/repos/${organization}/${repository}/issues`;

export const getIssues = async (page: number) => {
  const issueList = await octokit.request(`GET /repos/${organization}/${repository}/issu`, {
    owner: organization,
    repo: repository,
    state: 'open',
    sort: 'comments',
    page: page,
    // per_page: per_page,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  return issueList.data.data;
};

// const axiosIstance = axios.create({
//   baseURL: BASE_URL,
// });

// axiosIstance.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${TOKEN}`;
//   return config;
// });

// export const getIssues = async (page: number) => {
//   const data = await axiosIstance.get(
//     `${BASE_URL}?state=open&sort=comments&direction=desc&page=${page}&per_page=10`,
//   );
//   return data.data;
// };

// export const getIssueDetail = async (issueNumber: number) => {
//   const data = await axiosIstance(`${BASE_URL}/${issueNumber}`);
//   return data.data;
// };
