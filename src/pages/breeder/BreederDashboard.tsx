import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import {
    PawPrint,
    Heart,
    Syringe,
    TrendingUp,
    Calendar,
    AlertTriangle,
    CheckCircle,
    Activity,
    BarChart3,
    DollarSign,
    ArrowUpRight,

} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

function BreederDashboard() {
    const evolutionData = [
        { month: 'Jan', total: 98, naissances: 12, ventes: 8, deces: 2 },
        { month: 'Fév', total: 102, naissances: 15, ventes: 9, deces: 2 },
        { month: 'Mar', total: 108, naissances: 18, ventes: 6, deces: 1 },
        { month: 'Avr', total: 115, naissances: 22, ventes: 13, deces: 2 },
        { month: 'Mai', total: 121, naissances: 19, ventes: 11, deces: 2 },
        { month: 'Jun', total: 127, naissances: 25, ventes: 18, deces: 1 }
    ];

    const raceData = [
        { name: 'Peul-Peul', value: 45 },
        { name: 'Touabire', value: 32 },
        { name: 'Waralé', value: 25 },
        { name: 'Djallonké', value: 15 },
        { name: 'Mauritanien', value: 10 }
    ];

    const healthData = [
        { name: 'Excellente', value: 65 },
        { name: 'Bonne', value: 45 },
        { name: 'À surveiller', value: 12 },
        { name: 'Malade', value: 5 }
    ];

    const revenusData = [
        { month: 'Jan', revenus: 450000, depenses: 180000 },
        { month: 'Fév', revenus: 620000, depenses: 210000 },
        { month: 'Mar', revenus: 380000, depenses: 165000 },
        { month: 'Avr', revenus: 890000, depenses: 240000 },
        { month: 'Mai', revenus: 720000, depenses: 195000 },
        { month: 'Jun', revenus: 1250000, depenses: 320000 }
    ];

    const CHART_COLORS = {
        primary: '#2E7D32',
        secondary: '#6D4C41',
        accent: '#FFC107',
        success: '#4CAF50',
        warning: '#FF9800',
        danger: '#f44336'
    };

    const upcomingEvents = [
        { type: 'vaccination', title: 'Rappel vaccin PPR', date: 'Dans 2 jours', count: 15, icon: Syringe, color: 'text-secondary' },
        { type: 'naissance', title: 'Naissances prévues', date: 'Dans 5 jours', count: 8, icon: Heart, color: 'text-primary' },
        { type: 'accouplement', title: 'Période de chaleur', date: 'Cette semaine', count: 6, icon: Activity, color: 'text-accent' },
    ];

    return (
        <div className="flex-1 bg-background p-4 md:p-6 space-y-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Welcome Section */}
                <div className="flex items-center justify-between min-w-1/2">
                    <div>
                        <h1 className="text-3xl text-foreground mb-2">Tableau de Bord</h1>
                        <p className="text-muted-foreground">Vue d'ensemble de votre bergerie Sama-Guet</p>
                    </div>
                    <Button className="rounded-full bg-primary hover:bg-primary/90">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Rapport Complet
                    </Button>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <Card className="border-border bg-card hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Animaux</CardTitle>
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <PawPrint className="h-5 w-5 text-primary" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold text-foreground">127</div>
                            <div className="flex items-center gap-1 mt-2">
                                <ArrowUpRight className="w-4 h-4 text-primary" />
                                <p className="text-sm text-primary">+5.2% ce mois</p>
                            </div>
                            <div className="mt-3 pt-3 border-t border-border">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">♀ Femelles: 89</span>
                                    <span className="text-muted-foreground">♂ Mâles: 38</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border bg-card hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Gestations en cours</CardTitle>
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Heart className="h-5 w-5 text-primary" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold text-foreground">12</div>
                            <div className="flex items-center gap-1 mt-2">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                <p className="text-sm text-primary">8 naissances prévues</p>
                            </div>
                            <div className="mt-3 pt-3 border-t border-border">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Taux de réussite</span>
                                    <span className="text-sm font-medium text-primary">94%</span>
                                </div>
                                <Progress value={94} className="h-2 mt-2" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border bg-card hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Vaccinations</CardTitle>
                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                                <Syringe className="h-5 w-5 text-secondary" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold text-foreground">23</div>
                            <div className="flex items-center gap-1 mt-2">
                                <Calendar className="w-4 h-4 text-secondary" />
                                <p className="text-sm text-secondary">Rappels ce mois</p>
                            </div>
                            <div className="mt-3 pt-3 border-t border-border">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Couverture</span>
                                    <span className="text-sm font-medium text-secondary">92%</span>
                                </div>
                                <Progress value={92} className="h-2 mt-2" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border bg-card hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Revenus du mois</CardTitle>
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                <TrendingUp className="h-5 w-5 text-accent" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold text-foreground">1.25M</div>
                            <div className="flex items-center gap-1 mt-2">
                                <ArrowUpRight className="w-4 h-4 text-accent" />
                                <p className="text-sm text-accent">+73% vs Mai</p>
                            </div>
                            <div className="mt-3 pt-3 border-t border-border">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Bénéfice net</span>
                                    <span className="text-sm font-medium text-accent">930K FCFA</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Evolution du Troupeau */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-primary" />
                                Évolution du Troupeau
                            </CardTitle>
                            <CardDescription>Croissance sur les 6 derniers mois</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={280}>
                                <LineChart data={evolutionData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                    <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                                    <YAxis stroke="var(--muted-foreground)" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--card)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="total"
                                        stroke={CHART_COLORS.primary}
                                        strokeWidth={3}
                                        name="Total"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="naissances"
                                        stroke={CHART_COLORS.success}
                                        strokeWidth={2}
                                        name="Naissances"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="ventes"
                                        stroke={CHART_COLORS.accent}
                                        strokeWidth={2}
                                        name="Ventes"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Répartition par Race */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PawPrint className="w-5 h-5 text-primary" />
                                Répartition par Race
                            </CardTitle>
                            <CardDescription>Distribution des races africaines</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                    <Pie
                                        data={raceData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={90}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {raceData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={[
                                                    CHART_COLORS.primary,
                                                    CHART_COLORS.success,
                                                    CHART_COLORS.secondary,
                                                    CHART_COLORS.accent,
                                                    CHART_COLORS.warning
                                                ][index % 5]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--card)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '8px'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* État de Santé */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-primary" />
                                État de Santé Global
                            </CardTitle>
                            <CardDescription>Répartition de l'état de santé du troupeau</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={healthData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                    <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                                    <YAxis stroke="var(--muted-foreground)" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--card)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Revenus & Dépenses */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-accent" />
                                Revenus & Dépenses
                            </CardTitle>
                            <CardDescription>Analyse financière sur 6 mois (FCFA)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={revenusData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                    <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                                    <YAxis stroke="var(--muted-foreground)" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--card)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="revenus" fill={CHART_COLORS.accent} radius={[8, 8, 0, 0]} name="Revenus" />
                                    <Bar dataKey="depenses" fill={CHART_COLORS.secondary} radius={[8, 8, 0, 0]} name="Dépenses" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Événements à Venir & Alertes */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Événements à venir */}
                    <Card className="lg:col-span-2 border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                Événements à Venir
                            </CardTitle>
                            <CardDescription>Actions et rappels importants</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {upcomingEvents.map((event, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border hover:bg-muted/80 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center`}>
                                            <event.icon className={`w-6 h-6 ${event.color}`} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-foreground">{event.title}</h4>
                                            <p className="text-sm text-muted-foreground">{event.date}</p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="px-3 py-1">
                                        {event.count} animaux
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Alertes */}
                    <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-accent" />
                                Alertes
                            </CardTitle>
                            <CardDescription>Points d'attention</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-destructive">5 moutons malades</p>
                                        <p className="text-xs text-muted-foreground mt-1">Nécessite attention vétérinaire</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-accent mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-accent">12 en observation</p>
                                        <p className="text-xs text-muted-foreground mt-1">Suivi recommandé</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-primary">110 en bonne santé</p>
                                        <p className="text-xs text-muted-foreground mt-1">Excellent état général</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default BreederDashboard