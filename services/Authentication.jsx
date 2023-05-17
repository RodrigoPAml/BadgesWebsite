import { api, getConfig } from './Api'

const Login = async ({ login, password }) => {
  const { data } = await api.post(`/Authentication/Login?login=${login}&password=${password}`, getConfig())

  return data;
}

/*const RequestChangePassword = async (email) => {
  const { data } = await api.post(`/Authentication/RequestChangePassword?email=${email}`, getConfig())

  return data;
}

const PostChangePassword = async ({ email, emailCode, password }) => {
  const { data } = await api.post(`/Authentication/ChangePassword?email=${email}&code=${emailCode}&password=${password}`, getConfig())

  return data;
}

const RequestCreateUser = async (email) => {
  const { data } = await api.post(`/Authentication/RequestCreateUser?email=${email}`, getConfig())

  return data;
}*/

const TestToken = async () => {
  const { data } = await api.get(`/Authentication/TestToken`, getConfig())

  return data;
}

export {
  Login,
  TestToken,
  //RequestChangePassword,
  //RequestCreateUser,
  //PostChangePassword
}