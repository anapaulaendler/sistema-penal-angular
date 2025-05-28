import { useState } from "react";
import api from "../../api";

type TipoAtividade = "dias-de-trabalho" | "estudos" | "livros";

type Atividade = {
  id: number;
  prisioneiroId: string;
  data: string;
  descricao?: string;
  isbn?: string;
  materia?: string;
};

function ListarAtividades() {
  const [tipoAtividade, setTipoAtividade] = useState<TipoAtividade>("dias-de-trabalho");
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.get(`${tipoAtividade}`);
      console.log("Atividades recebidas:", res.data);

      if (res.status === 200) {
        setAtividades(res.data);
        setErro("");
      } else {
        setErro("Erro ao encontrar atividades.");
        setAtividades([]);
      }
    } catch (err) {
      console.error("Erro ao conectar com o servidor:", err);
      alert("Erro ao conectar com o servidor.");
      setAtividades([]);
    }
  };

  const renderDetalhesAtividade = (atividade: Atividade) => {
    if (atividade.descricao) {
      return <>{atividade.descricao}</>;
    } else if (atividade.isbn) {
      return <>{atividade.isbn}</>;
    } else if (atividade.materia) {
      return <>{atividade.materia}</>;
    } else {
      return <em>Sem detalhes disponíveis.</em>;
    }
  };

  return (
    <div className="main-content">
      <div id="form">
        <h1>Listar Atividades</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Nome da Atividade:
            <select
              value={tipoAtividade}
              onChange={(e) => setTipoAtividade(e.target.value as TipoAtividade)}
              required
            >
              <option value="estudos">Estudo</option>
              <option value="livros">Livro</option>
              <option value="dias-de-trabalho">Dia de Trabalho</option>
            </select>
          </label>
          <button type="submit">Buscar Atividades</button>
        </form>

        {erro && <p className="erro">{erro}</p>}

        <div className="lista-atividades">
          {atividades.length === 0 && !erro && <p>Nenhuma atividade encontrada.</p>}

          <table>
            <thead>
              <tr>
                <th>ID do Prisioneiro</th>
                <th>Data</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {atividades.map((atividade) => (
                <tr key={atividade.id}>
                  <td>{atividade.prisioneiroId}</td>
                  <td>{new Date(atividade.data).toLocaleDateString()}</td>
                  <td>{renderDetalhesAtividade(atividade)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListarAtividades;