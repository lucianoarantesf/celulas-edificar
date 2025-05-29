"use client";
import CelulasTable from './components/CelulasTable';
import CadastroModal from './components/CadastroModal';


export default function Home() {
  const atualizar = () => window.location.reload();

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Gerenciamento de Células</h1>

    <button 
      className="btn btn-primary mb-3" 
      data-bs-toggle="modal" 
      data-bs-target="#modalCadastro">
      Incluir
    </button>

      <CadastroModal onSave={atualizar} />
      <CelulasTable onEdit={(c) => console.log('Editar:', c)} />
    </div>
  );
}
