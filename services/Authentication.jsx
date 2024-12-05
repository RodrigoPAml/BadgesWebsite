import { api, getConfig } from './Api'

const Login = async ({ login, password }) => {
  const { data } = await api.post(`/Authentication/Login`, JSON.stringify({ login, password }), getConfig())

  return data;
}

const TestToken = async () => {
  const { data } = await api.get(`/Authentication/TestToken`, getConfig())

  return data;
}

export {
  Login,
  TestToken,
}