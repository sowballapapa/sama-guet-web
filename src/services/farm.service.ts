import api from './api'

export const createFarm = async (formData: any): Promise<any> => {
  const res = await api.post('/farms/', formData)
  return res.data
}

export const listOfMyFarms = async (): Promise<any> =>{
    const res = await api.get('/farms/my-farms/')
    return res
}