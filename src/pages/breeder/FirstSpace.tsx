import { useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { Check, ArrowLeft, PawPrint, Building, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FarmForm from "../../components/forms/breeder/FarmForm";
import AnimalForm from "../../components/forms/breeder/AnimalForm";

import { createFarm } from '../../services/farm.service';
import { createAnimal } from "../../services/animal.service";
import {authService} from "../../services/auth.service.ts";

function FirstSpace() {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [farmForm, setFarmForm] = useState({
        farm_name: "",
        farm_location: "",
        farm_description: "",
        farm_city: "",
        farm_region: "",
        farm_country: "Sénégal",
        farm_size: "very_small",
        farm_animal_count: null,
    });

    const [animalForm, setAnimalForm] = useState({
        name: "",
        tag: "",
        description: "",
        birth_date: null,
        sex: "",
        color: "",
        weight: null,
        hg: null,
        lcs: null,
        tp: null,
        status: "active",
        health_status: "healthy",
        market_value: null,
        acquisition_date: null,
        acquisition_price: null,
        acquisition_farm: "",
        dad_name: "",
        mum_name: "",
        race_id: null,
        farm: null,
        image: null,
    });

    const [errors, setErrors] = useState<any>({});

    const validateFarmForm = () => {
        const newErrors: Record<string, string> = {};
        if (!farmForm.farm_name) newErrors.farm_name = 'Le nom de la bergerie est requis';
        if (!farmForm.farm_city) newErrors.farm_city = 'La ville est requise';
        if (!farmForm.farm_region) newErrors.farm_region = 'La région est requise';
        if (!farmForm.farm_country) newErrors.farm_country = 'Le pays est requis';
        if (farmForm.farm_region === 'Pas du Sénégal' && farmForm.farm_country.includes('Sénégal'))
            newErrors.farm_country = 'Merci de préciser un pays différent du Sénégal';
        if (!farmForm.farm_size) newErrors.farm_size = 'La taille est requise';


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateAnimalForm = () => {
        const newErrors: Record<string, string> = {};
        if (!animalForm.name && !animalForm.tag) newErrors.name = 'Le nom ou le nuémro d\'identification de l\'animal est requis';
        if (!animalForm.sex) newErrors.sex = 'Le sexe est requis';
        if (!animalForm.race_id) newErrors.race_id = 'Une race est requise';
        if (!animalForm.status) newErrors.status = 'Le pays est requis';
        if (!animalForm.health_status) newErrors.health_status = "L'état de santé est requise";


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateFarm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFarmForm()) return;

        setLoading(true);
        try {
            const res = await createFarm(farmForm);
            if (!res) {
                toast.error("Erreur lors de la création de la bergerie.");
                setLoading(false);
                return;
            }
            toast.success("Bergerie créée avec succès !");
            setAnimalForm(prev => ({ ...prev, farm: res.id }));
            setCurrentStep(2);
        } catch (err) {
            toast.error("Impossible de se connecter au serveur.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAnimal = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateAnimalForm()) return;
        setLoading(true);
        setErrors({});

        try {
            const formData = new FormData();

            const numericKeys = [
                "weight",
                "hg",
                "lcs",
                "tp",
                "market_value",
                "acquisition_price",
                "race_id",
                "farm",
                "farm_animal_count",
            ];

            Object.entries(animalForm).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== "") {
                    if (numericKeys.includes(key)) {
                        const num = Number(value);
                        // n'envoyer que si nombre valide et strictement > 0 (évite envoyer "0" qui donne Invalid pk "0")
                        if (!Number.isNaN(num) && num > 0) {
                            formData.append(key, num.toString());
                        }
                    } else if (["birth_date", "acquisition_date"].includes(key)) {
                        formData.append(key, value ? new Date(String(value)).toISOString().split("T")[0] : "");
                    } else if (key === "image" && (value as any) instanceof File) {
                        formData.append("image", value as File);
                    } else {
                        formData.append(key, String(value));
                    }
                }
            });

            const res = await createAnimal(formData);

            if (!res) {
                toast.error("Erreur lors de la création de l’animal.");
                setLoading(false);
                return;
            }

            toast.success("Animal créé avec succès !");
            try {
                const res_refresh = await authService.tokenRefresh()
                if (!res_refresh){
                    toast.error("Erreur lors du rafraichissement de votre session!")
                }
                toast.info("Votre espace est prêt! Bonne gestion de votre Bergerie avec nous!")
                navigate("/espace-eleveur");
            }catch(err){
                console.error(err)
            }
        } catch (error) {
            toast.error("Erreur de connexion au serveur.");
        } finally {
            setLoading(false);
        }
    };

    const prevStep = () => setCurrentStep((s) => s - 1);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-muted/30 flex items-center justify-center p-6">
            <div className="w-full max-w-3xl">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/espace-eleveur")}
                    className="mb-4 rounded-full"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Retour
                </Button>

                <div className="text-center mb-8 animate-fadeIn">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                            <PawPrint className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-primary">Espace Éleveur</h1>
                            <p className="text-sm text-muted-foreground">Configuration initiale de votre élevage</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mb-6">
                    {[1, 2].map((step) => (
                        <div key={step} className="flex items-center">
                            <div
                                className={`rounded-full flex items-center justify-center w-10 h-10 text-sm transition-all ${
                                    currentStep > step
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : currentStep === step
                                            ? "bg-primary/10 text-primary border-2 border-primary"
                                            : "bg-muted text-muted-foreground border border-border"
                                }`}
                            >
                                {currentStep > step ? <Check className="w-5 h-5" /> : step}
                            </div>
                            {step < 2 && (
                                <div
                                    className={`w-12 h-0.5 ${currentStep > step ? "bg-primary" : "bg-border"}`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <Card className="border-border shadow-2xl bg-card">
                    <CardContent className="p-6">
                        {currentStep === 1 && (
                            <>
                                <div className="text-center mb-4">
                                    <CardTitle className="text-foreground flex items-center justify-center gap-2">
                                        <Building className="w-5 h-5 text-primary" />
                                        Ajouter une bergerie
                                    </CardTitle>
                                    <CardDescription>
                                        Renseignez les informations sur votre exploitation
                                    </CardDescription>
                                </div>

                                <form onSubmit={handleCreateFarm}>
                                    <FarmForm
                                        farmForm={farmForm}
                                        setFarmForm={setFarmForm}
                                        errors={errors}
                                    />
                                    <Separator className="my-6" />
                                    <div className="flex justify-end">
                                        <Button type="submit" disabled={loading}>
                                            {loading ? "Enregistrement..." : "Suivant"}
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}

                        {currentStep === 2 && (
                            <>
                                <div className="text-center mb-4">
                                    <CardTitle className="text-foreground flex items-center justify-center gap-2">
                                        <PlusCircle className="w-5 h-5 text-primary" />
                                        Ajouter un animal
                                    </CardTitle>
                                    <CardDescription>
                                        Créez votre premier animal dans la bergerie
                                    </CardDescription>
                                </div>

                                <form onSubmit={handleCreateAnimal}>
                                    <AnimalForm
                                        animalForm={animalForm}
                                        setAnimalForm={setAnimalForm}
                                        errors={errors}
                                    />

                                    <Separator className="my-6" />
                                    <div className="flex justify-between">
                                        <Button variant="outline" onClick={prevStep}>
                                            Retour
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="bg-primary text-primary-foreground"
                                            disabled={loading}
                                        >
                                            {loading ? "Enregistrement..." : "Terminer"}
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default FirstSpace;