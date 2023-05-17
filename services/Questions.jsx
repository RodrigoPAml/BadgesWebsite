
import { api, getConfig } from './Api'

const GetPagedQuestions = async ({ page, pageSize, filters, orderBy }) => {
  const { data } = await api.get(`/Question/GetPaged?page=${page}&pageSize=${pageSize}&filters=${filters}&orderBy=${orderBy}`, getConfig())

  return data;
}

const UpdateQuestion = async (item) => {
  const { data } = await api.put('/Question/UpdateQuestion', JSON.stringify(item), getConfig())

  return data;
}

const CreateQuestion = async (item) => {
  const { data } = await api.post('/Question/CreateQuestion', JSON.stringify(item), getConfig())

  return data;
}

const DeleteQuestion = async (id) => {
  const { data } = await api.delete(`/Question/DeleteQuestion?id=${id}`, getConfig())

  return data;
}

export {
  GetPagedQuestions,
  UpdateQuestion,
  CreateQuestion,
  DeleteQuestion
}