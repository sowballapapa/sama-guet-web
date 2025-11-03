import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';

interface Error403PageProps {
    onGoHome: () => void;
    onGoBack?: () => void;
}

export function Error403Page({ onGoHome, onGoBack }: Error403PageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Animated 403 */}
                <div className="relative mb-8 animate-fadeIn">
                    <h1 className="text-[180px] md:text-[240px] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-none">
                        403
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
                    </div>
                </div>

                {/* Message */}
                <div className="mb-8 space-y-3 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                        Accès refusé
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Oups ! Vous n'avez pas la permission d'accéder à cette page.
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        Il se peut que vous n'ayez pas les droits nécessaires ou que vous deviez vous connecter.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                    <Button
                        onClick={onGoHome}
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/20 rounded-full px-8"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Retour à l'accueil
                    </Button>

                    {onGoBack && (
                        <Button
                            onClick={onGoBack}
                            variant="outline"
                            size="lg"
                            className="border-2 rounded-full px-8"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Page précédente
                        </Button>
                    )}
                </div>

                {/* Quick Links */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 border-none shadow-xl animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                        Liens utiles
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                            onClick={onGoHome}
                            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300"
                        >
                            <Home className="w-4 h-4" />
                            Accueil
                        </button>
                        <button
                            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300"
                        >
                            <Search className="w-4 h-4" />
                            Rechercher
                        </button>
                        <button
                            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300"
                        >
                            <HelpCircle className="w-4 h-4" />
                            Aide
                        </button>
                    </div>
                </Card>

                {/* Decorative Elements */}
                <div className="fixed top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
                <div className="fixed bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
        </div>
    );
}
