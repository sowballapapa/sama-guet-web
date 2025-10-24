import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Separator } from './ui/separator';
import {
    LayoutDashboard,
    PawPrint,
    Heart,
    Syringe,
    TrendingUp,
    Users,
    Bell,
    Settings,
    LogOut,
    Menu,
    X,
    User,
    ChevronDown,
    Shield
} from 'lucide-react';

interface SidebarProps {
    currentPage: string;
    onPageChange: (page: string) => void;
    userRole: 'owner' | 'veterinaire' | 'eleveur' | 'assistant';
    onLogout: () => void;
}

export function Sidebar({ currentPage, onPageChange, userRole, onLogout }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, roles: ['owner', 'veterinaire', 'eleveur', 'assistant'] },
        { id: 'sheep', label: 'Gestion Sujets', icon: PawPrint, roles: ['owner', 'veterinaire', 'eleveur', 'assistant'] },
        { id: 'reproduction', label: 'Accouplements', icon: Heart, roles: ['owner', 'eleveur'] },
        { id: 'health', label: 'Santé/Vaccins', icon: Syringe, roles: ['owner', 'veterinaire'] },
        { id: 'market', label: 'Marché', icon: TrendingUp, roles: ['owner'] },
        { id: 'users', label: 'Utilisateurs', icon: Users, roles: ['owner'] },
        { id: 'admin', label: 'Administration', icon: Shield, roles: ['owner'] }
    ];

    const visibleItems = menuItems.filter(item => item.roles.includes(userRole));

    const userInfo = {
        owner: { name: 'Papa Balla SOW', role: 'Propriétaire', color: 'bg-purple-100 text-purple-700' },
        veterinaire: { name: 'Dr. Aminata FALL', role: 'Vétérinaire', color: 'bg-blue-100 text-blue-700' },
        eleveur: { name: 'Moussa DIOP', role: 'Éleveur', color: 'bg-green-100 text-green-700' },
        assistant: { name: 'Fatou NDIAYE', role: 'Assistant', color: 'bg-gray-100 text-gray-700' }
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-white border-r border-green-200">
            {/* Header */}
            <div className="p-4 border-b border-green-200">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">🐑</span>
                            </div>
                            <div>
                                <h1 className="text-lg font-medium text-green-800">Sama-Guet</h1>
                                <p className="text-xs text-amber-700">Gestion de bergerie</p>
                            </div>
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex text-green-700 hover:bg-green-50"
                    >
                        <Menu className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMobileOpen(false)}
                        className="lg:hidden text-green-700 hover:bg-green-50"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 p-2 space-y-1">
                {visibleItems.map((item) => {
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
                            className={`w-full justify-start h-10 ${
                                isActive
                                    ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                    : 'text-green-700 hover:bg-green-50'
                            }`}
                        >
                            <Icon className="w-4 h-4 mr-3" />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Button>
                    );
                })}
            </div>

            <Separator />

            {/* Notifications */}
            <div className="p-2">
                <Button
                    variant="ghost"
                    className="w-full justify-start h-10 text-green-700 hover:bg-green-50"
                >
                    <Bell className="w-4 h-4 mr-3" />
                    {!isCollapsed && (
                        <>
                            <span>Notifications</span>
                            <Badge className="ml-auto bg-red-500 text-white">3</Badge>
                        </>
                    )}
                    {isCollapsed && <Badge className="ml-1 bg-red-500 text-white text-xs">3</Badge>}
                </Button>
            </div>

            <Separator />

            {/* User Menu */}
            <div className="p-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start h-auto p-2">
                            <div className="flex items-center space-x-3 w-full">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/placeholder-avatar.jpg" />
                                    <AvatarFallback className="bg-green-100 text-green-700 text-sm">
                                        {userInfo[userRole].name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                {!isCollapsed && (
                                    <div className="flex-1 text-left">
                                        <p className="text-sm font-medium text-green-800 truncate">
                                            {userInfo[userRole].name}
                                        </p>
                                        <Badge variant="secondary" className={`text-xs ${userInfo[userRole].color}`}>
                                            {userInfo[userRole].role}
                                        </Badge>
                                    </div>
                                )}
                                {!isCollapsed && <ChevronDown className="w-4 h-4 text-green-700" />}
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="flex items-center space-x-2 p-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="/placeholder-avatar.jpg" />
                                <AvatarFallback className="bg-green-100 text-green-700">
                                    {userInfo[userRole].name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-green-800">{userInfo[userRole].name}</p>
                                <p className="text-xs text-muted-foreground">{userInfo[userRole].role}</p>
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onPageChange('profile')} className="cursor-pointer">
                            <User className="w-4 h-4 mr-2" />
                            Mon Profil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onPageChange('settings')} className="cursor-pointer">
                            <Settings className="w-4 h-4 mr-2" />
                            Paramètres
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-600 focus:text-red-600">
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
            {/* Mobile trigger */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileOpen(true)}
                className="fixed top-4 left-4 z-50 lg:hidden bg-white border border-green-200 text-green-700 hover:bg-green-50"
            >
                <Menu className="w-4 h-4" />
            </Button>

            {/* Desktop Sidebar */}
            <aside className={`hidden lg:flex flex-col ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            {isMobileOpen && (
                <div className="lg:hidden">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setIsMobileOpen(false)}
                    />

                    {/* Sidebar */}
                    <aside className="fixed top-0 left-0 h-full w-64 z-50">
                        <SidebarContent />
                    </aside>
                </div>
            )}
        </>
    );
}