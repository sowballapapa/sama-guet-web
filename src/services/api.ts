import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";


const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor : ajoute token automatiquement
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token_access");
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor : gestion globale des erreurs
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            toast.error("Erreur réseau, veuillez vérifier votre connexion.");
        } else {
            const status = error.response.status;

            switch (status) {
                case 400:
                    toast.error("Requête invalide.");
                    break;
                case 401:
                    toast.error("Non autorisé. Veuillez vous reconnecter.");
                    // ici tu peux faire un logout automatique si besoin
                    break;
                case 403:
                    toast.error("Accès refusé.");
                    break;
                case 404:
                    toast.error("Ressource non trouvée.");
                    break;
                case 500:
                    toast.error("Erreur serveur. Veuillez réessayer plus tard.");
                    break;
                default:
                    toast.error(error.response.data?.message || "Une erreur est survenue.");
            }
        }
        return Promise.reject(error);
    }
);


export default api