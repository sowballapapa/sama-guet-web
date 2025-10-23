import api from './api'

export const authService = {
    login: async (username: string, password: string) => {
        const response = await api.post('/users/login/', {
            username,
            password
        })
        return response.data
    },
    register: async (data: any) => {
        const response = await api.post('/users/register/',data)
        return response
    }
}