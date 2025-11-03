import { Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";
import {useTheme} from "../../hooks/useTheme.ts";
import {useAuth} from "../../hooks/useAuth.ts";

export function Header() {
    const {theme, toggleTheme} = useTheme()
    const user = useAuth()
    const isVet = user?.role === "vet";

    return (
        <header
            className="flex justify-between bg-card border-border border-b p-4 pl-16 lg:pl-4 sticky top-0 z-30 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold text-primary">Sama-Guet</h1>
                        {isVet? (
                            <p className="text-xs text-muted-foreground">Gestion de cabinet vétérinaire</p>
                        ):(
                            <p className="text-xs text-muted-foreground">Gestion de bergerie</p>
                        )}
                    </div>
                </div>
            <Button
                variant="ghost"
                className="p-2 rounded-full"
                onClick={toggleTheme}
            >
                {theme === "light" ? <Moon className="w-5 h-5"/> : <Sun className="w-5 h-5"/>}
            </Button>
        </header>
    );
}
