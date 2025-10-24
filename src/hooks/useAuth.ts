import { useEffect, useState } from "react";

export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "vet" | "breeder"; //les rôles possibles
  has_farm?: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token_access");

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        // On vérifie que le token existe avant d’accepter la session
        if (token) {
          setUser(parsedUser);
        } else {
          // Si le token est manquant, on nettoie pour éviter un faux "login"
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Erreur parsing user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  return user;
};
