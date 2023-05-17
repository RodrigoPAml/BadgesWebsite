
import { api, getConfig } from './Api'

const GetPagedCourses = async ({ page, pageSize, filters, orderBy }) => {
  const { data } = await api.get(`/Course/GetPaged?page=${page}&pageSize=${pageSize}&filters=${filters}&orderBy=${orderBy}`, getConfig())

  return data;
}

const UpdateCourse = async (item) => {
  const { data } = await api.put('/Course/UpdateCourse', JSON.stringify(item), getConfig())

  return data;
}

const CreateCourse = async (item) => {
  const { data } = await api.post('/Course/CreateCourse', JSON.stringify(item), getConfig())

  return data;
}

const DeleteCourse = async (id) => {
  const { data } = await api.delete(`/Course/DeleteCourse?id=${id}`, getConfig())

  return data;
}

export {
  GetPagedCourses,
  UpdateCourse,
  CreateCourse,
  DeleteCourse
}