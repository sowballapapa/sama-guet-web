import { Input } from "../../ui/input.tsx";
import { Label } from "../../ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select.tsx";
import { Building, MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface FarmFormProps {
    farmForm: any;
    setFarmForm: (data: any) => void;
    errors: Record<string, string>;
}

const regions = [
    'Dakar', 'Thiès', 'Saint-Louis', 'Diourbel', 'Louga', 'Fatick',
    'Kaolack', 'Tambacounda', 'Kaffrine', 'Kédougou', 'Kolda',
    'Matam', 'Sédhiou', 'Ziguinchor','Pas du Sénégal'
];

const farmSizes = [
    { value: "very_small", label: "Très Petite (1–10)" },
    { value: "small", label: "Petite (11–50)" },
    { value: "medium", label: "Moyenne (51–200)" },
    { value: "large", label: "Grande (201–500)" },
    { value: "very_large", label: "Très Grande (500+)" },
];

export default function FarmForm({ farmForm, setFarmForm, errors }: FarmFormProps) {

    const [isInSenegal, setIsInSenegal] = useState(true);

    useEffect(() => {
        setIsInSenegal(farmForm.farm_region !== 'Pas du Sénégal');
        setFarmForm(prev => ({ ...prev, farm_country: farmForm.farm_region === 'Pas du Sénégal' ? '' : 'Sénégal' }));
    }, [farmForm.farm_region]);

    return (
        <div className="space-y-4">
            {/* Nom */}
            <div className="space-y-2">
                <Label htmlFor="farm_name">Nom de la bergerie *</Label>
                <div className="relative">
                    <Building className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                    <Input
                        id="farm_name"
                        value={farmForm.farm_name}
                        onChange={(e) => setFarmForm({ ...farmForm, farm_name: e.target.value })}
                        placeholder="Ex: Bergerie du Soleil"
                        className="pl-10 rounded-xl h-11 bg-input-background border-border"
                    />
                </div>
                {errors.farm_name && <p className="text-red-500 text-sm mt-1">{errors.farm_name}</p>}
            </div>

            {/* Adresse */}
            <div className="space-y-2">
                <Label htmlFor="farm_location">Adresse</Label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                    <Input
                        id="farm_location"
                        value={farmForm.farm_location}
                        onChange={(e) => setFarmForm({ ...farmForm, farm_location: e.target.value })}
                        placeholder="Adresse complète"
                        className="pl-10 rounded-xl h-11 bg-input-background border-border"
                    />
                </div>
                {errors.farm_location && <p className="text-red-500 text-sm mt-1">{errors.farm_location}</p>}
            </div>

            {/* Ville & Région */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Ville *</Label>
                    <Input
                        value={farmForm.farm_city}
                        onChange={(e) => setFarmForm({ ...farmForm, farm_city: e.target.value })}
                        placeholder="Ville"
                        className="rounded-xl h-11 bg-input-background border-border"
                    />
                    {errors.farm_city && <p className="text-red-500 text-sm mt-1">{errors.farm_city}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Région *</Label>
                    <Select
                        value={farmForm.farm_region}
                        onValueChange={(v) => setFarmForm({ ...farmForm, farm_region: v })}
                    >
                        <SelectTrigger className="rounded-xl h-11 bg-input-background border-border">
                            <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                            {regions.map((r) => (
                                <SelectItem key={r} value={r}>
                                    {r}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.farm_region && <p className="text-red-500 text-sm mt-1">{errors.farm_region}</p>}
                </div>

                {!isInSenegal && (
                    <div className="space-y-2">
                        <Label htmlFor="farm_country">Pays *</Label>
                        <Input
                            id="farm_country"
                            value={farmForm.farm_country}
                            onChange={(e) => setFarmForm({ ...farmForm, farm_country: e.target.value })}
                            className={`border-border bg-input-background rounded-xl h-11 ${errors.farm_country ? 'border-destructive' : ''}`}
                            placeholder="Ex: France"
                        />
                        {errors.farm_country && <p className="text-sm text-destructive">{errors.farm_country}</p>}
                    </div>
                )}
            </div>

            {/* Taille & Nombre d'animaux */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Taille de la ferme *</Label>
                    <Select
                        value={farmForm.farm_size}
                        onValueChange={(v) => setFarmForm({ ...farmForm, farm_size: v })}
                    >
                        <SelectTrigger className="rounded-xl h-11 bg-input-background border-border">
                            <SelectValue placeholder="Taille de la ferme" />
                        </SelectTrigger>
                        <SelectContent>
                            {farmSizes.map((size) => (
                                <SelectItem key={size.value} value={size.value}>
                                    {size.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.farm_size && <p className="text-red-500 text-sm mt-1">{errors.farm_size}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Nombre d’animaux</Label>
                    <div className="relative">
                        <Users className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                        <Input
                            type="number"
                            value={farmForm.farm_animal_count}
                            onChange={(e) => setFarmForm({ ...farmForm, farm_animal_count: e.target.value })}
                            placeholder="Nombre"
                            className="pl-10 rounded-xl h-11 bg-input-background border-border"
                        />
                    </div>
                    {errors.farm_animal_count && (
                        <p className="text-red-500 text-sm mt-1">{errors.farm_animal_count}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
