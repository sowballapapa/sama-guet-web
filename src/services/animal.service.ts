import api from "./api.ts";


export const createAnimal = async (formData: FormData): Promise<any> => {
  const res = await api.post('/animals/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

