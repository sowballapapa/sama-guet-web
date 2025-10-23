import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { PawPrint, Heart, TrendingUp, Users, Calendar, Shield, Smartphone, BarChart3 } from "lucide-react";


function LandingPage() {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <PawPrint className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-primary">Sama-Guet</h1>
              <p className="text-xs text-muted-foreground">Gestion Intelligente de Bergerie</p>
            </div>
          </div>
          <Button onClick={()=> navigate('/login')} variant="outline" className="rounded-full">
            Connexion
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto animate-fadeIn">
          <div className="inline-block px-4 py-2 bg-accent/20 text-accent-foreground rounded-full mb-6">
            <span className="flex items-center gap-2">
              <PawPrint className="w-4 h-4" />
              <span>Plateforme AgriTech pour le Sénégal</span>
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
            Gérez votre troupeau avec
            <span className="text-primary"> intelligence</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sama-Guet vous aide à suivre vos moutons, optimiser la reproduction, gérer la santé de votre troupeau et maximiser vos revenus. Une solution moderne et simple pour les éleveurs sénégalais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={()=>navigate('/register')} size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
              <PawPrint className="w-5 h-5 mr-2" />
              Commencer gratuitement
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8">
              <Smartphone className="w-5 h-5 mr-2" />
              Voir la démo
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16">
          {[
            { label: "Éleveurs", value: "500+", icon: Users },
            { label: "Moutons suivis", value: "15K+", icon: PawPrint },
            { label: "Naissances", value: "3K+", icon: Heart },
            { label: "Bergeries", value: "200+", icon: Shield },
          ].map((stat, i) => (
            <Card key={i} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold mb-4">Fonctionnalités principales</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une plateforme complète pour gérer tous les aspects de votre bergerie
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: PawPrint,
                title: "Gestion du Troupeau",
                description: "Suivez chaque mouton individuellement avec photo, poids, race et historique complet",
                color: "text-primary"
              },
              {
                icon: Heart,
                title: "Reproduction",
                description: "Planifiez les accouplements, suivez les gestations et enregistrez les naissances",
                color: "text-destructive"
              },
              {
                icon: Shield,
                title: "Santé & Vaccinations",
                description: "Gérez les vaccinations, traitements et suivez l'état de santé du troupeau",
                color: "text-secondary"
              },
              {
                icon: BarChart3,
                title: "Statistiques & Rapports",
                description: "Visualisez l'évolution de votre troupeau avec des graphiques détaillés",
                color: "text-accent"
              },
              {
                icon: TrendingUp,
                title: "Marché & Ventes",
                description: "Estimez la valeur, gérez les ventes et suivez vos revenus",
                color: "text-primary"
              },
              {
                icon: Users,
                title: "Collaboration",
                description: "Travaillez avec vétérinaires, assistants et autres collaborateurs",
                color: "text-secondary"
              },
            ].map((feature, i) => (
              <Card key={i} className="border-border/50 hover:shadow-lg transition-shadow bg-card">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold mb-4">Pour tous les acteurs</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des interfaces adaptées à chaque rôle dans votre bergerie
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Propriétaire",
                description: "Vue complète et contrôle total de votre bergerie",
                features: ["Dashboard complet", "Gestion équipe", "Rapports financiers"]
              },
              {
                title: "Vétérinaire",
                description: "Outils spécialisés pour la santé du troupeau",
                features: ["Suivi médical", "Vaccinations", "Ordonnances"]
              },
              {
                title: "Éleveur",
                description: "Gestion quotidienne et reproduction",
                features: ["Accouplements", "Naissances", "Alimentation"]
              },
              {
                title: "Assistant",
                description: "Accès simplifié aux tâches quotidiennes",
                features: ["Saisie données", "Notifications", "Vue limitée"]
              },
            ].map((role, i) => (
              <Card key={i} className="border-border/50 bg-card hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{role.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
                  <ul className="space-y-2">
                    {role.features.map((feature, j) => (
                      <li key={j} className="text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Calendar className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h3 className="text-3xl font-semibold mb-4">Prêt à moderniser votre bergerie ?</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Rejoignez des centaines d'éleveurs qui font confiance à Sama-Guet pour gérer leur troupeau
            </p>
            <Button onClick={()=>navigate('/register')} size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
              <PawPrint className="w-5 h-5 mr-2" />
              Créer mon compte gratuitement
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Aucune carte de crédit requise • Installation en 2 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="font-semibold text-primary">Sama-Guet</div>
                <div className="text-xs text-muted-foreground">© 2025 - Tous droits réservés</div>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">À propos</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
              <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;