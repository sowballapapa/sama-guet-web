import { useEffect, useState } from "react";
import { Input } from "../../ui/input.tsx";
import { Label } from "../../ui/label.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select.tsx";
import { PawPrint, ChevronDown, ChevronRight } from "lucide-react";
import { listRaces, createRace } from "../../../services/race.service.ts";
import {listOfMyFarms} from "../../../services/farm.service.ts";

interface AnimalFormProps {
    animalForm: any;
    setAnimalForm: (data: any) => void;
    errors: Record<string, string>;
}

const sexes = [
    { value: "M", label: "Mâle" },
    { value: "F", label: "Femelle" },
];

const statuses = [
    { value: "active", label: "Actif" },
    { value: "sold", label: "Vendu" },
    { value: "dead", label: "Décédé" },
    { value: "lost", label: "Perdu" },
];

const healthStatuses = [
    { value: "healthy", label: "Bonne santé" },
    { value: "sick", label: "Malade" },
    { value: "gestation", label: "Gestation" },
    { value: "recovery", label: "Récupération" },
    { value: "observation", label: "Observation" },
];

export default function AnimalForm({
                                       animalForm,
                                       setAnimalForm,
                                       errors,
                                   }: AnimalFormProps) {
    const [races, setRaces] = useState<{ id: number; name: string }[]>([]);
    const [farms, setFarms] = useState<{id: number; farm_name: string}[]>([]);
    const [raceInput, setRaceInput] = useState("");
    const [openSections, setOpenSections] = useState({
        general: true,
        genealogy: false,
        transactions: false,
        characteristics: false,
    });

    useEffect(() => {
        fetchRaces();
        fetchFarms();
    }, []);

    const fetchRaces = async () => {
        try {
            const data = await listRaces();
            setRaces(data);
        } catch (err) {
            console.error("Erreur récupération races", err);
        }
    };

    const fetchFarms = async () => {
        try {
            const res = await listOfMyFarms();
            setFarms(res.data);
        } catch (err) {
            console.error("Erreur récupération Bergerie", err);
        }
    };

    const handleRaceBlur = async () => {
        if (!raceInput.trim()) return;

        const existing = races.find(
            (r) => r.name.toLowerCase() === raceInput.toLowerCase()
        );
        if (existing) {
            setAnimalForm({ ...animalForm, race_id: existing.id });
        } else {
            try {
                const newRace = await createRace({ name: raceInput });
                setRaces([...races, newRace]);
                useEffect(() => {
                    setAnimalForm({ ...animalForm, race_id: newRace.id });
                }, [animalForm]);
            } catch (err) {
                console.error("Erreur création race", err);
            }
        }
    };

    const toggleSection = (key: string) => {
        setOpenSections({
            ...openSections,
            [key]: !openSections[key as keyof typeof openSections],
        });
    };

    return (
        <div className="space-y-6">

            {/* ================= Info générale ================= */}
            <fieldset className="border rounded-xl p-4">
                <legend
                    className="flex items-center gap-2 font-semibold text-lg cursor-pointer select-none"
                    onClick={() => toggleSection("general")}
                >
                    {openSections.general ? <ChevronDown /> : <ChevronRight />} Info générale
                </legend>

                {openSections.general && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4 mt-2" >

                        {/* Nom */}
                        <div className="space-y-2">
                            <Label>Nom *</Label>
                            <div className="relative">
                                <PawPrint className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                                <Input
                                    value={animalForm.name}
                                    onChange={(e) =>
                                        setAnimalForm({ ...animalForm, name: e.target.value })
                                    }
                                    placeholder="Nom ou identifiant"
                                    className="pl-10 rounded-xl h-11 bg-input-background border-border"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Tag */}
                        <div className="space-y-2">
                            <Label>Numéro d'identification (Tag)</Label>
                            <Input
                                value={animalForm.tag}
                                onChange={(e) =>
                                    setAnimalForm({ ...animalForm, tag: e.target.value })
                                }
                                placeholder="Ex: 12345"
                                className="rounded-xl h-11 bg-input-background border-border"
                            />
                            {errors.tag && (
                                <p className="text-red-500 text-sm mt-1">{errors.tag}</p>
                            )}
                        </div>

                        {/* Sexe */}
                        <div className="space-y-2">
                            <Label>Sexe *</Label>
                            <Select
                                value={animalForm.sex}
                                onValueChange={(v) => setAnimalForm({ ...animalForm, sex: v })}
                            >
                                <SelectTrigger className="rounded-xl h-11 bg-input-background border-border">
                                    <SelectValue placeholder="Mâle ou Femelle" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sexes.map((s) => (
                                        <SelectItem key={s.value} value={s.value}>
                                            {s.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.sex && (
                                <p className="text-red-500 text-sm mt-1">{errors.sex}</p>
                            )}
                        </div>

                        {/* Race */}
                        <div className="space-y-2">
                            <Label>Race *</Label>
                            <div className="flex justify-between items-center gap-4">
                                <Select
                                    value={animalForm.race_id ? animalForm.race_id.toString() : animalForm?.race?.id ? animalForm.race_id = animalForm?.race?.id.toString() :""}
                                    onValueChange={(v) =>
                                        setAnimalForm({ ...animalForm, race_id: Number(v) })
                                    }
                                >
                                    <SelectTrigger className="rounded-xl w-1/2 h-11 bg-input-background border-border">
                                        <SelectValue placeholder="Choisir une race ou saisir une nouvelle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {races.map((r) => (
                                            <SelectItem key={r.id} value={r.id.toString()}>
                                                {r.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Input
                                    type="text"
                                    value={raceInput}
                                    onChange={(e) => setRaceInput(e.target.value)}
                                    onBlur={handleRaceBlur}
                                    placeholder="Ou taper une nouvelle race..."
                                    className="mt-2 w-1/2 rounded-xl h-11 bg-input-background border-border"
                                />
                                {errors.race_id && (
                                    <p className="text-red-500 text-sm mt-1">{errors.race_id}</p>
                                )}

                            </div>
                        </div>

                        {/* Date de naissance */}
                        <div className="space-y-2">
                            <Label>Date de naissance</Label>
                            <Input
                                type="date"
                                value={animalForm.birth_date || ""}
                                onChange={(e) =>
                                    setAnimalForm({ ...animalForm, birth_date: e.target.value })
                                }
                                className="rounded-xl h-11 bg-input-background border-border"
                            />
                            {errors.birth_date && (
                                <p className="text-red-500 text-sm mt-1">{errors.birth_date}</p>
                            )}
                        </div>

                        {/* Image */}
                        <div className="space-y-2">
                            <Label>Image</Label>
                            <Input
                                type="file"
                                onChange={(e) =>
                                    setAnimalForm({ ...animalForm, image: e.target.files?.[0] })
                                }
                                className="rounded-xl h-11 bg-input-background border-border"
                            />
                            {errors.image && (
                                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                            )}
                        </div>


                        {/* Statut */}
                        <div className="space-y-2">
                            <Label>Statut *</Label>
                            <Select
                                value={animalForm.status}
                                onValueChange={(v) =>
                                    setAnimalForm({ ...animalForm, status: v })
                                }
                            >
                                <SelectTrigger className="rounded-xl h-11 bg-input-background border-border">
                                    <SelectValue placeholder="Statut de l’animal" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statuses.map((s) => (
                                        <SelectItem key={s.value} value={s.value}>
                                            {s.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                            )}
                        </div>

                        {/* Santé */}
                        <div className="space-y-2">
                            <Label>État de santé *</Label>
                            <Select
                                value={animalForm.health_status}
                                onValueChange={(v) =>
                                    setAnimalForm({ ...animalForm, health_status: v })
                                }
                            >
                                <SelectTrigger className="rounded-xl h-11 bg-input-background border-border">
                                    <SelectValue placeholder="État de santé" />
                                </SelectTrigger>
                                <SelectContent>
                                    {healthStatuses.map((h) => (
                                        <SelectItem key={h.value} value={h.value}>
                                            {h.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.health_status && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.health_status}
                                </p>
                            )}
                        </div>


                        {/* Description */}
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <textarea
                                value={animalForm.description}
                                onChange={(e) =>
                                    setAnimalForm({ ...animalForm, description: e.target.value })
                                }
                                placeholder="Description, remarques..."
                                className="w-full rounded-xl border-border bg-input-background p-3 min-h-[100px]"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                            )}
                        </div>

                        {/*Ferme*/}
                        <div className="space-y-2">
                            <Label>Bergerie *</Label>
                            <Select
                                value={animalForm.farm}
                                onValueChange={(v) => setAnimalForm({ ...animalForm, farm: v })}
                            >
                                <SelectTrigger className="rounded-xl h-11 bg-input-background border-border">
                                    <SelectValue placeholder="Bergerie où se trouve le sujet" />
                                </SelectTrigger>
                                <SelectContent>
                                    {farms.map((s) => (
                                        <SelectItem key={s.id} value={s.id}>
                                            {s.farm_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.farm && (
                                <p className="text-red-500 text-sm mt-1">{errors.farm}</p>
                            )}
                        </div>

                    </div>
                )}
            </fieldset>


            {/* ================= Généalogie ================= */}
            <fieldset className="border rounded-xl p-4">
                <legend
                    className="flex items-center gap-2 font-semibold text-lg cursor-pointer select-none"
                    onClick={() => toggleSection("genealogy")}
                >
                    {openSections.genealogy ? <ChevronDown /> : <ChevronRight />} Généalogie
                </legend>
                {openSections.genealogy && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        <div className="space-y-2">
                            <Label>Père</Label>
                            <Input
                                value={animalForm.dad_name}
                                onChange={(e) =>
                                    setAnimalForm({ ...animalForm, dad_name: e.target.value })
                                }
                                placeholder="Nom du père"
                                className="rounded-xl h-11 bg-input-background border-border"
                            />
                            {errors.dad_name && (
                                <p className="text-red-500 text-sm mt-1">{errors.dad_name}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Mère</Label>
                            <Input
                                value={animalForm.mum_name}
                                onChange={(e) =>
                                    setAnimalForm({ ...animalForm, mum_name: e.target.value })
                                }
                                placeholder="Nom de la mère"
                                className="rounded-xl h-11 bg-input-background border-border"
                            />
                            {errors.mum_name && (
                                <p className="text-red-500 text-sm mt-1">{errors.mum_name}</p>
                            )}
                        </div>
                    </div>
                )}
            </fieldset>

            {/* ================= Transactions ================= */}
            <fieldset className="border rounded-xl p-4">
                <legend
                    className="flex items-center gap-2 font-semibold text-lg cursor-pointer select-none"
                    onClick={() => toggleSection("transactions")}
                >
                    {openSections.transactions ? <ChevronDown /> : <ChevronRight />} Transactions
                </legend>
                {openSections.transactions && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        <div className="space-y-2">
                            <Label>Date d’acquisition</Label>
                            <Input
                                type="date"
                                value={animalForm.acquisition_date}
                                onChange={(e) =>
                                    setAnimalForm({
                                        ...animalForm,
                                        acquisition_date: e.target.value,
                                    })
                                }
                                className="rounded-xl h-11 bg-input-background border-border"
                            />
                            {errors.acquisition_date && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.acquisition_date}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Prix d’acquisition</Label>
                            <Input
                                type="number"
                                value={animalForm.acquisition_price}
                                onChange={(e) =>
                                    setAnimalForm({
                                        ...animalForm,
                                        acquisition_price: e.target.value,
                                    })
                                }
                                placeholder="Prix en FCFA"
                                className="rounded-xl h-11 bg-input-background border-border"
                            />
                            {errors.acquisition_price && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.acquisition_price}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Bergerie d’acquisition</Label>
                            <Input
                                value={animalForm.acquisition_farm}
                                onChange={(e) =>
                                    setAnimalForm({
                                        ...animalForm,
                                        acquisition_farm: e.target.value,
                                    })
                                }
                                placeholder="Nom de la ferme"
                                className="rounded-xl h-11 bg-input-background border-border"
                            />
                            {errors.acquisition_farm && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.acquisition_farm}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Valeur sur le marché</Label>
                            <Input
                                type="number"
                                value={animalForm.market_value}
                                onChange={(e) =>
                                    setAnimalForm({
                                        ...animalForm,
                                        market_value: e.target.value,
                                    })
                                }
                                placeholder="Valeur estimée"
                                className="rounded-xl h-11 bg-input-background border-border"
                            />
                            {errors.market_value && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.market_value}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </fieldset>

            {/* ================= Caractéristiques ================= */}
            <fieldset className="border rounded-xl p-4">
                <legend
                    className="flex items-center gap-2 font-semibold text-lg cursor-pointer select-none"
                    onClick={() => toggleSection("characteristics")}
                >
                    {openSections.characteristics ? (
                        <ChevronDown />
                    ) : (
                        <ChevronRight />
                    )}{" "}
                    Caractéristiques
                </legend>
                {openSections.characteristics && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="space-y-2">
                            <Label>Poids (en kg)</Label>
                            <Input
                                type="number"
                                value={animalForm.weight}
                                onChange={(e) =>
                                    setAnimalForm({
                                        ...animalForm,
                                        weight: e.target.value,
                                    })
                                }
                                placeholder="Poids estimé"
                                className="rounded-xl h-11 bg-input-background border-border"
                            />
                            {errors.weight && (
                                <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Hauteur (hg en cm)</Label>
                            <Input
                                type="number"
                                value={animalForm.hg}
                                onChange={(e) =>
                                    setAnimalForm({ ...animalForm, hg: e.target.value })
                                }
                                className="rounded-xl h-11 bg-input-background border-border"
                            />
                            {errors.hg && (
                                <p className="text-red-500 text-sm mt-1">{errors.hg}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Longueur corps (lcs en cm)</Label>
                            <Input
                                type="number"
                                value={animalForm.lcs}
                                onChange={(e) =>
                                    setAnimalForm({ ...animalForm, lcs: e.target.value })
                                }
                                className="rounded-xl h-11 bg-input-background border-border"
                            />
                            {errors.lcs && (
                                <p className="text-red-500 text-sm mt-1">{errors.lcs}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Tour de poitrine (tp en cm)</Label>
                            <Input
                                type="number"
                                value={animalForm.tp}
                                onChange={(e) =>
                                    setAnimalForm({ ...animalForm, tp: e.target.value })
                                }
                                className="rounded-xl h-11 bg-input-background border-border"
                            />
                            {errors.tp && (
                                <p className="text-red-500 text-sm mt-1">{errors.tp}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Couleur</Label>
                            <Input
                                value={animalForm.color}
                                onChange={(e) =>
                                    setAnimalForm({ ...animalForm, color: e.target.value })
                                }
                                placeholder="Ex: Blanc, Marron, Tacheté..."
                                className="rounded-xl h-11 bg-input-background border-border"
                            />
                            {errors.color && (
                                <p className="text-red-500 text-sm mt-1">{errors.color}</p>
                            )}
                        </div>
                    </div>
                )}
            </fieldset>

        </div>
    );
}
