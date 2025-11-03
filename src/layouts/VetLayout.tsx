import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { VetSidebar } from "../components/layout/VetSidebar";
import {Header} from "../components/layout/Header.tsx";

export default function VetLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(
        location.pathname.split("/").pop() || "vet-dashboard"
    );

    const handlePageChange = (page: string) => {
        setCurrentPage(page);

        const routeMap: Record<string, string> = {
            "vet-dashboard": "/espace-vet",
            "vet-appointments": "/espace-vet/rendez-vous",
            "vet-patients": "/espace-vet/patients",
            "vet-consultations": "/espace-vet/consultations",
            "vet-prescriptions": "/espace-vet/ordonnances",
            "vet-inventory": "/espace-vet/inventaire",
            "vet-stats": "/espace-vet/statistiques",
            "vet-notifications": "/espace-vet/notifications",
            "vet-settings": "/profile/settings",
        };

        navigate(routeMap[page] || "/espace-vet");
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token_access");
        navigate("/login");
    };


    return (
        <div className="flex h-screen">
            <VetSidebar
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onLogout={handleLogout}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto bg-gray-50 ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
