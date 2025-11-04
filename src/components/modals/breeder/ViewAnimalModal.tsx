import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import {Avatar, AvatarFallback, AvatarImage} from "../../ui/avatar.tsx";
import {Badge} from "../../ui/badge.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../ui/tabs.tsx";
import {Heart, Syringe} from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    animal: any;
}

export default function ViewAnimalModal({ isOpen, onClose, animal }: Props) {
    if (!animal) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                {animal && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-green-800 flex items-center gap-3">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src={animal.image} alt={animal.name} />
                                    <AvatarFallback className={`text-xl ${animal.sex === 'F' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {animal.sex === 'F' ? '♀' : '♂'}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-2xl">{animal.name}</h2>
                                    <p className="text-amber-700">ID: {animal.app_id}</p>
                                    <Badge
                                        variant="outline"
                                        className={` mt-1`}
                                    >
                                        Race: {animal.race.name}
                                    </Badge>
                                </div>
                            </DialogTitle>
                        </DialogHeader>

                        <Tabs defaultValue="general" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 ">
                                <TabsTrigger value="general" className="text-green-800">Général</TabsTrigger>
                                <TabsTrigger value="genealogy" className="text-green-800">Généalogie</TabsTrigger>
                                <TabsTrigger value="health" className="text-green-800">Santé</TabsTrigger>
                                <TabsTrigger value="reproduction" className="text-green-800">Reproduction</TabsTrigger>
                            </TabsList>

                            <TabsContent value="general" className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                                        <span className="text-sm text-green-600">Date de naissance</span>
                                        <p className="text-lg text-green-800">
                                            {animal.birth_date ?
                                                new Date(animal.birth_date).toLocaleDateString('fr-FR')
                                                : (<span className="text-red-600">Pas définie</span>)
                                            }
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                                        <span className="text-sm text-blue-600">Poids actuel</span>
                                        <p className="text-lg text-blue-800">{animal.weight}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                                        <span className="text-sm text-amber-600">Statut</span>
                                        <p className="text-lg text-amber-800">{animal.status}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                                        <span className="text-sm text-purple-600">Race</span>
                                        <p className="text-lg text-purple-800">{animal.race.name}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-pink-50 border border-pink-200">
                                        <span className="text-sm text-pink-600">Santé</span>
                                        <p className="text-lg text-pink-800">{animal.health_status}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                                        <span className="text-sm text-yellow-600">Âge</span>
                                        <p className="text-lg text-yellow-800">{animal.age} ans</p>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="genealogy" className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                                        <h4 className="font-medium text-blue-800 mb-2">Père</h4>
                                        <p className="text-blue-700">{animal.dad_name}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-pink-50 border border-pink-200">
                                        <h4 className="font-medium text-pink-800 mb-2">Mère</h4>
                                        <p className="text-pink-700">{animal.mum_name}</p>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="health" className="space-y-4">
                                <div className="space-y-3">
                                    <h4 className="font-medium text-green-800 flex items-center gap-2">
                                        <Syringe className="w-4 h-4" />
                                        Historique des vaccinations
                                    </h4>
                                    {animal.vaccinations && animal.vaccinations.map((vacc: any, index: number) => (
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
                                    {(animal.matings && animal.matings.length > 0) ? animal.matings.map((mating: any, index: number) => (
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
    );
}
