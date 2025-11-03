import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';

import { Dialog, DialogContent,  DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { Search, Filter, Plus, Eye, Edit,  Heart, Syringe, PawPrint } from 'lucide-react';

function BreederHomeAnimal() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSheep, setSelectedSheep] = useState<any>(null);

    const sheepData = [
        {
            id: 'SM001',
            name: 'Fatou',
            race: 'Peul-Peul',
            sex: 'F',
            birthDate: '2022-03-15',
            weight: '45kg',
            status: 'Gestante',
            health: 'Bonne',
            father: 'SM-B001',
            mother: 'SM-F023',
            image: '/placeholder-sheep.jpg',
            vaccinations: [
                { date: '2024-01-15', vaccine: 'Fièvre aphteuse', nextDue: '2024-07-15' },
                { date: '2024-02-10', vaccine: 'Entérotoxémie', nextDue: '2024-08-10' }
            ],
            matings: [
                { date: '2024-08-20', partner: 'SM-B002', expected: '2025-01-15' }
            ]
        },
        {
            id: 'SM002',
            name: 'Moussa',
            race: 'Touabire',
            sex: 'M',
            birthDate: '2021-11-22',
            weight: '65kg',
            status: 'Reproducteur',
            health: 'Excellent',
            father: 'SM-B003',
            mother: 'SM-F015',
            image: '/placeholder-sheep.jpg',
            vaccinations: [
                { date: '2024-01-15', vaccine: 'Fièvre aphteuse', nextDue: '2024-07-15' }
            ],
            matings: [
                { date: '2024-08-20', partner: 'SM-F001', expected: '2025-01-15' },
                { date: '2024-07-15', partner: 'SM-F018', expected: '2024-12-10' }
            ]
        },
        {
            id: 'SM003',
            name: 'Aminata',
            race: 'Waralé',
            sex: 'F',
            birthDate: '2023-01-08',
            weight: '38kg',
            status: 'Disponible',
            health: 'Bonne',
            father: 'SM-B001',
            mother: 'SM-F012',
            image: '/placeholder-sheep.jpg',
            vaccinations: [
                { date: '2024-02-20', vaccine: 'Entérotoxémie', nextDue: '2024-08-20' }
            ],
            matings: []
        },
        {
            id: 'SM004',
            name: 'Ibrahima',
            race: 'Peul-Peul',
            sex: 'M',
            birthDate: '2020-09-12',
            weight: '72kg',
            status: 'Reproducteur',
            health: 'Excellent',
            father: 'SM-B005',
            mother: 'SM-F008',
            image: '/placeholder-sheep.jpg',
            vaccinations: [
                { date: '2024-01-10', vaccine: 'Fièvre aphteuse', nextDue: '2024-07-10' },
                { date: '2024-03-15', vaccine: 'Pasteurellose', nextDue: '2024-09-15' }
            ],
            matings: [
                { date: '2024-06-10', partner: 'SM-F025', expected: '2024-11-05' },
                { date: '2024-07-22', partner: 'SM-F030', expected: '2024-12-17' }
            ]
        },
        {
            id: 'SM005',
            name: 'Khadija',
            race: 'Djallonké',
            sex: 'F',
            birthDate: '2022-12-03',
            weight: '32kg',
            status: 'Disponible',
            health: 'Bonne',
            father: 'SM-B007',
            mother: 'SM-F019',
            image: '/placeholder-sheep.jpg',
            vaccinations: [
                { date: '2024-02-05', vaccine: 'Entérotoxémie', nextDue: '2024-08-05' }
            ],
            matings: []
        },
        {
            id: 'SM006',
            name: 'Ousmane',
            race: 'Mauritanien',
            sex: 'M',
            birthDate: '2021-05-18',
            weight: '58kg',
            status: 'Disponible',
            health: 'Bonne',
            father: 'SM-B009',
            mother: 'SM-F021',
            image: '/placeholder-sheep.jpg',
            vaccinations: [
                { date: '2024-01-20', vaccine: 'Fièvre aphteuse', nextDue: '2024-07-20' },
                { date: '2024-04-10', vaccine: 'Charbon bactéridien', nextDue: '2024-10-10' }
            ],
            matings: []
        },
        {
            id: 'SM007',
            name: 'Mariama',
            race: 'Touabire',
            sex: 'F',
            birthDate: '2023-07-14',
            weight: '28kg',
            status: 'Jeune',
            health: 'Excellente',
            father: 'SM-B002',
            mother: 'SM-F013',
            image: '/placeholder-sheep.jpg',
            vaccinations: [
                { date: '2024-03-14', vaccine: 'Entérotoxémie', nextDue: '2024-09-14' }
            ],
            matings: []
        },
        {
            id: 'SM008',
            name: 'Abdoulaye',
            race: 'Peul-Peul',
            sex: 'M',
            birthDate: '2020-02-28',
            weight: '69kg',
            status: 'Reproducteur',
            health: 'Bonne',
            father: 'SM-B001',
            mother: 'SM-F007',
            image: '/placeholder-sheep.jpg',
            vaccinations: [
                { date: '2024-01-25', vaccine: 'Fièvre aphteuse', nextDue: '2024-07-25' },
                { date: '2024-02-28', vaccine: 'Pasteurellose', nextDue: '2024-08-28' }
            ],
            matings: [
                { date: '2024-09-05', partner: 'SM-F028', expected: '2025-01-30' }
            ]
        },
        {
            id: 'SM009',
            name: 'Coumba',
            race: 'Waralé',
            sex: 'F',
            birthDate: '2022-06-22',
            weight: '41kg',
            status: 'Gestante',
            health: 'Bonne',
            father: 'SM-B004',
            mother: 'SM-F016',
            image: '/placeholder-sheep.jpg',
            vaccinations: [
                { date: '2024-01-30', vaccine: 'Fièvre aphteuse', nextDue: '2024-07-30' },
                { date: '2024-03-22', vaccine: 'Entérotoxémie', nextDue: '2024-09-22' }
            ],
            matings: [
                { date: '2024-07-30', partner: 'SM-B008', expected: '2024-12-25' }
            ]
        },
        {
            id: 'SM010',
            name: 'Lamine',
            race: 'Djallonké',
            sex: 'M',
            birthDate: '2023-04-10',
            weight: '35kg',
            status: 'Jeune',
            health: 'Excellente',
            father: 'SM-B006',
            mother: 'SM-F020',
            image: '/placeholder-sheep.jpg',
            vaccinations: [
                { date: '2024-04-10', vaccine: 'Entérotoxémie', nextDue: '2024-10-10' }
            ],
            matings: []
        },
        {
            id: 'SM011',
            name: 'Awa',
            race: 'Mauritanien',
            sex: 'F',
            birthDate: '2021-10-15',
            weight: '47kg',
            status: 'Disponible',
            health: 'Bonne',
            father: 'SM-B009',
            mother: 'SM-F024',
            image: '/placeholder-sheep.jpg',
            vaccinations: [
                { date: '2024-02-15', vaccine: 'Fièvre aphteuse', nextDue: '2024-08-15' },
                { date: '2024-04-20', vaccine: 'Pasteurellose', nextDue: '2024-10-20' }
            ],
            matings: []
        },
        {
            id: 'SM012',
            name: 'Modou',
            race: 'Touabire',
            sex: 'M',
            birthDate: '2022-01-20',
            weight: '61kg',
            status: 'Disponible',
            health: 'Bonne',
            father: 'SM-B002',
            mother: 'SM-F011',
            image: '/placeholder-sheep.jpg',
            vaccinations: [
                { date: '2024-01-20', vaccine: 'Fièvre aphteuse', nextDue: '2024-07-20' },
                { date: '2024-03-10', vaccine: 'Charbon bactéridien', nextDue: '2024-09-10' }
            ],
            matings: []
        },
        {
            id: 'SM013',
            name: 'Binta',
            race: 'Peul-Peul',
            sex: 'F',
            birthDate: '2023-11-08',
            weight: '26kg',
            status: 'Jeune',
            health: 'Excellente',
            father: 'SM-B001',
            mother: 'SM-F029',
            image: '/placeholder-sheep.jpg',
            vaccinations: [
                { date: '2024-05-08', vaccine: 'Entérotoxémie', nextDue: '2024-11-08' }
            ],
            matings: []
        },
        {
            id: 'SM014',
            name: 'Cheikh',
            race: 'Waralé',
            sex: 'M',
            birthDate: '2021-08-05',
            weight: '64kg',
            status: 'Reproducteur',
            health: 'Excellente',
            father: 'SM-B004',
            mother: 'SM-F018',
            image: '/placeholder-sheep.jpg',
            vaccinations: [
                { date: '2024-02-05', vaccine: 'Fièvre aphteuse', nextDue: '2024-08-05' },
                { date: '2024-04-15', vaccine: 'Pasteurellose', nextDue: '2024-10-15' }
            ],
            matings: [
                { date: '2024-08-15', partner: 'SM-F026', expected: '2025-01-10' }
            ]
        },
        {
            id: 'SM015',
            name: 'Ndeye',
            race: 'Djallonké',
            sex: 'F',
            birthDate: '2022-09-30',
            weight: '35kg',
            status: 'Disponible',
            health: 'Bonne',
            father: 'SM-B010',
            mother: 'SM-F022',
            image: '/placeholder-sheep.jpg',
            vaccinations: [
                { date: '2024-03-30', vaccine: 'Entérotoxémie', nextDue: '2024-09-30' }
            ],
            matings: []
        }
    ];

    const filteredSheep = sheepData.filter(sheep =>
        sheep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sheep.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sheep.race.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const raceColors = {
        'Peul-Peul': 'bg-blue-100 text-blue-800',
        'Touabire': 'bg-green-100 text-green-800',
        'Waralé': 'bg-purple-100 text-purple-800',
        'Djallonké': 'bg-orange-100 text-orange-800',
        'Mauritanien': 'bg-amber-100 text-amber-800'
    };

    const statusColors = {
        'Gestante': 'bg-pink-100 text-pink-700',
        'Reproducteur': 'bg-blue-100 text-blue-700',
        'Disponible': 'bg-green-100 text-green-700',
        'Jeune': 'bg-yellow-100 text-yellow-700'
    };

    return (
        <div className="flex-1 bg-gradient-to-br from-green-50 to-amber-50 dark:from-accent-foreground dark:to-muted-foreground  p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl text-primary">Gestion des Sujets</h1>
                        <p className="text-secondary">Gérez vos animaux et leurs informations - {filteredSheep.length} sujets</p>
                    </div>
                    <Button className="bg-primary hover:bg-green-600 dark:hover:bg-green-400">
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau Sujet
                    </Button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="border-green-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-green-600">Total Sujets</p>
                                    <p className="text-2xl font-semibold text-green-800">{sheepData.length}</p>
                                </div>
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <PawPrint className="w-5 h-5 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-pink-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-pink-600">Femelles</p>
                                    <p className="text-2xl font-semibold text-pink-800">{sheepData.filter(s => s.sex === 'F').length}</p>
                                </div>
                                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                                    <span className="text-pink-600 text-xl">♀</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-blue-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-blue-600">Mâles</p>
                                    <p className="text-2xl font-semibold text-blue-800">{sheepData.filter(s => s.sex === 'M').length}</p>
                                </div>
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 text-xl">♂</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-purple-600">Gestantes</p>
                                    <p className="text-2xl font-semibold text-purple-800">{sheepData.filter(s => s.status === 'Gestante').length}</p>
                                </div>
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filters */}
                <Card className="mb-6 border-green-200">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Rechercher par nom, ID ou race..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-green-300"
                                />
                            </div>
                            <Button variant="outline" className="border-green-300 text-green-700">
                                <Filter className="w-4 h-4 mr-2" />
                                Filtres
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Animals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredSheep.map((sheep) => (
                        <Card key={sheep.id} className="border-secondary hover:shadow-lg transition-all duration-200 hover:scale-105">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage src={sheep.image} alt={sheep.name} />
                                            <AvatarFallback className={`${sheep.sex === 'F' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {sheep.sex === 'F' ? '♀' : '♂'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg text-primary">{sheep.name}</CardTitle>
                                            <CardDescription>ID: {sheep.id}</CardDescription>
                                        </div>
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className={statusColors[sheep.status as keyof typeof statusColors]}
                                    >
                                        {sheep.status}
                                    </Badge>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Badge
                                        variant="outline"
                                        className={raceColors[sheep.race as keyof typeof raceColors]}
                                    >
                                        {sheep.race}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Naissance:</span>
                                        <p className="text-green-800">{new Date(sheep.birthDate).toLocaleDateString('fr-FR')}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Poids:</span>
                                        <p className="text-green-800">{sheep.weight}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Santé:</span>
                                        <p className={`${sheep.health === 'Excellent' || sheep.health === 'Excellente' ? 'text-green-600' : sheep.health === 'Bonne' ? 'text-blue-600' : 'text-red-600'}`}>
                                            {sheep.health}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Âge:</span>
                                        <p className="text-green-800">{Math.floor((Date.now() - new Date(sheep.birthDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000))} ans</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-3">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 border-green-300 text-green-700"
                                                onClick={() => setSelectedSheep(sheep)}
                                            >
                                                <Eye className="w-4 h-4 mr-2" />
                                                Voir
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                            {selectedSheep && (
                                                <>
                                                    <DialogHeader>
                                                        <DialogTitle className="text-green-800 flex items-center gap-3">
                                                            <Avatar className="w-16 h-16">
                                                                <AvatarImage src={selectedSheep.image} alt={selectedSheep.name} />
                                                                <AvatarFallback className={`text-xl ${selectedSheep.sex === 'F' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
                                                                    {selectedSheep.sex === 'F' ? '♀' : '♂'}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <h2 className="text-2xl">{selectedSheep.name}</h2>
                                                                <p className="text-amber-700">ID: {selectedSheep.id}</p>
                                                                <Badge
                                                                    variant="outline"
                                                                    className={`${raceColors[selectedSheep.race as keyof typeof raceColors]} mt-1`}
                                                                >
                                                                    Race: {selectedSheep.race}
                                                                </Badge>
                                                            </div>
                                                        </DialogTitle>
                                                    </DialogHeader>

                                                    <Tabs defaultValue="general" className="w-full">
                                                        <TabsList className="grid w-full grid-cols-4 bg-green-100">
                                                            <TabsTrigger value="general" className="text-green-800">Général</TabsTrigger>
                                                            <TabsTrigger value="genealogy" className="text-green-800">Généalogie</TabsTrigger>
                                                            <TabsTrigger value="health" className="text-green-800">Santé</TabsTrigger>
                                                            <TabsTrigger value="reproduction" className="text-green-800">Reproduction</TabsTrigger>
                                                        </TabsList>

                                                        <TabsContent value="general" className="space-y-4">
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                                                                    <span className="text-sm text-green-600">Date de naissance</span>
                                                                    <p className="text-lg text-green-800">{new Date(selectedSheep.birthDate).toLocaleDateString('fr-FR')}</p>
                                                                </div>
                                                                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                                                                    <span className="text-sm text-blue-600">Poids actuel</span>
                                                                    <p className="text-lg text-blue-800">{selectedSheep.weight}</p>
                                                                </div>
                                                                <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                                                                    <span className="text-sm text-amber-600">Statut</span>
                                                                    <p className="text-lg text-amber-800">{selectedSheep.status}</p>
                                                                </div>
                                                                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                                                                    <span className="text-sm text-purple-600">Race</span>
                                                                    <p className="text-lg text-purple-800">{selectedSheep.race}</p>
                                                                </div>
                                                                <div className="p-4 rounded-lg bg-pink-50 border border-pink-200">
                                                                    <span className="text-sm text-pink-600">Santé</span>
                                                                    <p className="text-lg text-pink-800">{selectedSheep.health}</p>
                                                                </div>
                                                                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                                                                    <span className="text-sm text-yellow-600">Âge</span>
                                                                    <p className="text-lg text-yellow-800">{Math.floor((Date.now() - new Date(selectedSheep.birthDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000))} ans</p>
                                                                </div>
                                                            </div>
                                                        </TabsContent>

                                                        <TabsContent value="genealogy" className="space-y-4">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                                                                    <h4 className="font-medium text-blue-800 mb-2">Père</h4>
                                                                    <p className="text-blue-700">{selectedSheep.father}</p>
                                                                </div>
                                                                <div className="p-4 rounded-lg bg-pink-50 border border-pink-200">
                                                                    <h4 className="font-medium text-pink-800 mb-2">Mère</h4>
                                                                    <p className="text-pink-700">{selectedSheep.mother}</p>
                                                                </div>
                                                            </div>
                                                        </TabsContent>

                                                        <TabsContent value="health" className="space-y-4">
                                                            <div className="space-y-3">
                                                                <h4 className="font-medium text-green-800 flex items-center gap-2">
                                                                    <Syringe className="w-4 h-4" />
                                                                    Historique des vaccinations
                                                                </h4>
                                                                {selectedSheep.vaccinations.map((vacc: any, index: number) => (
                                                                    <div key={index} className="p-3 rounded-lg bg-white border border-green-200">
                                                                        <div className="flex justify-between items-start">
                                                                            <div>
                                                                                <p className="font-medium text-green-800">{vacc.vaccine}</p>
                                                                                <p className="text-sm text-green-600">Administré le {new Date(vacc.date).toLocaleDateString('fr-FR')}</p>
                                                                            </div>
                                                                            <Badge variant="outline" className="border-amber-300 text-amber-700">
                                                                                Rappel: {new Date(vacc.nextDue).toLocaleDateString('fr-FR')}
                                                                            </Badge>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </TabsContent>

                                                        <TabsContent value="reproduction" className="space-y-4">
                                                            <div className="space-y-3">
                                                                <h4 className="font-medium text-pink-800 flex items-center gap-2">
                                                                    <Heart className="w-4 h-4" />
                                                                    Historique des accouplements
                                                                </h4>
                                                                {selectedSheep.matings.length > 0 ? selectedSheep.matings.map((mating: any, index: number) => (
                                                                    <div key={index} className="p-3 rounded-lg bg-white border border-pink-200">
                                                                        <div className="flex justify-between items-start">
                                                                            <div>
                                                                                <p className="font-medium text-pink-800">Partenaire: {mating.partner}</p>
                                                                                <p className="text-sm text-pink-600">Date: {new Date(mating.date).toLocaleDateString('fr-FR')}</p>
                                                                            </div>
                                                                            <Badge variant="outline" className="border-green-300 text-green-700">
                                                                                Mise bas prévue: {new Date(mating.expected).toLocaleDateString('fr-FR')}
                                                                            </Badge>
                                                                        </div>
                                                                    </div>
                                                                )) : (
                                                                    <p className="text-muted-foreground text-center py-4">Aucun accouplement enregistré</p>
                                                                )}
                                                            </div>
                                                        </TabsContent>
                                                    </Tabs>
                                                </>
                                            )}
                                        </DialogContent>
                                    </Dialog>

                                    <Button variant="outline" size="sm" className="border-amber-300 text-amber-700">
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BreederHomeAnimal