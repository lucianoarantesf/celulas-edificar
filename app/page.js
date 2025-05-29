"use client";

import CadastroModal from "./components/cadastroModal";
import CelulasTable from "./components/celulasTable";
//import CelulasMap from "./components/mapCelulas";



export default function Home() {
  const atualizar = () => window.location.reload();

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Gerenciamento de Células</h1>
      <CadastroModal onSave={atualizar} />
      <CelulasTable onEdit={(c) => console.log('Editar:', c)} />

      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalCadastro"
        >
          Cadastrar Nova Célula
        </button>
      </div>
      {/* <div className="container mt-4">
        <h1>Mapa de Células</h1>
        <CelulasMap/>
      </div>   */}
    </div>
  );
}
