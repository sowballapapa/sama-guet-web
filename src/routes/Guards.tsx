import  { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
    const isAuthenticated = useAuth();
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (!isAuthenticated && !hasShownToast.current) {
            toast.error("Vous devez être connecté pour accéder à cette page");
            hasShownToast.current = true;
        }
    }, [isAuthenticated]);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoute = () => {
    const isAuthenticated = useAuth();
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (isAuthenticated && !hasShownToast.current) {
            toast.info("Vous êtes déjà connecté");
            hasShownToast.current = true;
        }
    }, [isAuthenticated]);

    return !isAuthenticated ? <Outlet/> : <Navigate to="/" replace />;
}

// Espace Admin
export const AdminRoute = () => {
  const user = useAuth();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (user?.role !== "admin" && !hasShownToast.current) {
      toast.error("Vous n'avez pas les droits pour accéder à cette page");
      hasShownToast.current = true;
    }
    }, [user]);
  return user?.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

// Espace Vétérinaire
export const VetRoute = () => {
  const user = useAuth();
  const hasShownToast = useRef(false);

  useEffect(() => {
    console.log(user)
    if (user?.role !== "vet" && !hasShownToast.current) {
      toast.error("Vous n'avez pas les droits pour accéder à cette page");
      hasShownToast.current = true;
    }
    }, [user]);

  return user?.role === "vet" ? <Outlet /> : <Navigate to="/" replace />;
};

// Espace Éleveur
export const BreederRoute = () => {
  const user = useAuth();
  const hasShownToast = useRef(false);
    useEffect(() => {
    if (user?.has_farm === false && !hasShownToast.current) {
        toast.error("Vous devez créer un espace éleveur pour accéder à cette page");
        hasShownToast.current = true;
    }
    }, [user]); 

  return (user?.has_farm) ? <Outlet/> :  <Navigate to="/creer-espace-éleveur" replace />;

};