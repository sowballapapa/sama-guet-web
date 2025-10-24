import { Outlet } from "react-router-dom";


function AdminLayout() {
  return (
    <div>
      <h1>Admin Layout</h1>
      {/* Contenu spécifique à l'espace admin */}
      <Outlet/>
    </div>
  );
}

export default AdminLayout;