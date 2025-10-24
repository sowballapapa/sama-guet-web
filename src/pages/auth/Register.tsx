import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription,  CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import { Separator } from '../../components/ui/separator';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  AlertCircle,
  MapPin,
  Building,
  Users,
  Phone,
  Mail,
  PawPrint,
  PenOff,
  Loader2,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {toast} from 'react-toastify'


export function RegisterPage() {
    const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Étape 1 - Informations personnelles
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    phone: '',
    role: '',
    
    // Étape 2 - Informations bergerie
    farm_name: '',
    farm_location: '',
    farm_city: '',
    farm_region: '',
    farm_country: 'Sénégal',
    farm_size: '',
    farm_animal_count: '',
    
    // Étape 3 - Sécurité
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptMarketing: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);

  const roles = [
    { value: 'breeder', label: 'Propriétaire de bergerie', description: 'Accès complet à toutes les fonctionnalités' },
    // { value: 'eleveur', label: 'Éleveur', description: 'Gestion des animaux et reproduction' },
    { value: 'vet', label: 'Vétérinaire', description: 'Gestion de la santé et vaccinations' },
    // { value: 'assistant', label: 'Assistant', description: 'Saisie de données et tâches administratives' }
  ];

  const regions = [
    'Dakar', 'Thiès', 'Saint-Louis', 'Diourbel', 'Louga', 'Fatick', 
    'Kaolack', 'Tambacounda', 'Kaffrine', 'Kédougou', 'Kolda', 
    'Matam', 'Sédhiou', 'Ziguinchor','Pas du Sénégal'
  ];

  const [isInSenegal, setIsInSenegal] = useState(true);
  
  useEffect(() => {
    setIsInSenegal(formData.farm_region !== 'Pas du Sénégal');
    setFormData(prev => ({ ...prev, farm_country: formData.farm_region === 'Pas du Sénégal' ? '' : 'Sénégal' }));
  }, [formData.farm_region]);

  const farm_size = [
    { value: 'small', label: 'Petite (1-50 animaux)' },
    { value: 'medium', label: 'Moyenne (51-200 animaux)' },
    { value: 'large', label: 'Grande (201-500 animaux)' },
    { value: 'very_large', label: 'Très grande (500+ animaux)' }
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.first_name) newErrors.first_name = 'Le prénom est requis';
      if (!formData.last_name) newErrors.last_name = 'Le nom est requis';
      if (!formData.email) newErrors.email = 'L\'email est requis';
      if (!formData.role) newErrors.role = 'Le rôle est requis';
      
      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = 'Format d\'email invalide';
      }
    }

    if (step === 2 && formData.role === 'breeder') {
      if (!formData.farm_name) newErrors.farm_name = 'Le nom de la bergerie est requis';
      if (!formData.farm_city) newErrors.farm_city = 'La ville est requise';
      if (!formData.farm_region) newErrors.farm_region = 'La region est requise';
      if (!formData.farm_country) newErrors.farm_country = 'Le pays est requis';
      if (formData.farm_region === 'Pas du Sénégal' && formData.farm_country.includes('Sénégal')) newErrors.farm_country = 'Merci de préciser un pays différent du Sénégal';
      if (!formData.farm_size) newErrors.farm_size = 'La taille est requise';
    }

    if (step === 3) {
      if (!formData.password) newErrors.password = 'Le mot de passe est requis';
      if (formData.password && formData.password.length < 8) {
        newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
      }
      if (!formData.confirmPassword) newErrors.confirmPassword = 'La confirmation est requise';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
      if (!formData.acceptTerms) newErrors.acceptTerms = 'Vous devez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (formData.role !== 'breeder' && currentStep === 1) {
        setCurrentStep(3); // Skip step 2 for non-breeders
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (formData.role !== 'breeder' && currentStep === 3) {
      setCurrentStep(1); // Skip step 2 for non-breeders
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (validateStep(3)) {
      // Simulate registration
      if (formData.username === '') {
        // If username is not set, use email as username
        setFormData(prev => ({ ...prev, username: formData.email }));
      }
      console.log('Registration data:', formData);
      setLoading(true);
      try {
        console.log('About to call api.post');
        const response = await api.post("/users/register/", formData); // adapter l’URL
        console.log('api.post returned', response && response.status);

        try {
          console.log('Calling toast.success');
          toast.success("Inscription réussie !");
          console.log('toast.success returned');
        } catch (tErr) {
          console.error('toast threw', tErr);
        }

        try {
          console.log('Calling navigate("/login")');
          navigate("/login");
          console.log('navigate returned');
        } catch (nErr) {
          console.error('navigate threw', nErr);
        }
      }catch (err: any) {
        if (err.response) {
          const data = err.response.data;
  
          // Gérer les non_field_errors
          if (data.non_field_errors) {
            setErrors({ non_field_errors: data.non_field_errors[0] });
            toast.error(data.non_field_errors[0]);
          }
  
          // Gérer les erreurs champ par champ
          if (data.email) setErrors(prev => ({ ...prev, email: data.email[0] }));
          if (data.password) setErrors(prev => ({ ...prev, password: data.password[0] }));
        } else {
          toast.error("Erreur réseau ou serveur indisponible");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

        {/* Header */}
        <div className="text-center mb-6 animate-fadeIn">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <PawPrint className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-primary">Sama-Guet</h1>
              <p className="text-sm text-muted-foreground">Gestion de bergerie</p>
            </div>
          </div>
          <h2 className="text-xl text-foreground mb-2">Créer un compte</h2>
          <p className="text-muted-foreground">Rejoignez la plateforme de gestion de bergerie</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => {
              const isCompleted = currentStep > step;
              const isCurrent = currentStep === step;
              const lastStep  = 3;
              const isSkipped = formData.role !== 'breeder' && step === 2 && lastStep===3;
              
            //   if (isSkipped) return null;
              
              return (
                <div key={step} className="flex items-center">
                  <div className={`rounded-full flex items-center justify-center transition-all ${ 
                    isCompleted 
                      ? 'w-10 h-10 bg-primary text-primary-foreground shadow-md' 
                      : isSkipped 
                        ?'w-8 h-8 bg-gray-100 text-gray-500 border shadow-md'
                        :isCurrent 
                        ? 'w-10 h-10 bg-primary/10 text-primary border-2 border-primary' 
                        : 'w-10 h-10 bg-muted text-muted-foreground border border-border'
                  }`}>
                    {
                        isCompleted ? 
                            <Check className="w-5 h-5" /> 
                            : isSkipped
                                ? <PenOff/> 
                                : step
                    }
                  </div>
                  {step < 3  && (
                    <div className={`w-12 h-0.5 transition-all ${ 
                      isCompleted ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <Card className="border-border shadow-2xl bg-card">
          <CardContent className="p-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <CardTitle className="text-foreground">Informations personnelles</CardTitle>
                  <CardDescription>Renseignez vos informations de base</CardDescription>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">Prénom *</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                      className={`border-border bg-input-background rounded-xl h-11 ${errors.first_name ? 'border-destructive' : ''}`}
                      placeholder="Votre prénom"
                    />
                    {errors.first_name && <p className="text-sm text-destructive">{errors.first_name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last_name">Nom *</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                      className={`border-border bg-input-background rounded-xl h-11 ${errors.last_name ? 'border-destructive' : ''}`}
                      placeholder="Votre nom"
                    />
                    {errors.last_name && <p className="text-sm text-destructive">{errors.last_name}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`border-border bg-input-background rounded-xl h-11 pl-10 ${errors.email ? 'border-destructive' : ''}`}
                      placeholder="votre@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div> 
                <div className="space-y-2">
                  <Label htmlFor="username">Nom d'utilisateur </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className={`border-border bg-input-background rounded-xl h-11 pl-10 ${errors.username ? 'border-destructive' : ''}`}
                      placeholder="Votre pseudo"
                    />
                  </div>
                  {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`border-border bg-input-background rounded-xl h-11 pl-10 ${errors.phone ? 'border-destructive' : ''}`}
                      placeholder="+221 XX XXX XX XX"
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Rôle *</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value) => setFormData({...formData, role: value})}
                  >
                    <SelectTrigger className={`border-border bg-input-background rounded-xl h-11 ${errors.role ? 'border-destructive' : ''}`}>
                      <SelectValue placeholder="Sélectionnez votre rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          <div>
                            <p className="font-medium">{role.label}</p>
                            <p className="text-sm text-muted-foreground">{role.description}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
                </div>

                {formData.role && (
                  <Alert className="bg-primary/5 border-primary/20">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <AlertDescription className="text-foreground">
                      {formData.role === 'breeder' 
                        ? "En tant que propriétaire, vous aurez accès à toutes les fonctionnalités et pourrez gérer d'autres utilisateurs."
                        : "Votre compte devra être validé par un propriétaire de bergerie avant d'être activé."
                      }
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Step 2: Bergerie Information (only for breeders) */}
            {currentStep === 2 && formData.role === 'breeder' && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <CardTitle className="text-foreground">Informations de la bergerie</CardTitle>
                  <CardDescription>Décrivez votre exploitation</CardDescription>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farm_name">Nom de la bergerie *</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="farm_name"
                      value={formData.farm_name}
                      onChange={(e) => setFormData({...formData, farm_name: e.target.value})}
                      className={`border-border bg-input-background rounded-xl h-11 pl-10 ${errors.farm_name ? 'border-destructive' : ''}`}
                      placeholder="Nom de votre bergerie"
                    />
                  </div>
                  {errors.farm_name && <p className="text-sm text-destructive">{errors.farm_name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farm_location">Adresse </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="farm_location"
                      value={formData.farm_location}
                      onChange={(e) => setFormData({...formData, farm_location: e.target.value})}
                      className={`border-border bg-input-background rounded-xl h-11 pl-10 ${errors.farm_location ? 'border-destructive' : ''}`}
                      placeholder="Adresse complète"
                    />
                  </div>
                  {errors.farm_location && <p className="text-sm text-destructive">{errors.farm_location}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farm_city">Ville *</Label>
                    <Input
                      id="farm_city"
                      value={formData.farm_city}
                      onChange={(e) => setFormData({...formData, farm_city: e.target.value})}
                      className={`border-border bg-input-background rounded-xl h-11 ${errors.farm_city ? 'border-destructive' : ''}`}
                      placeholder="Ville"
                    />
                    {errors.farm_city && <p className="text-sm text-destructive">{errors.farm_city}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farm_region">Région *</Label>
                    <Select 
                      value={formData.farm_region} 
                      onValueChange={(value) => setFormData({...formData, farm_region: value})}
                    >
                      <SelectTrigger className={`border-border bg-input-background rounded-xl h-11 ${errors.farm_region ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder="Sélectionnez la région" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.farm_region && <p className="text-sm text-destructive">{errors.farm_region}</p>}
                  </div>
                </div>
                
                {!isInSenegal && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="farm_country">Pays *</Label>
                        <Input
                          id="farm_country"
                          value={formData.farm_country}
                          onChange={(e) => setFormData({...formData, farm_country: e.target.value})}
                          className={`border-border bg-input-background rounded-xl h-11 ${errors.farm_country ? 'border-destructive' : ''}`}
                          placeholder="Ville"
                        />
                        {errors.farm_country && <p className="text-sm text-destructive">{errors.farm_country}</p>}
                      </div>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farm_size">Taille de l'exploitation *</Label>
                    <Select 
                      value={formData.farm_size} 
                      onValueChange={(value) => setFormData({...formData, farm_size: value})}
                    >
                      <SelectTrigger className={`border-border bg-input-background rounded-xl h-11 ${errors.farm_size ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder="Taille" />
                      </SelectTrigger>
                      <SelectContent>
                        {farm_size.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.farm_size && <p className="text-sm text-destructive">{errors.farm_size}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farm_animal_count">Nombre d'animaux actuel </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="farm_animal_count"
                        type="number"
                        value={formData.farm_animal_count}
                        onChange={(e) => setFormData({...formData, farm_animal_count: e.target.value})}
                        className={`border-border bg-input-background rounded-xl h-11 pl-10 ${errors.farm_animal_count ? 'border-destructive' : ''}`}
                        placeholder="Nombre"
                      />
                    </div>
                    {errors.farm_animal_count && <p className="text-sm text-destructive">{errors.farm_animal_count}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Security */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <CardTitle className="text-foreground">Sécurité du compte</CardTitle>
                  <CardDescription>Créez un mot de passe sécurisé</CardDescription>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className={`border-border bg-input-background rounded-xl h-11 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                      placeholder="Mot de passe"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${strengthColors[Math.max(0, passwordStrength - 1)]}`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {strengthLabels[Math.max(0, passwordStrength - 1)]}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                        <p className="font-medium mb-2">Le mot de passe doit contenir :</p>
                        <ul className="space-y-1">
                          <li className={`flex items-center gap-2 ${formData.password.length >= 8 ? 'text-primary' : ''}`}>
                            {formData.password.length >= 8 ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            Au moins 8 caractères
                          </li>
                          <li className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? 'text-primary' : ''}`}>
                            {/[A-Z]/.test(formData.password) ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            Une majuscule
                          </li>
                          <li className={`flex items-center gap-2 ${/[a-z]/.test(formData.password) ? 'text-primary' : ''}`}>
                            {/[a-z]/.test(formData.password) ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            Une minuscule
                          </li>
                          <li className={`flex items-center gap-2 ${/[0-9]/.test(formData.password) ? 'text-primary' : ''}`}>
                            {/[0-9]/.test(formData.password) ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            Un chiffre
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className={`border-border bg-input-background rounded-xl h-11 pr-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                      placeholder="Confirmer le mot de passe"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => setFormData({...formData, acceptTerms: !!checked})}
                      className={errors.acceptTerms ? 'border-destructive' : ''}
                    />
                    <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                      J'accepte les <a href="#" className="text-primary hover:underline">conditions d'utilisation</a> et 
                      la <a href="#" className="text-primary hover:underline">politique de confidentialité</a> *
                    </Label>
                  </div>
                  {errors.acceptTerms && <p className="text-sm text-destructive">{errors.acceptTerms}</p>}

                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="acceptMarketing"
                      checked={formData.acceptMarketing}
                      onCheckedChange={(checked) => setFormData({...formData, acceptMarketing: !!checked})}
                    />
                    <Label htmlFor="acceptMarketing" className="text-sm leading-relaxed">
                      Je souhaite recevoir des informations sur les nouveautés et mises à jour
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <Separator className="my-6" />
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={currentStep === 1 ? () => navigate('/') : prevStep}
                className="rounded-full border-border"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentStep === 1 ? 'Retour' : 'Précédent'}
              </Button>

              {currentStep < 3 ? (
                <Button onClick={nextStep} className="rounded-full bg-primary hover:bg-primary/90">
                  Suivant
                </Button>
              ) : (
                <Button 
                    onClick={handleSubmit} 
                    className="rounded-full bg-primary hover:bg-primary/90"
                    disabled={loading}
                >
                  {loading ?  
                      <span className='flex justify-center items-center gap-3'>
                          <Loader2 className='animate-spin'/> Inscription en cours...
                      </span>  
                      : 'Créer le compte'}
                  
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>
            Déjà un compte ? 
            <button 
              onClick={() => navigate('/login')}
              className="text-primary hover:underline ml-1"
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}