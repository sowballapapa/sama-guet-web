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
    },
    logout: async() =>{
        const res = await api.post('users/logout', {})
        return res
    },
    tokenRefresh: async () =>{
        const token_refresh =localStorage.getItem('token_refresh')
        const res = await api.post('users/token/refresh/', {refresh: token_refresh})
        if (res){
            localStorage.setItem('token_access', res.data.access)
            localStorage.setItem('token_refresh', res.data.refresh)
            localStorage.setItem('user', res.data.user)
        }
        return res
    }
}