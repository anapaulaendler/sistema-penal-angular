import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { GetPrisioneirosAsync } from "./RequisicoesPrisioneiro";
import { Prisioneiro } from "../../models/Prisioneiro";

const ListarPrisioneiros = () => {
  const [prisioneiros, setPrisioneiros] = useState<Prisioneiro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const location = useLocation();
  const estaDetalhando = location.pathname.includes(
    "/listar/prisioneiro/detalhar",
  );

  useEffect(() => {
    const fetchPrisioneiros = async () => {
      try {
        const resposta = await GetPrisioneirosAsync();
        setPrisioneiros(resposta);
      } catch (erro) {
        console.error("Erro ao buscar prisioneiros:", erro);
        alert("Erro ao carregar prisioneiros");
      } finally {
        setCarregando(false);
      }
    };
    fetchPrisioneiros();
  }, []);

  const prisioneirosFiltrados = useMemo(() => {
    return prisioneiros.filter((p) =>
      p.nome.toLowerCase().includes(termoPesquisa.toLowerCase()),
    );
  }, [prisioneiros, termoPesquisa]);

  if (carregando) return <div className="form-container">Carregando...</div>;

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Lista de Prisioneiros</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar por nome..."
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="form-content">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Chegada</th>
              <th>Saída Atualizada</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {prisioneirosFiltrados.length === 0 ? (
              <tr>
                <td className="no-data" colSpan={6}>
                  {termoPesquisa
                    ? "Nenhum prisioneiro encontrado com esse nome"
                    : "Nenhum prisioneiro cadastrado"}
                </td>
              </tr>
            ) : (
              prisioneirosFiltrados.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nome}</td>
                  <td>{p.cpf}</td>
                  <td>{new Date(p.diaDeChegada).toLocaleDateString()}</td>
                  <td>
                    {new Date(p.diaDeSaidaAtualizado).toLocaleDateString()}
                  </td>
                  <td className="action-buttons">
                    <Link to={`/listar/prisioneiro/detalhar/${p.id}`}>
                      <button className="edit-btn">Detalhes</button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {estaDetalhando && (
        <div
          className="edit"
          style={{
            display: "flex",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}>
          <div className="edit-content">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarPrisioneiros;
