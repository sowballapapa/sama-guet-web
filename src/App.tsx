import AppRouter from "./routes/AppRouter"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


function App() {

  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // ou "light"/"dark"
      />
    </>
  )
}

export default App
