const baseURL = "http://localhost:5034";
export default baseURL;

// const authorizationHeader = {
//   Authorization: `Bearer ${localStorage.getItem("token")}`,
// };
const authorizationHeader = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW5Ac2lzdGVtYXBlbmFsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzQ4MzUyMTkxfQ.0S4Itzd5_euvg6y0QHIN4_DLsf_YX7EHxgIfOVNfSTo`,
};

export const headers = {
  "Content-Type": "application/json",
  ...authorizationHeader,
};
