import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import {
    Users,
    Building2,
    TrendingUp,
    Activity,
    ArrowUpRight,
    DollarSign,
    UserPlus,
    AlertCircle,
    CheckCircle2,
    Clock,
    Eye
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AdminDashboardPage() {
    const userGrowthData = [
        { month: 'Jan', eleveurs: 45, veterinaires: 8, total: 53 },
        { month: 'Fév', eleveurs: 52, veterinaires: 10, total: 62 },
        { month: 'Mar', eleveurs: 61, veterinaires: 12, total: 73 },
        { month: 'Avr', eleveurs: 73, veterinaires: 15, total: 88 },
        { month: 'Mai', eleveurs: 89, veterinaires: 18, total: 107 },
        { month: 'Jun', eleveurs: 104, veterinaires: 24, total: 128 },
    ];

    const activityData = [
        { name: 'Lun', consultations: 42, vaccinations: 28, naissances: 15 },
        { name: 'Mar', consultations: 38, vaccinations: 32, naissances: 12 },
        { name: 'Mer', consultations: 51, vaccinations: 24, naissances: 18 },
        { name: 'Jeu', consultations: 45, vaccinations: 35, naissances: 14 },
        { name: 'Ven', consultations: 55, vaccinations: 29, naissances: 20 },
        { name: 'Sam', consultations: 32, vaccinations: 18, naissances: 8 },
        { name: 'Dim', consultations: 28, vaccinations: 15, naissances: 6 },
    ];

    const regionData = [
        { name: 'Dakar', value: 45, color: '#3b82f6' },
        { name: 'Thiès', value: 28, color: '#10b981' },
        { name: 'Saint-Louis', value: 22, color: '#8b5cf6' },
        { name: 'Kaolack', value: 18, color: '#f59e0b' },
        { name: 'Autres', value: 15, color: '#6366f1' },
    ];

    const recentActivities = [
        { type: 'user', message: 'Nouvel éleveur inscrit', user: 'Mamadou DIOP', time: 'Il y a 5 min', status: 'success' },
        { type: 'vet', message: 'Cabinet vétérinaire validé', user: 'Dr. Fatou SECK', time: 'Il y a 12 min', status: 'success' },
        { type: 'alert', message: 'Mise à jour système requise', user: 'Système', time: 'Il y a 1h', status: 'warning' },
        { type: 'user', message: 'Utilisateur suspendu', user: 'Ibrahima FALL', time: 'Il y a 2h', status: 'error' },
        { type: 'success', message: 'Sauvegarde automatique effectuée', user: 'Système', time: 'Il y a 3h', status: 'success' },
    ];

    return (
        <div className="flex-1 bg-gradient-to-br from-slate-950 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 space-y-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Dashboard Administrateur
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">
                            Vue d'ensemble de la plateforme Sama-Guet
                        </p>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/20">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Rapport Complet
                    </Button>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <Card className="border-none shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-100">Total Utilisateurs</CardTitle>
                            <Users className="h-5 w-5 text-blue-100" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">1,247</div>
                            <div className="flex items-center gap-1 mt-2 text-blue-100">
                                <ArrowUpRight className="w-4 h-4" />
                                <p className="text-sm">+18.2% ce mois</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-emerald-100">Cabinets Vétos</CardTitle>
                            <Building2 className="h-5 w-5 text-emerald-100" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">24</div>
                            <div className="flex items-center gap-1 mt-2 text-emerald-100">
                                <ArrowUpRight className="w-4 h-4" />
                                <p className="text-sm">+3 nouveaux</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-purple-100">Activité Mensuelle</CardTitle>
                            <Activity className="h-5 w-5 text-purple-100" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">8,542</div>
                            <div className="flex items-center gap-1 mt-2 text-purple-100">
                                <ArrowUpRight className="w-4 h-4" />
                                <p className="text-sm">+24.3% vs Mai</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-amber-100">Revenus Plateforme</CardTitle>
                            <DollarSign className="h-5 w-5 text-amber-100" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">4.8M</div>
                            <div className="flex items-center gap-1 mt-2 text-amber-100">
                                <ArrowUpRight className="w-4 h-4" />
                                <p className="text-sm">+32.1% ce mois</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Growth Chart */}
                    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                Croissance des Utilisateurs
                            </CardTitle>
                            <CardDescription>Évolution sur les 6 derniers mois</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={userGrowthData}>
                                    <defs>
                                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorEleveurs" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="month" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorTotal)"
                                        name="Total"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="eleveurs"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorEleveurs)"
                                        name="Éleveurs"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Activity Chart */}
                    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-purple-600" />
                                Activité Hebdomadaire
                            </CardTitle>
                            <CardDescription>Répartition par type d'activité</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={activityData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="name" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="consultations" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Consultations" />
                                    <Bar dataKey="vaccinations" fill="#10b981" radius={[8, 8, 0, 0]} name="Vaccinations" />
                                    <Bar dataKey="naissances" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Naissances" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Regional Distribution */}
                    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-emerald-600" />
                                Répartition Régionale
                            </CardTitle>
                            <CardDescription>Distribution des utilisateurs par région</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={regionData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {regionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                Activité Récente
                            </CardTitle>
                            <CardDescription>Dernières actions sur la plateforme</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {recentActivities.map((activity, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        activity.status === 'success' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                                            activity.status === 'warning' ? 'bg-amber-100 dark:bg-amber-900/30' :
                                                'bg-red-100 dark:bg-red-900/30'
                                    }`}>
                                        {activity.status === 'success' ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                        ) : activity.status === 'warning' ? (
                                            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-slate-900 dark:text-slate-100">{activity.message}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{activity.user}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{activity.time}</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="shrink-0">
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* System Health */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                        <CardHeader>
                            <CardTitle className="text-sm">Performance Serveur</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-600 dark:text-slate-400">CPU</span>
                                    <span className="font-medium">45%</span>
                                </div>
                                <Progress value={45} className="h-2" />
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-600 dark:text-slate-400">RAM</span>
                                    <span className="font-medium">62%</span>
                                </div>
                                <Progress value={62} className="h-2" />
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-600 dark:text-slate-400">Stockage</span>
                                    <span className="font-medium">38%</span>
                                </div>
                                <Progress value={38} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                        <CardHeader>
                            <CardTitle className="text-sm">Taux de Satisfaction</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="text-center">
                                <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    94%
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Note moyenne globale</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-lg text-center">
                                    <p className="text-2xl font-bold text-emerald-600">98%</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">Éleveurs</p>
                                </div>
                                <div className="bg-teal-50 dark:bg-teal-900/20 p-2 rounded-lg text-center">
                                    <p className="text-2xl font-bold text-teal-600">92%</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">Vétérinaires</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        <CardHeader>
                            <CardTitle className="text-sm text-blue-100">Actions Rapides</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button className="w-full bg-white/20 hover:bg-white/30 border-white/30 text-white justify-start">
                                <UserPlus className="w-4 h-4 mr-2" />
                                Ajouter utilisateur
                            </Button>
                            <Button className="w-full bg-white/20 hover:bg-white/30 border-white/30 text-white justify-start">
                                <Building2 className="w-4 h-4 mr-2" />
                                Valider cabinet
                            </Button>
                            <Button className="w-full bg-white/20 hover:bg-white/30 border-white/30 text-white justify-start">
                                <Activity className="w-4 h-4 mr-2" />
                                Voir logs système
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardPage;