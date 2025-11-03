import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BreederSidebar } from "../components/layout/BreederSidebar";
import { Header } from "../components/layout/Header";

function BreederLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(location.pathname.split("/").pop() || "dashboard");

    const handlePageChange = (page: string) => {
        setCurrentPage(page);
        const routeMap: Record<string, string> = {
            dashboard: "/espace-eleveur",
            sujets: "/espace-eleveur/sujets",
            reproduction: "/espace-eleveur/reproduction",
            health: "/espace-eleveur/sante",
            market: "/espace-eleveur/marche",
            users: "/espace-eleveur/utilisateurs",
            admin: "/espace-eleveur/administration",
            reminders: "/espace-eleveur/rappels",
            profile: "/profile",
            settings: "/profile/settings"
        };
        navigate(routeMap[page] || "/espace-eleveur");
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token_access");
        navigate("/login");
    };

    const storedUserRaw = localStorage.getItem("user");
    const userRole = storedUserRaw ? JSON.parse(storedUserRaw).role : "breeder";

    return (
        <div className="flex h-screen ">
            <BreederSidebar
                currentPage={currentPage}
                onPageChange={handlePageChange}
                userRole={userRole}
                onLogout={handleLogout}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default BreederLayout;
