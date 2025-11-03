import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
    Calendar,
    Users,
    TrendingUp,
    Activity,
    Clock,
    Stethoscope,
    FileText,
    Package,
    Phone,

} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function VetDashboardPage() {
    const consultationsData = [
        { day: 'Lun', consultations: 12, urgences: 2 },
        { day: 'Mar', consultations: 15, urgences: 3 },
        { day: 'Mer', consultations: 10, urgences: 1 },
        { day: 'Jeu', consultations: 18, urgences: 4 },
        { day: 'Ven', consultations: 14, urgences: 2 },
        { day: 'Sam', consultations: 8, urgences: 1 },
        { day: 'Dim', consultations: 5, urgences: 0 },
    ];

    const revenusData = [
        { month: 'Jan', revenus: 450 },
        { month: 'Fév', revenus: 520 },
        { month: 'Mar', revenus: 480 },
        { month: 'Avr', revenus: 650 },
        { month: 'Mai', revenus: 720 },
        { month: 'Jun', revenus: 890 },
    ];

    const todayAppointments = [
        { time: '09:00', patient: 'Troupeau DIOP', type: 'Vaccination', status: 'completed', eleveur: 'Moussa DIOP', contact: '+221 77 123 45 67' },
        { time: '10:30', patient: 'Bergerie FALL', type: 'Consultation', status: 'in-progress', eleveur: 'Aminata FALL', contact: '+221 76 234 56 78' },
        { time: '14:00', patient: 'Troupeau NDIAYE', type: 'Urgence', status: 'upcoming', eleveur: 'Ibrahima NDIAYE', contact: '+221 78 345 67 89' },
        { time: '16:00', patient: 'Bergerie SOW', type: 'Suivi', status: 'upcoming', eleveur: 'Fatou SOW', contact: '+221 77 456 78 90' },
    ];

    const waitingPatients = [
        { name: 'Troupeau SARR', eleveur: 'Papa SARR', issue: 'Blessure', priority: 'high', waiting: '15 min' },
        { name: 'Bergerie BA', eleveur: 'Awa BA', issue: 'Vaccination', priority: 'medium', waiting: '5 min' },
        { name: 'Troupeau CISSE', eleveur: 'Oumar CISSE', issue: 'Consultation', priority: 'low', waiting: '2 min' },
    ];

    return (
        <div className="flex-1 bg-gradient-to-br from-teal-50 via-emerald-50/30 to-cyan-50/30 dark:from-slate-950 dark:via-teal-950/30 dark:to-slate-950 p-4 md:p-6 space-y-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                            Cabinet Vétérinaire
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">
                            Bonjour Dr. Aminata FALL - {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-lg shadow-teal-500/20">
                        <Calendar className="w-4 h-4 mr-2" />
                        Nouveau RDV
                    </Button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <Card className="border-none shadow-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-teal-100">RDV Aujourd'hui</CardTitle>
                            <Calendar className="h-5 w-5 text-teal-100" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">8</div>
                            <p className="text-sm text-teal-100 mt-2">3 complétés, 5 à venir</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-emerald-100">Patients Actifs</CardTitle>
                            <Users className="h-5 w-5 text-emerald-100" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">142</div>
                            <p className="text-sm text-emerald-100 mt-2">+12 ce mois</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-cyan-100">Consultations/mois</CardTitle>
                            <Stethoscope className="h-5 w-5 text-cyan-100" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">82</div>
                            <p className="text-sm text-cyan-100 mt-2">+18% vs mois dernier</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-100">Revenus du mois</CardTitle>
                            <TrendingUp className="h-5 w-5 text-blue-100" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">890K</div>
                            <p className="text-sm text-blue-100 mt-2">FCFA +23%</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Today's Schedule */}
                    <Card className="lg:col-span-2 border-none shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-teal-600" />
                                Planning d'Aujourd'hui
                            </CardTitle>
                            <CardDescription>Rendez-vous et consultations</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {todayAppointments.map((apt, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-teal-600">{apt.time.split(':')[0]}</div>
                                        <div className="text-sm text-slate-500">{apt.time.split(':')[1]}</div>
                                    </div>
                                    <div className="h-12 w-px bg-slate-300 dark:bg-slate-600" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-semibold text-slate-900 dark:text-slate-100">{apt.patient}</h4>
                                            <Badge className={`
                        ${apt.status === 'completed' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : ''}
                        ${apt.status === 'in-progress' ? 'bg-blue-100 text-blue-700 border-blue-200' : ''}
                        ${apt.status === 'upcoming' ? 'bg-slate-100 text-slate-700 border-slate-200' : ''}
                      `}>
                                                {apt.status === 'completed' ? 'Terminé' : apt.status === 'in-progress' ? 'En cours' : 'À venir'}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Stethoscope className="w-3 h-3" />
                          {apt.type}
                      </span>
                                            <span>•</span>
                                            <span>{apt.eleveur}</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="shrink-0">
                                        <Phone className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Waiting Patients */}
                    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-amber-600" />
                                Salle d'Attente
                            </CardTitle>
                            <CardDescription>Patients en attente</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {waitingPatients.map((patient, i) => (
                                <div key={i} className={`p-3 rounded-lg border-l-4 ${
                                    patient.priority === 'high' ? 'bg-red-50 border-red-500 dark:bg-red-900/20' :
                                        patient.priority === 'medium' ? 'bg-amber-50 border-amber-500 dark:bg-amber-900/20' :
                                            'bg-blue-50 border-blue-500 dark:bg-blue-900/20'
                                }`}>
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">{patient.name}</h4>
                                        <Badge className={`text-xs ${
                                            patient.priority === 'high' ? 'bg-red-100 text-red-700 border-red-200' :
                                                patient.priority === 'medium' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                                    'bg-blue-100 text-blue-700 border-blue-200'
                                        }`}>
                                            {patient.priority === 'high' ? 'Urgent' : patient.priority === 'medium' ? 'Moyen' : 'Normal'}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">{patient.eleveur}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-500">{patient.issue} • Attente: {patient.waiting}</p>
                                </div>
                            ))}
                            <Button className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 mt-2">
                                Appeler le suivant
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-teal-600" />
                                Consultations Hebdomadaires
                            </CardTitle>
                            <CardDescription>Répartition des consultations et urgences</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={consultationsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="day" stroke="#64748b" />
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
                                    <Bar dataKey="consultations" fill="#14b8a6" radius={[8, 8, 0, 0]} name="Consultations" />
                                    <Bar dataKey="urgences" fill="#f97316" radius={[8, 8, 0, 0]} name="Urgences" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-emerald-600" />
                                Évolution des Revenus
                            </CardTitle>
                            <CardDescription>Revenus mensuels (milliers FCFA)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={280}>
                                <LineChart data={revenusData}>
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
                                    <Line
                                        type="monotone"
                                        dataKey="revenus"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        dot={{ fill: '#10b981', r: 6 }}
                                        name="Revenus"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-none shadow-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                                <FileText className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Nouvelle Ordonnance</h3>
                                <p className="text-sm text-teal-100">Créer une prescription</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                                <Package className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Inventaire</h3>
                                <p className="text-sm text-blue-100">Gérer le stock</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                                <Activity className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Rapports</h3>
                                <p className="text-sm text-purple-100">Voir les statistiques</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default VetDashboardPage;