
import { api, getConfig } from './Api'

const GetPagedCompetences = async ({ page, pageSize, filters, orderBy }) => {
  const { data } = await api.get(`/Competence/GetPaged?page=${page}&pageSize=${pageSize}&filters=${filters}&orderBy=${orderBy}`, getConfig())

  return data;
}

const UpdateCompetence = async (item) => {
  const { data } = await api.put('/Competence/UpdateCompetence', JSON.stringify(item), getConfig())

  return data;
}

const CreateCompetence = async (item) => {
  const { data } = await api.post('/Competence/CreateCompetence', JSON.stringify(item), getConfig())

  return data;
}

const DeleteCompetence = async (id) => {
  const { data } = await api.delete(`/Competence/DeleteCompetence?id=${id}`, getConfig())

  return data;
}

export {
  GetPagedCompetences,
  UpdateCompetence,
  CreateCompetence,
  DeleteCompetence
}