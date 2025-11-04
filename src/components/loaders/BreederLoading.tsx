import {LoaderCircle} from "lucide-react";


function BreederLoading(){

    return (
        <div className="flex justify-center gap-4 items-center h-[70vh] m-auto text-gray-700 dark:text-gray-100">
            <LoaderCircle className="animate-spin" size={24}/> <span className="animate-fadeIn">Chargement en cours...</span>
        </div>
    )
}

export default BreederLoading