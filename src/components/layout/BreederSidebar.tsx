import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import {
    LayoutDashboard,
    PawPrint,
    Heart,
    TrendingUp,
    Users,
    Settings,
    LogOut,
    Menu,
    User,
    ChevronDown,
    Shield,
    Bell,
    X, MessageCircleWarning, Cross
} from "lucide-react";
import "../../assets/styles/global.css";

interface SidebarProps {
    currentPage: string;
    onPageChange: (page: string) => void;
    userRole: "owner" | "veterinaire" | "breeder" | "assistant";
    onLogout: () => void;
}

interface StoredUser {
    name: string;
    role: string;
}

export function BreederSidebar({ currentPage, onPageChange, userRole, onLogout }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [storedUser, setStoredUser] = useState<StoredUser>({ image:'' ,name: "Utilisateur", role: userRole });


    useEffect(() => {
        const storedUserRaw = localStorage.getItem("user");
        if (storedUserRaw) {
            try {
                const parsed = JSON.parse(storedUserRaw);

                setStoredUser({
                    name: (parsed.firstname || parsed.lastname) ?
                        parsed.firstname+ ' ' + parsed.lastname :  parsed.username || parsed.email,
                    role: parsed.role || userRole,
                });
            } catch {}
        }
    }, [userRole]);

    const menuItems = [
        { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
        { id: "sujets", label: "Gestion Sujets", icon: PawPrint },
        { id: "reproduction", label: "Reproduction", icon: Heart },
        { id: "health", label: "Santé/Vaccins", icon: Cross },
        { id: "market", label: "Marché", icon: TrendingUp },
        { id: "users", label: "Utilisateurs", icon: Users },
        { id: "admin", label: "Administration", icon: Shield },
    ];

    const SidebarContent = () => (
        <div
            className="flex flex-col h-full relative"
            style={{
                backgroundColor: "var(--color-sidebar)",
                color: "var(--color-sidebar-foreground)",
                borderRight: "1px solid var(--color-sidebar-border)",
            }}
        >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "var(--color-sidebar-border)" }}>
                <div className={`flex items-center space-x-2 transition-all ${isCollapsed ? "justify-center w-full" : ""}`}>
                    <div
                        className={`${isCollapsed ? "h-0 w-0" : "w-8 h-8"} rounded-full flex items-center justify-center`}
                        style={{ backgroundColor: "var(--color-sidebar-primary)" }}
                    >
                        {!isCollapsed && <span style={{ color: "var(--color-sidebar-primary-foreground)" }}>🐑</span>}
                    </div>
                    {!isCollapsed && (
                        <div>
                            <h1 className="text-lg font-medium">Sama-Guet</h1>
                            <p className="text-xs">Gestion de bergerie</p>
                        </div>
                    )}
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex text-sidebar-foreground hover:bg-sidebar-accent rounded-full"
                >
                    <Menu className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileOpen(false)}
                    className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent rounded-full"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>

            {/* Navigation */}
            <div className="flex-1 p-2 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                        <Button
                            key={item.id}
                            variant="ghost"
                            onClick={() => {
                                onPageChange(item.id);
                                setIsMobileOpen(false);
                            }}
                            className={`w-full justify-start h-10 flex items-center gap-2 px-3 rounded-lg transition-all ${isCollapsed ? "justify-center" : ""}`}
                            style={{
                                backgroundColor: isActive ? "var(--color-sidebar-primary)" : "transparent",
                                color: isActive ? "var(--color-sidebar-primary-foreground)" : "var(--color-sidebar-foreground)",
                            }}
                        >
                            <Icon className="w-4 h-4" />
                            {!isCollapsed && <span className="truncate">{item.label}</span>}
                        </Button>
                    );
                })}
            </div>

            <Separator style={{ borderColor: "var(--color-sidebar-border)" }} />

            {/* Rappels */}
            <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MessageCircleWarning className="w-4 h-4" />
                    {!isCollapsed && <span>Rappels</span>}
                </div>
                <Badge
                    className={`${isCollapsed? 'w-1/2 h-1/2':''}`}
                    style={{
                        backgroundColor: "var(--color-accent)",
                        color: "var(--color-accent-foreground)",
                    }}
                >
                    5
                </Badge>
            </div>

            <Separator style={{ borderColor: "var(--color-sidebar-border)" }} />

            {/* Notifications */}
            <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    {!isCollapsed && <span>Notifications</span>}
                </div>
                <Badge
                    className={`${isCollapsed? 'w-1/2 h-1/2':''}`}
                    style={{
                        backgroundColor: "var(--color-destructive)",
                        color: "var(--destructive-foreground)",
                    }}
                >
                    3
                </Badge>
            </div>

            <Separator style={{ borderColor: "var(--color-sidebar-border)" }} />

            {/* Utilisateur */}
            <div className="p-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start h-auto p-2">
                            <div className="flex items-center space-x-3 w-full">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder-avatar.jpg" />
                                    <AvatarFallback
                                        style={{
                                            backgroundColor: "var(--color-sidebar-primary)",
                                            color: "var(--color-sidebar-primary-foreground)",
                                        }}
                                    >
                                        {storedUser.name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                </Avatar>
                                {!isCollapsed && (
                                    <div className="flex-1 text-left max-w-5/7">
                                        <p className="text-sm font-medium truncate">{storedUser.name}</p>
                                        <Badge
                                            className="text-xs"
                                            style={{
                                                backgroundColor: "var(--color-sidebar-accent)",
                                                color: "var(--color-sidebar-accent-foreground)",
                                            }}
                                        >
                                            {storedUser.role === 'vet' ?
                                                (
                                                    <span>Vétérinaire</span>
                                                ):(storedUser.role === 'admin'?(
                                                        <span>Administrateur</span>
                                                    ):(
                                                        <span>Eleveur</span>
                                                    )
                                                )
                                            }
                                        </Badge>
                                    </div>
                                )}
                                {!isCollapsed && <ChevronDown className="w-4 h-4" />}
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        style={{
                            backgroundColor: "var(--color-sidebar)",
                            borderColor: "var(--color-sidebar-border)",
                        }}
                    >
                        <DropdownMenuItem onClick={() => onPageChange("profile")}>
                            <User className="w-4 h-4 mr-2" />
                            Mon Profil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onPageChange("settings")}>
                            <Settings className="w-4 h-4 mr-2" />
                            Paramètres
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={onLogout} style={{ color: "var(--color-destructive)" }}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Se déconnecter
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className={`hidden lg:block ${isCollapsed ? "w-16" : "w-64"} transition-all duration-300 h-screen sticky top-0`}>
                <SidebarContent />
            </aside>

            {/* Mobile Toggle Button */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-40 bg-sidebar border border-sidebar-border shadow-lg rounded-full text-sidebar-foreground hover:bg-sidebar-accent"
            >
                <Menu className="w-5 h-5" />
            </Button>

            {/* Mobile Sidebar */}
            {isMobileOpen && (
                <>
                    <div
                        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        onClick={() => setIsMobileOpen(false)}
                    />
                    <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50 shadow-2xl animate-fadeIn">
                        <SidebarContent />
                    </aside>
                </>
            )}
        </>
    );
}
