import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { updateAnimal} from "../../../services/animal.service";
import {toast} from "react-toastify";
import AnimalForm from "../../forms/breeder/AnimalForm.tsx";
import {LoaderCircle, Plus} from "lucide-react";
import {authService} from "../../../services/auth.service.ts";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSaved: () => void;
    animal: any;
}

export default function EditAnimalModal({ isOpen, onClose, onSaved, animal }: Props) {
    const initialForm= {
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
    }
    const [form, setForm] = useState(initialForm);

    const handleClose = () =>{
        setForm(initialForm);
        setErrors({})
        setLoading(false)
        onClose()
    }

    useEffect(() => {
        if(isOpen && animal){
            setForm({...initialForm, ...animal})
            setErrors({})
            setLoading(false)
        }
    }, [isOpen, animal]);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const validateAnimalForm = () => {
        const newErrors: Record<string, string> = {};
        if (!form.name && !form.tag) newErrors.name = 'Le nom ou le nuémro d\'identification de l\'animal est requis';
        if (!form.sex) newErrors.sex = 'Le sexe est requis';
        if (!form.race_id) newErrors.race_id = 'Une race est requise';
        if (!form.status) newErrors.status = 'Le pays est requis';
        if (!form.health_status) newErrors.health_status = "L'état de santé est requise";
        if (!form.farm) newErrors.farm = "La Bergerie est requise" ;


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateAnimalForm()) return;
        setLoading(true)
        setErrors({})

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

            Object.entries(form).forEach(([key, value]) => {
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

            const res = await updateAnimal(animal.id, formData);

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
            }catch(err){
                console.error(err)
            }

            handleClose()
        } catch (error) {
            toast.error("Erreur de connexion au serveur.");
        } finally {
            setLoading(false);
            onSaved()
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-4/5 overflow-auto max-w-screen min-w-1/2">
                <DialogHeader>
                    <DialogTitle>Modifier l’animal</DialogTitle>
                </DialogHeader>

                <AnimalForm animalForm={form} setAnimalForm={setForm} errors={errors}/>

                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ?
                        (<div className="flex gap-2"><LoaderCircle className="animate-spin"/> <span className="animate-pulse">Modification...</span></div>)
                        : (<div className="flex gap-2"><Plus/> <span>Modifier</span></div>)}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
