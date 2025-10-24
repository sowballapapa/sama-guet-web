import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { PawPrint, ArrowLeft, Mail, Lock,  Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {toast} from 'react-toastify';


export function LoginPage() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string; non_field_errors?: string}>({});


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', loginData);
    setLoading(true);
    try {
      const response = await api.post("/users/login/", loginData); // adapter l’URL
      console.log(response)

      // Stocker le token localement
      localStorage.setItem("token_access", response.data.access);
      localStorage.setItem("token_refresh", response.data.refresh);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("role", JSON.stringify(response.data.user.role));

      toast.success("Connexion réussie !");
      navigate("/"); // rediriger vers le dashboard
    } catch (err: any) {
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
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

        {/* Logo & Title */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <PawPrint className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-semibold text-primary mb-2">Sama-Guet</h1>
          <p className="text-muted-foreground">Gestion intelligente de bergerie</p>
        </div>

        {/* Login Card */}
        <Card className="border-border shadow-2xl bg-card">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl text-foreground">Connexion</CardTitle>
            <CardDescription>
              Accédez à votre espace de gestion
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
      {errors.non_field_errors && (
        <p className="text-red-500 mb-2">{errors.non_field_errors}</p>
      )}
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email ou nom d'utilisateur
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="exemple@mail.com ou utilisateur123"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  className={`border-border bg-input-background focus:border-primary h-12 rounded-xl ${(errors.non_field_errors && !errors.non_field_errors.includes('passe')) ?'border-red-500':''}`}
                  required
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className={`border-border bg-input-background focus:border-primary h-12 rounded-xl ${(errors.non_field_errors && errors.non_field_errors.includes('passe'))?'border-red-500':''}`}
                  required
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 h-12 rounded-xl text-base"
                disabled={loading}
              >
                {loading ?  
                    <span className='flex justify-center items-center gap-3'>
                        <Loader2 className='animate-spin'/> Connexion...
                    </span>  
                    : 'Se connecter'}
              </Button>
            </form>
            
            <div className="mt-6 space-y-4">
              <div className="text-center">
                <Button onClick={()=>navigate('/forgot-password')} variant="ghost" className="text-primary hover:text-primary/80">
                  Mot de passe oublié ?
                </Button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">Information</span>
                </div>
              </div>
              
              <Link to={'/register'}>
                <div className="text-center p-4 bg-muted/50 rounded-xl border border-border">
                
                    <p className="text-sm text-muted-foreground">
                    Pas encore de compte ? <br />
                    <strong className='text-bold underline'>
                        S'inscrire
                    </strong>
                    </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2025 Sama-Guet - Tous droits réservés
        </p>
      </div>
    </div>
  );
}