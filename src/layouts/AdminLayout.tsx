import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AdminSidebar } from "../components/layout/AdminSidebar";
import {Header} from "../components/layout/Header.tsx";

function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    // Détermine la page active à partir de l’URL
    const getCurrentPage = () => {
        const path = location.pathname.split("/").pop();
        switch (path) {
            case "utilisateurs":
                return "admin-users";
            case "vets":
            case "cabinets-veto":
                return "admin-vets";
            case "stats":
                return "admin-stats";
            case "database":
                return "admin-data";
            case "rapports":
                return "admin-reports";
            case "notifications":
                return "admin-notifications";
            case "parametres":
                return "admin-settings";
            case "aide":
                return "admin-help";
            case "app-administration":
                return "admin-app-administration";
            default:
                return "admin-dashboard";
        }
    };

    const [currentPage, setCurrentPage] = useState<string>(getCurrentPage());

    // Fonction appelée quand on clique dans la sidebar
    const handlePageChange = (page: string) => {
        setCurrentPage(page);
        switch (page) {
            case "admin-dashboard":
                navigate("/espace-admin");
                break;
            case "admin-users":
                navigate("/espace-admin/utilisateurs");
                break;
            case "admin-vets":
                navigate("/espace-admin/cabinets-veto");
                break;
            case "admin-stats":
                navigate("/espace-admin/stats");
                break;
            case "admin-data":
                navigate("/espace-admin/database");
                break;
            case "admin-reports":
                navigate("/espace-admin/rapports");
                break;
            case "admin-notifications":
                navigate("/espace-admin/notifications");
                break;
            case "admin-app-administration":
                navigate("/espace-admin/app-administration");
                break;
            case "admin-settings":
                navigate("/espace-admin/parametres");
                break;
            case "admin-help":
                navigate("/espace-admin/aide");
                break;
            default:
                navigate("/espace-admin");
                break;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen ">
            {/* Sidebar */}
            <AdminSidebar
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onLogout={handleLogout}
            />
            <div className="flex flex-col flex-1 overflow-hidden">

                <Header />

                {/* Contenu principal */}
                <main className="flex-1 overflow-y-auto bg-slate-950">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}

export default AdminLayout;
