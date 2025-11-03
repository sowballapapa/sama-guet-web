import api from "./api.ts";


export const listRaces = async (): Promise<{ id: number; name: string }[]> => {
    const res = await api.get('/races/');
    return res.data;
};

export const createRace = async (payload: { name: string }): Promise<{ id: number; name: string }> => {
    const res = await api.post('/races/', payload);
    return res.data;
};

export const getRace = async  (id:number): Promise<{ id: number; name: string }> => {
    const res = await api.get(`/races/${id}/`)
    return res.data
}

export const updateRace = async  (id:number, payload: { name: string } ): Promise<{ id: number; name: string }> => {
    const res = await api.put(`/races/${id}/`, payload)
    return res.data
}

export const deleteRace = async  (id:number): Promise<{ id: number; name: string }> => {
    const res = await api.delete(`/races/${id}/`)
    return res.data
}

