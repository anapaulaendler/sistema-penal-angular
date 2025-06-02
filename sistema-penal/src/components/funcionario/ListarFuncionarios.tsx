import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import type { Funcionario } from "../../models/Funcionario";
import { DeleteFuncionario, GetFuncionarios } from "./RequisicoesFuncionario";
import { formatDateToISO } from "../../util/FormatarData";

const ListarFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const location = useLocation();
  const estaEditando = location.pathname.includes("/listar/funcionario/editar");

  const carregarFuncionarios = async () => {
    try {
      const resposta = await GetFuncionarios();
      const dados: Funcionario[] = resposta;
      setFuncionarios(dados);
    } catch (erro: any) {
      console.error("Erro ao carregar funcionarios:", erro);
      alert("Erro ao carregar funcionarios");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const funcionariosFiltrados = useMemo(() => {
    return funcionarios.filter((funcionario) =>
      funcionario.nome.toLowerCase().includes(termoPesquisa.toLowerCase()),
    );
  }, [funcionarios, termoPesquisa]);

  if (carregando) {
    return <div className="form-container">Carregando...</div>;
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Lista de Funcionarios</h2>
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
              <th>Data Nascimento</th>
              <th>Email</th>
              <th>Papel</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionariosFiltrados.length === 0 ? (
              <tr>
                <td className="no-data" colSpan={7}>
                  {termoPesquisa
                    ? "Nenhum funcionario encontrado com esse nome"
                    : "Nenhum funcionario cadastrado"}
                </td>
              </tr>
            ) : (
              funcionariosFiltrados.map((funcionario: Funcionario) => (
                <tr key={funcionario.id}>
                  <td>{funcionario.id}</td>
                  <td>{funcionario.nome}</td>
                  <td>{funcionario.cpf}</td>
                  <td>
                    {funcionario.dataNascimento
                      ? formatDateToISO(funcionario.dataNascimento)
                      : "Data não informada"}
                  </td>
                  <td>{funcionario.email}</td>
                  <td>{funcionario.papel}</td>

                  <td className="action-buttons">
                    <Link to={`/listar/funcionario/editar/${funcionario.cpf}`}>
                      <button className="edit-btn">Editar</button>
                    </Link>
                    <button
                      onClick={() => {
                        if (funcionario.id) {
                          DeleteFuncionario(funcionario.id)
                            .then(() => {
                              setFuncionarios((prev) =>
                                prev.filter((f) => f.id !== funcionario.id),
                              );
                            })
                            .catch(() => {
                              alert("Erro ao deletar funcionário.");
                            });
                        } else {
                          alert("ID do funcionário não encontrado.");
                        }
                      }}
                      className="delete-btn">
                      Deletar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {estaEditando && (
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

export default ListarFuncionarios;
