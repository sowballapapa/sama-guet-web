import {useEffect, useState} from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';

import {Search, Filter, Plus, Eye, Edit, Heart, PawPrint, Trash, FileX2} from 'lucide-react';
import {deleteAnimal, listAnimal} from "../../../services/animal.service.ts";
import {toast} from "react-toastify";
import NewAnimalModal from "../../../components/modals/breeder/NewAnimalModal.tsx";
import EditAnimalModal from "../../../components/modals/breeder/EditAnimalModal.tsx";
import ViewAnimalModal from "../../../components/modals/breeder/ViewAnimalModal.tsx";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BreederLoading from "../../../components/loaders/BreederLoading.tsx";

function BreederHomeAnimal() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSheep, setSelectedSheep] = useState<any>(null);

    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isNewOpen, setIsNewOpen] = useState(false);

    const [sheepData, setSheepData] = useState<any[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);


    const fetchData = async  () =>{
        setLoading(true)
        try {
            const res = await listAnimal()
            console.log(res)
            setSheepData(res)
            setLoading(false)
        }catch (err){
            console.error("Erreur fetch animals", err)
            toast.error("Erreur lors du chargement des sujets")
        }
    }

    useEffect(() => {
        fetchData()
    }, []);
    // const sheepData = [
    //     // {
    //     //     id: 'SM015',
    //     //     name: 'Ndeye',
    //     //     race: 'Djallonké',
    //     //     sex: 'F',
    //     //     birthDate: '2022-09-30',
    //     //     weight: '35kg',
    //     //     status: 'Disponible',
    //     //     health: 'Bonne',
    //     //     father: 'SM-B010',
    //     //     mother: 'SM-F022',
    //     //     image: '/placeholder-sheep.jpg',
    //     //     vaccinations: [
    //     //         { date: '2024-03-30', vaccine: 'Entérotoxémie', nextDue: '2024-09-30' }
    //     //     ],
    //     //     matings: []
    //     // }
    // ];

    const filteredSheep = sheepData.filter((sheep:any) =>
        sheep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sheep.app_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sheep.race.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const raceColors = {
        'Peul-Peul': 'bg-blue-100 text-blue-800',
        'Touabire': 'bg-green-100 text-green-800',
        'Waralé': 'bg-purple-100 text-purple-800',
        'Djallonké': 'bg-orange-100 text-orange-800',
        'Mauritanien': 'bg-amber-100 text-amber-800'
    };

    const statusColors = {
        'dead': 'bg-pink-100 text-red-700',
        'sold': 'bg-blue-100 text-blue-700',
        'active': 'bg-green-100 text-green-700',
        'lost': 'bg-yellow-100 text-yellow-700'
    };
    const statusTexts = {
        'dead': 'Décédé(e)',
        'sold': 'Vendu(e)',
        'active': 'Actif(ve)',
        'lost': 'Perdu(e)'
    };

    const healthStatusColors = {
        'healthy': 'text-green-700',
        'sick': 'text-amber-300',
        'gestation': 'text-pink-700',
        'recovery': 'text-blue-300',
        'observation': 'text-yellow-400'
    };
    const healthStatusTexts = {
        'healthy': 'En bonne santé',
        'sick': 'Malade',
        'gestation': 'Gestante',
        'recovery': 'En recupération',
        'observation': 'En Observation'
    };

    const handleDelete = (id: number) => {
        confirmAlert({
            title: 'Confirmer la suppression',
            message: 'Êtes-vous sûr de vouloir supprimer ce  sujet?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: async () => {
                        await deleteAnimal(id);
                        toast.success("Sujet supprimé !");
                        fetchData()
                    }
                },
                {
                    label: 'Non',
                }
            ]
        });
    };

    return (loading ?(<BreederLoading/>)
            :(
        <div className="flex-1 bg-gradient-to-br from-green-50 to-amber-50 dark:from-accent-foreground dark:to-muted-foreground  p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl text-primary">Gestion des Sujets</h1>
                        <p className="text-secondary">Gérez vos animaux et leurs informations - {filteredSheep.length} sujets</p>
                    </div>
                    <Button
                        className="bg-primary hover:bg-green-600 dark:hover:bg-green-400"
                        onClick={()=>setIsNewOpen(true)}
                    >
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
                                    <p className="text-2xl font-semibold text-purple-800">{sheepData.filter(s => s.health_status === 'gestation').length}</p>
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
                    {filteredSheep && filteredSheep.map((sheep) => (
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
                                        {statusTexts[sheep.status as keyof typeof statusTexts]}
                                    </Badge>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Badge
                                        variant="outline"
                                        className={raceColors[sheep.race.name as keyof typeof raceColors]}
                                    >
                                        {sheep.race.name}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Naissance:</span>
                                        <p className="text-green-800">
                                            {sheep.birth_date ?
                                                new Date(sheep.birth_date).toLocaleDateString('fr-FR')
                                                : (<span className="text-red-600">Pas définie</span>)
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Poids:</span>
                                        <p className="text-green-800">{sheep.weight}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Santé:</span>
                                        <p className={`${healthStatusColors[sheep.health_status as keyof typeof healthStatusColors]}`}>
                                            {healthStatusTexts[sheep.health_status as keyof typeof healthStatusTexts]}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Âge:</span>
                                        <p className="text-green-800">{sheep.age? sheep.age: (<span className="text-red-600">--</span>)} ans</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-3">

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 text-green-700 hover:text-green-500"
                                        onClick={() => {
                                            setSelectedSheep(sheep)
                                            setIsViewOpen(true)
                                        }}
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        Voir
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="hover:text-amber-500 text-amber-700"
                                        onClick={()=>{
                                            setSelectedSheep(sheep)
                                            setIsEditOpen(true)
                                        }}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="hover:text-red-400 text-red-600"
                                        onClick={()=>{handleDelete(sheep.id)}}
                                    >
                                        <Trash className="w-4 h-4"/>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {filteredSheep.length==0 &&
                        (<div className="flex gap-2 justify-center items-center text-gray-500 dark:text-gray-300 px-auto">
                            <FileX2/>
                            <strong>Aucun sujet enregistré</strong>
                        </div>)}
                </div>
            </div>
            {/* Modales */}
            <ViewAnimalModal
                isOpen={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                animal={selectedSheep}

            />

            <EditAnimalModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                animal={selectedSheep}
                onSaved={fetchData}
            />

            <NewAnimalModal
                isOpen={isNewOpen}
                onClose={() => setIsNewOpen(false)}
                onSaved={fetchData}
            />
        </div>
    )
    );
}

export default BreederHomeAnimal