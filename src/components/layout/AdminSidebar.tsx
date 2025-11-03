import { useState } from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import {
    LayoutDashboard,
    Users,
    Building2,
    Settings,
    LogOut,
    Menu,
    X,
    Shield,
    BarChart3,
    Database,
    Bell,
    FileText,
    HelpCircle
} from 'lucide-react';

interface AdminSidebarProps {
    currentPage: string;
    onPageChange: (page: string) => void;
    onLogout: () => void;
}

export function AdminSidebar({ currentPage, onPageChange, onLogout }: AdminSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const menuItems = [
        { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
        { id: 'admin-users', label: 'Utilisateurs', icon: Users, badge: '24' },
        { id: 'admin-vets', label: 'Cabinets Vétos', icon: Building2, badge: '8' },
        { id: 'admin-stats', label: 'Statistiques', icon: BarChart3, badge: null },
        { id: 'admin-data', label: 'Base de données', icon: Database, badge: null },
        { id: 'admin-reports', label: 'Rapports', icon: FileText, badge: '3' },
        { id: 'admin-notifications', label: 'Notifications', icon: Bell, badge: '12' },
        { id: 'admin-app-administration', label: "Page d'administration", icon: Settings, badge: null },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700">
            {/* Header */}
            <div className="p-4 border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-3">
                            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-base font-semibold text-white">Admin Panel</h1>
                                <p className="text-xs text-slate-400">Sama-Guet</p>
                            </div>
                        </div>
                    )}
                    {isCollapsed && (
                        <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 mx-auto">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex text-slate-400 hover:text-white hover:bg-slate-700/50 ml-2 rounded-full"
                    >
                        <Menu className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMobileOpen(false)}
                        className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-full"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* User Info */}
            {!isCollapsed && (
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-b border-slate-700">
                    <div className="flex items-center space-x-3">
                        <Avatar className="w-11 h-11 border-2 border-blue-500/30 shadow-md">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                                AD
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate">
                                Administrateur
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                                Super Admin
                            </p>
                        </div>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                            En ligne
                        </Badge>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = currentPage === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                onPageChange(item.id);
                                setIsMobileOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
                                isActive
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                            } ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <Icon className={`${isCollapsed ? 'w-5 h-5' : 'w-5 h-5'} shrink-0 ${isActive ? 'animate-pulse' : ''}`} />
                            {!isCollapsed && (
                                <>
                                    <span className="font-medium truncate flex-1 text-left">{item.label}</span>
                                    {item.badge && (
                                        <Badge className={`${isActive ? 'bg-white/20 text-white' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'} px-2 py-0.5`}>
                                            {item.badge}
                                        </Badge>
                                    )}
                                </>
                            )}
                            {isCollapsed && item.badge && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                                    {item.badge}
                                </div>
                            )}
                        </button>
                    );
                })}
            </nav>

            <Separator className="bg-slate-700" />

            {/* Bottom Actions */}
            <div className="p-3 space-y-1 bg-slate-800/50">
                <button
                    onClick={() => {
                        onPageChange('admin-settings');
                        setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        currentPage === 'admin-settings'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                >
                    <Settings className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="font-medium">Paramètres</span>}
                </button>

                <button
                    onClick={() => {
                        onPageChange('admin-help');
                        setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        currentPage === 'admin-help'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                >
                    <HelpCircle className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="font-medium">Aide</span>}
                </button>

                <button
                    onClick={onLogout}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-red-400 hover:bg-red-500/10 hover:text-red-300 ${
                        isCollapsed ? 'justify-center' : ''
                    }`}
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="font-medium">Déconnexion</span>}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className={`hidden lg:block transition-all duration-300 ${
                isCollapsed ? 'w-20' : 'w-72'
            } h-screen sticky top-0`}>
                <SidebarContent />
            </aside>

            {/* Mobile Toggle Button */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-40 bg-slate-800 border border-slate-700 shadow-lg rounded-full text-white hover:bg-slate-700"
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
                    <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-72 z-50 shadow-2xl animate-fadeIn">
                        <SidebarContent />
                    </aside>
                </>
            )}
        </>
    );
}
