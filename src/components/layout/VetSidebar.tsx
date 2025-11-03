import { useState } from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Settings,
    LogOut,
    Menu,
    X,
    Stethoscope,
    FileText,
    Bell,
    TrendingUp,
    Package
} from 'lucide-react';

interface VetSidebarProps {
    currentPage: string;
    onPageChange: (page: string) => void;
    onLogout: () => void;
}

export function VetSidebar({ currentPage, onPageChange, onLogout }: VetSidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const menuItems = [
        { id: 'vet-dashboard', label: 'Tableau de bord', icon: LayoutDashboard, badge: null },
        { id: 'vet-appointments', label: 'Rendez-vous', icon: Calendar, badge: '8' },
        { id: 'vet-patients', label: 'Patients', icon: Users, badge: '142' },
        { id: 'vet-consultations', label: 'Consultations', icon: Stethoscope, badge: null },
        { id: 'vet-prescriptions', label: 'Ordonnances', icon: FileText, badge: '3' },
        { id: 'vet-inventory', label: 'Inventaire', icon: Package, badge: null },
        { id: 'vet-stats', label: 'Statistiques', icon: TrendingUp, badge: null },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-gradient-to-b from-teal-900 via-teal-800 to-teal-900 border-r border-teal-700">
            {/* Header */}
            <div className="p-4 border-b border-teal-700 bg-teal-800/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-3">
                            <div className="w-11 h-11 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                                <Stethoscope className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-base font-semibold text-white">Cabinet Véto</h1>
                                <p className="text-xs text-teal-300">Sama-Guet Pro</p>
                            </div>
                        </div>
                    )}
                    {isCollapsed && (
                        <div className="w-11 h-11 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20 mx-auto">
                            <Stethoscope className="w-6 h-6 text-white" />
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex text-teal-300 hover:text-white hover:bg-teal-700/50 ml-2 rounded-full"
                    >
                        <Menu className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMobileOpen(false)}
                        className="lg:hidden text-teal-300 hover:text-white hover:bg-teal-700/50 rounded-full"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* User Info */}
            {!isCollapsed && (
                <div className="p-4 bg-gradient-to-r from-teal-500/10 to-emerald-600/10 border-b border-teal-700">
                    <div className="flex items-center space-x-3">
                        <Avatar className="w-11 h-11 border-2 border-teal-400/30 shadow-md">
                            <AvatarFallback className="bg-gradient-to-br from-teal-400 to-emerald-600 text-white font-medium">
                                AF
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate">
                                Dr. Aminata FALL
                            </p>
                            <p className="text-xs text-teal-300 truncate">
                                Vétérinaire
                            </p>
                        </div>
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                            Actif
                        </Badge>
                    </div>
                </div>
            )}

            {/* Quick Stats */}
            {!isCollapsed && (
                <div className="p-4 grid grid-cols-2 gap-3 border-b border-teal-700">
                    <div className="bg-teal-700/30 rounded-lg p-3 backdrop-blur-sm">
                        <p className="text-xs text-teal-300">Aujourd'hui</p>
                        <p className="text-xl font-bold text-white">8</p>
                        <p className="text-xs text-teal-400">RDV</p>
                    </div>
                    <div className="bg-emerald-700/30 rounded-lg p-3 backdrop-blur-sm">
                        <p className="text-xs text-emerald-300">En attente</p>
                        <p className="text-xl font-bold text-white">3</p>
                        <p className="text-xs text-emerald-400">Patients</p>
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
                                    ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20'
                                    : 'text-teal-200 hover:bg-teal-700/50 hover:text-white'
                            } ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <Icon className={`${isCollapsed ? 'w-5 h-5' : 'w-5 h-5'} shrink-0`} />
                            {!isCollapsed && (
                                <>
                                    <span className="font-medium truncate flex-1 text-left">{item.label}</span>
                                    {item.badge && (
                                        <Badge className={`${isActive ? 'bg-white/20 text-white' : 'bg-teal-500/20 text-teal-300 border-teal-500/30'} px-2 py-0.5`}>
                                            {item.badge}
                                        </Badge>
                                    )}
                                </>
                            )}
                            {isCollapsed && item.badge && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                                    {item.badge}
                                </div>
                            )}
                        </button>
                    );
                })}
            </nav>

            <Separator className="bg-teal-700" />

            {/* Bottom Actions */}
            <div className="p-3 space-y-1 bg-teal-800/50">
                <button
                    onClick={() => {
                        onPageChange('vet-notifications');
                        setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        currentPage === 'vet-notifications'
                            ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20'
                            : 'text-teal-200 hover:bg-teal-700/50 hover:text-white'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                >
                    <Bell className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="font-medium">Notifications</span>}
                    {!isCollapsed && (
                        <Badge className="bg-red-500/20 text-red-300 border-red-500/30 ml-auto">
                            5
                        </Badge>
                    )}
                </button>

                <button
                    onClick={() => {
                        onPageChange('vet-settings');
                        setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        currentPage === 'vet-settings'
                            ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20'
                            : 'text-teal-200 hover:bg-teal-700/50 hover:text-white'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                >
                    <Settings className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="font-medium">Paramètres</span>}
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
                className="lg:hidden fixed top-4 left-4 z-40 bg-teal-800 border border-teal-700 shadow-lg rounded-full text-white hover:bg-teal-700"
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
