
import { api, getConfig, local, getLocalConfig } from './Api'

const GetPagedBadges = async ({ page, pageSize, filters, orderBy }) => {
  const { data } = await api.get(`/Badge/GetPaged?page=${page}&pageSize=${pageSize}&filters=${filters}&orderBy=${orderBy}`, getConfig())

  return data;
}

const GetImage = async (id) => {
  const { data } = await api.get(`/Badge/GetImage?id=${id}`, getConfig())

  return data;
}

const GetImageFromCode = async (code) => {
  const { data } = await local.get('/Badge/GetImageFromCode?code=' + code, getLocalConfig())

  return data;
}

const GetBadgeInfo = async (code) => {
  const { data } = await api.get(`/Badge/GetBadgeInfo?code=${code}`, getConfig())

  return data;
}

const UpdateBadge = async (item) => {
  const { data } = await api.put('/Badge/UpdateBadge', JSON.stringify(item), getConfig())

  return data;
}

const AdquireBadgeForUser = async (item) => {
  const { data } = await api.post('/Badge/AdquireBadge', JSON.stringify(item), getConfig())

  return data;
}

const CreateBadge = async (item) => {
  const { data } = await api.post('/Badge/CreateBadge', JSON.stringify(item), getConfig())

  return data;
}

const DeleteBadge = async (id) => {
  const { data } = await api.delete(`/Badge/DeleteBadge?id=${id}`, getConfig())

  return data;
}

const GetExternalBadgeInfo = async (url) => {
  const { data } = await api.get(`/Badge/GetExternalBadgeInfo?url=${url}`, getConfig())

  return data;
}

export {
  GetImage,
  GetPagedBadges,
  GetBadgeInfo,
  UpdateBadge,
  CreateBadge,
  DeleteBadge,
  AdquireBadgeForUser,
  GetImageFromCode,
  GetExternalBadgeInfo
}