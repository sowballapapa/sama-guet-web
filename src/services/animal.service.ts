import api from "./api.ts";


export const createAnimal = async (formData: FormData): Promise<any> => {
  const res = await api.post('/animals/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export const listAnimal = async (): Promise<any> => {
    const res = await api.get('/animals/')
    return res.data
}


export const updateAnimal = async (id:number, formData: FormData): Promise<any> => {
    const res = await api.patch(`/animals/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
}

export const deleteAnimal = async (id:number): Promise<any> => {
    const res = await api.delete(`/animals/${id}/`)
    return res.data
}