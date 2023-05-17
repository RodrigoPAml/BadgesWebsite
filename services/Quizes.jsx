
import { api, getConfig } from './Api'

const GetPagedQuizes = async ({ page, pageSize, filters, orderBy }) => {
  const { data } = await api.get(`/Quiz/GetPaged?page=${page}&pageSize=${pageSize}&filters=${filters}&orderBy=${orderBy}`, getConfig())

  return data;
}

const UpdateQuiz = async (item) => {
  const { data } = await api.put('/Quiz/UpdateQuiz', JSON.stringify(item), getConfig())

  return data;
}

const CreateQuiz = async (item) => {
  const { data } = await api.post('/Quiz/CreateQuiz', JSON.stringify(item), getConfig())

  return data;
}

const DeleteQuiz = async (id) => {
  const { data } = await api.delete(`/Quiz/DeleteQuiz?id=${id}`, getConfig())

  return data;
}

export {
  GetPagedQuizes,
  UpdateQuiz,
  CreateQuiz,
  DeleteQuiz
}