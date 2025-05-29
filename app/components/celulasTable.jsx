"use client";
import { useState, useEffect } from "react";
import { SUPABASE_URL, supabaseHeaders } from "../../lib/supabase";
import "../globals.css";

export default function CelulasTable({ onEdit }) {
  const [celulas, setCelulas] = useState([]);
  const [busca, setBusca] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/CelulaEdificar?select=*`, { headers: supabaseHeaders })
      .then((res) => res.json())
      .then((data) => setCelulas(data));
  }, []);

  const filtradas = celulas.filter((c) =>
    Object.values(c).some((val) =>
      String(val).toLowerCase().includes(busca.toLowerCase())
    )
  );

  const sorted = [...filtradas].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const valA = a[sortConfig.key] || "";
    const valB = b[sortConfig.key] || "";

    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = sorted.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sorted.length / itemsPerPage);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3 flex-wrap gap-2">
        <input
          className="form-control text-uppercase"
          style={{ minWidth: "200px" }}
          placeholder="Pesquisar..."
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div className="d-flex align-items-center">
          <label className="me-2">Itens por página:</label>
          <select
            className="form-select"
            style={{ width: "auto" }}
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <div className="table-responsive-xl">
        <table className="table table-bordered text-uppercase">
          <thead className="thead-dark">
            <tr>
              {[
                { key: "id_rede", label: "Rede" },
                { key: "id_tipoCelula", label: "Tipo Célula" },
                { key: "nomeCelula", label: "Nome" },
                { key: "nomeAnfitriao", label: "Anfitrião" },
                { key: "contatoAnfitriao", label: "Contato Anfitrião" },
                { key: "nomeLider", label: "Líder" },
                { key: "contatoLider", label: "Contato Líder" },
                { key: "horarioCelula", label: "Horário" },
                { key: "diaCelula", label: "Dia" },
                { key: "logradouro", label: "Endereço" },
                { key: "complemento", label: "Complemento" },
                { key: "bairro", label: "Bairro" },
                { key: "cidade", label: "Cidade" },
                { key: "uf", label: "Estado" }
              ].map((col) => (
                <th
                  scope="col"
                  className="text-center"
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{ cursor: "pointer" }}
                >
                  {col.label} {renderSortIcon(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((c) => (
              <tr key={c.id}>
                <td className="text-center">
                  {c.id_rede === 6 ? "REDE Radicais Livres" : `REDE ${c.id_rede}`}
                </td>
                <td className="text-center">
                  {c.id_tipoCelula === 1
                    ? "ADULTOS"
                    : c.id_tipoCelula === 2
                    ? "ADULTOS/KIDS"
                    : c.id_tipoCelula === 3
                    ? "KIDS"
                    : `RADICAIS LIVRES`}
                </td>
                <td>{c.nomeCelula}</td>
                <td>{c.nomeAnfitriao}</td>
                <td>{c.contatoAnfitriao}</td>
                <td>{c.nomeLider}</td>
                <td>{c.contatoLider}</td>
                <td>{c.horarioCelula}</td>
                <td>{c.diaCelula}</td>
                <td>
                  {c.logradouro}, {c.numero}
                </td>
                <td>{c.complemento}</td>
                <td>{c.bairro}</td>
                <td>{c.cidade}</td>
                <td>{c.uf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav>
        <ul className="pagination justify-content-center flex-wrap">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={goToPreviousPage}>
              Anterior
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={goToNextPage}>
              Próximo
            </button>
          </li>
        </ul>
      </nav>

    </>
  );
}
