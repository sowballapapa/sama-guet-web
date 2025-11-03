import {useEffect, useRef, useState} from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
    const user = useAuth();
    const hasShownToast = useRef(false);
    // État pour suivre si l’authentification a été chargée
    const [loaded, setLoaded] = useState(false);

    // Vérifie quand l’état de l’authentification est prêt
    useEffect(() => {
        if (user !== undefined) setLoaded(true);
    }, [user]);

    // Affiche le toast seulement une fois si l’utilisateur n’est pas connecté
    useEffect(() => {
        if (loaded && !user && !hasShownToast.current) {
            toast.error("Vous devez être connecté pour accéder à cette page");
            hasShownToast.current = true;
        }
    }, [loaded, user]);

    if (!loaded) return null; // Attendre que l’état de l’authentification soit chargé

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoute = () => {
    const user = useAuth();
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (user && !hasShownToast.current) {
            toast.info("Vous êtes déjà connecté");
            hasShownToast.current = true;
        }
    }, [user]);

    return !user ? <Outlet/> : <Navigate to="/" replace />;
}

// Espace Admin
export const AdminRoute = () => {
    const user = useAuth();
    const hasShownToast = useRef(false);
    // État pour suivre si l’authentification a été chargée
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (user !== null) setLoaded(true);
    }, [user]);

    useEffect(() => {
        if (loaded && user?.role !== "admin" && !hasShownToast.current) {
            toast.error("Vous n'avez pas les droits pour accéder à cette page");
            hasShownToast.current = true;
        }
    }, [loaded, user]);

    if (!loaded) return null;

    return user?.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

// Espace Vétérinaire
export const VetRoute = () => {
  const user = useAuth();
  const hasShownToast = useRef(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (user !== null) setLoaded(true);
  }, [user]);

  useEffect(() => {
        if (loaded && user?.role !== "vet" && !hasShownToast.current) {
            toast.error("Vous n'avez pas les droits pour accéder à cette page");
            hasShownToast.current = true;
        }
    }, [loaded, user]);

    if (!loaded) return null;

  return user?.role === "vet" ? <Outlet /> : <Navigate to="/" replace />;
};

// Espace Éleveur
export const BreederRoute = () => {
  const user = useAuth();
  const hasShownToast = useRef(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (user !== null) setLoaded(true);
  }, [user]);

  useEffect(() => {
    if (loaded && user?.has_farm === false && !hasShownToast.current) {
        toast.warning("Vous devez créer un espace éleveur pour accéder à cette page");
        hasShownToast.current = true;
    }
    }, [loaded,user]);

    if (!loaded) return null;

  return (user?.has_farm) ? <Outlet/> :  <Navigate to="/creation-espace" replace />;

};