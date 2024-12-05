
import { api, local, getConfig, getLocalConfig } from './Api'

const GetPagedUsers = async ({ page, pageSize, filters, orderBy }) => {
  const { data } = await api.get(`/User/GetPaged?page=${page}&pageSize=${pageSize}&filters=${filters}&orderBy=${orderBy}`, getConfig())

  return data;
}

const UpdateUser = async (item) => {
  const { data } = await api.put('/User/UpdateUser', JSON.stringify(item), getConfig())

  return data;
}


const UpdateMyUser = async (item) => {
  const { data } = await api.put('/User/UpdateMyUser', JSON.stringify(item), getConfig())

  return data;
}

const GetImage = async () => {
  const { data } = await api.get('/User/GetImage', getConfig())

  return data;
}

const GetImageFromId = async (id) => {
  const { data } = await api.get('/User/GetImageFromId?id=' + id, getConfig())

  return data;
}

const ChangePassword = async (id, newPassword) => {
  const { data } = await api.post('/User/UpdateUserPassword', JSON.stringify({ id, newPassword }), getConfig())

  return data;
}

const UpdateMyUserPassword = async (newPassword) => {
  const { data } = await api.post('/User/UpdateMyUserPassword/', JSON.stringify({ newPassword }), getConfig())

  return data;
}

const GetProfile = async () => {
  const { data } = await api.get('/User/GetProfile', getConfig())

  return data;
}

const CreateUser = async (item) => {
  const { data } = await api.post('/User/CreateUser', JSON.stringify(item), getConfig())

  return data;
}

const DeleteUser = async (id) => {
  const { data } = await api.delete(`/User/DeleteUser?id=${id}`, getConfig())

  return data;
}

const GetMyUser = async () => {
  const { data } = await api.get(`/User/GetMyUser`, getConfig())

  return data;
}

const GetMyUrl = async () => {
  const { data } = await api.get(`/User/GetMyUrl`, getConfig())

  return data;
}

const GetPublicProfile = async (url) => {
  const { data } = await api.get(`/User/GetPublicProfile?url=${url}`, getConfig())

  return data;
}

const GetBadgePage = async (code) => {
  const { data } = await api.get(`/User/GetBadgePage?code=${code}`, getConfig())

  return data;
}

const GetStaticBadgePage = async (code) => {
  const { data } = await local.get(`/User/GetBadgePage?code=${code}`, getLocalConfig())

  return data;
}

export {
  GetPagedUsers,
  UpdateUser,
  UpdateMyUser,
  CreateUser,
  GetImage,
  GetProfile,
  DeleteUser,
  GetMyUser,
  GetMyUrl,
  GetPublicProfile,
  GetBadgePage,
  GetStaticBadgePage,
  GetImageFromId,
  ChangePassword,
  UpdateMyUserPassword
}