import { Outlet } from "react-router-dom";


function VetLayout() {
  return (
    <>
        <h1>Vet Layout</h1>
        <Outlet />
    </>
  )
}

export default VetLayout;