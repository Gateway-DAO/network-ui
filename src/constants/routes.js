const routes = {
  home: '/',
  auth: '/login',
  dashboardUserHome: '/dashboard/user',
  dashboardUserAsset: (pdaId) => `/dashboard/user/asset/${pdaId}`,
  dashboardOrgAsset: (org, pdaId) => `/dashboard/org/${org}/asset/${pdaId}`,
  dashboardUserIssuedAssets: '/dashboard/user/assets/issued',
  dashboardUserReceivedAssets: '/dashboard/user/assets/received',
  dashboardUserProofs: `/dashboard/user/proofs`,
  dashboardUserProof: (proofId) => `/dashboard/user/proof/${proofId}`,
  dashboardOrgProof: (org, proofId) => `/dashboard/org/${org}/proof/${proofId}`,
  dashboardUserSentProofs: '/dashboard/user/proofs/sent',
  dashboardUserReceivedProofs: '/dashboard/user/proofs/received',
  dashboardUserRequest: (requestId) => `/dashboard/user/request/${requestId}`,
  dashboardOrgRequest: (org, requestId) =>
    `/dashboard/org/${org}/request/${requestId}`,
  dashboardUserRequests: '/dashboard/user/requests',
  dashboardUserSettings: '/dashboard/user/settings',
  dashboardOrgRoot: '/dashboard/org',
  dashboardOrgHome: (organizationId) => `/dashboard/org/${organizationId}`,
  dashboardOrgIssuedAssets: (organizationId) =>
    `/dashboard/org/${organizationId}/assets/issued`,
  dashboardOrgRequests: (organizationId) =>
    `/dashboard/org/${organizationId}/requests`,
  dashboardOrgReceivedProofs: (organizationId) =>
    `/dashboard/org/${organizationId}/proofs/received`,
  dashboardOrgSettings: (organizationId) =>
    `/dashboard/org/${organizationId}/settings`,
};

module.exports = routes;
