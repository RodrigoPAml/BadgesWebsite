
import { api, getConfig } from './Api'

const GetPagedUserBadges = async ({ page, pageSize, filters, orderBy }) => {
  const { data } = await api.get(`/UserBadge/GetPaged?page=${page}&pageSize=${pageSize}&filters=${filters}&orderBy=${orderBy}`, getConfig())

  return data;
}

const GetPagedMyUserBadges = async ({ page, pageSize, filters, orderBy, badgeDescription = '' }) => {
  const { data } = await api.get(`/UserBadge/GetPagedMyBadges?page=${page}&pageSize=${pageSize}&filters=${filters}&orderBy=${orderBy}&badgeDescription=${badgeDescription}`, getConfig())

  return data;
}

const UpdateUserBadge = async (item) => { 
  const { data } = await api.put('/UserBadge/UpdateUserBadge', JSON.stringify(item), getConfig())

  return data;
}

const CreateUserBadge = async (item) => {
  const { data } = await api.post('/UserBadge/CreateUserBadge', JSON.stringify(item), getConfig())

  return data;
}

const CreateExternalBadge = async (item) => {
  const { data } = await api.post('/UserBadge/CreateExternalBadge', JSON.stringify(item), getConfig())

  return data;
}

const DeleteUserBadge = async (id) => {
  const { data } = await api.delete(`/UserBadge/DeleteUserBadge?id=${id}`, getConfig())

  return data;
}

const DeleteUserBadgeAsUser = async (id) => {
  const { data } = await api.delete(`/UserBadge/DeleteUserBadgeAsUser?id=${id}`, getConfig())

  return data;
}

export {
  GetPagedUserBadges,
  UpdateUserBadge,
  CreateUserBadge,
  DeleteUserBadge,
  GetPagedMyUserBadges,
  CreateExternalBadge,
  DeleteUserBadgeAsUser
}