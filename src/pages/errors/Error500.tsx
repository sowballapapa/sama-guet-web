import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Home, RefreshCw, AlertCircle, Mail } from 'lucide-react';

interface Error500PageProps {
    onGoHome: () => void;
    onRetry?: () => void;
}

export function Error500Page({ onGoHome, onRetry }: Error500PageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50/30 to-yellow-50/30 dark:from-slate-950 dark:via-red-950/30 dark:to-slate-950 flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center">
                {/* Animated 500 */}
                <div className="relative mb-8 animate-fadeIn">
                    <h1 className="text-[180px] md:text-[240px] font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent leading-none">
                        500
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />
                    </div>
                </div>

                {/* Warning Icon */}
                <div className="flex justify-center mb-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                    <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400 animate-pulse" />
                    </div>
                </div>

                {/* Message */}
                <div className="mb-8 space-y-3 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                        Erreur serveur
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Quelque chose s'est mal passé de notre côté...
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        Nos équipes ont été automatiquement notifiées et travaillent sur le problème.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                    {onRetry && (
                        <Button
                            onClick={onRetry}
                            size="lg"
                            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg shadow-red-500/20 rounded-full px-8"
                        >
                            <RefreshCw className="w-5 h-5 mr-2" />
                            Réessayer
                        </Button>
                    )}

                    <Button
                        onClick={onGoHome}
                        variant="outline"
                        size="lg"
                        className="border-2 rounded-full px-8"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        Retour à l'accueil
                    </Button>
                </div>

                {/* Error Details */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 border-none shadow-xl animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                            <div className="flex-1">
                                <h4 className="font-semibold text-sm text-red-900 dark:text-red-200 mb-1">
                                    Que s'est-il passé ?
                                </h4>
                                <p className="text-sm text-red-700 dark:text-red-300">
                                    Une erreur inattendue s'est produite sur nos serveurs. Cela peut être temporaire.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg text-left">
                                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                                    Que puis-je faire ?
                                </h4>
                                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                    <li>• Rafraîchir la page</li>
                                    <li>• Réessayer dans quelques minutes</li>
                                    <li>• Vider le cache du navigateur</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg text-left">
                                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                                    Besoin d'aide ?
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                    Contactez notre support si le problème persiste.
                                </p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    Contacter le support
                                </Button>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-500 dark:text-slate-500">
                                Code d'erreur: 500 • ID de la requête: {Math.random().toString(36).substring(7).toUpperCase()}
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Decorative Elements */}
                <div className="fixed top-10 left-10 w-20 h-20 bg-red-500/10 rounded-full blur-2xl animate-pulse" />
                <div className="fixed bottom-10 right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
        </div>
    );
}
