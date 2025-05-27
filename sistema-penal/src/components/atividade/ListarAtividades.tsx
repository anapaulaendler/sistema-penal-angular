import { useState } from "react";
import axios from "axios";
import api from "../../api";

type TipoAtividade = "dias-de-trabalho" | "estudos" | "livros";

function ListarAtividades() {
  const [tipoAtividade, setTipoAtividade] = useState<TipoAtividade>("dias-de-trabalho");
  const [atividades, setAtividades] = useState<any[]>([]);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const baseUrl = `http://localhost:5034/${tipoAtividade}`;

    try {
      const res = await axios.get(baseUrl);

      if (res.status === 200) {
        setAtividades(res.data);
        setErro("");
      } else {
        setErro("Erro ao encontrar atividades.");
        setAtividades([]);
      }
    } catch {
      alert("Erro ao conectar com o servidor.");
      setAtividades([]);
    }
  };

  const renderDetalhesAtividade = (atividade: any) => {
    switch (tipoAtividade) {
      case "dias-de-trabalho":
        return <><strong>Descrição:</strong> {atividade.descricao}</>;
      case "livros":
        return <><strong>ISBN:</strong> {atividade.isbn}</>;
      case "estudos":
        return <><strong>Matéria:</strong> {atividade.materia}</>;
      default:
        return null;
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
          <ul>
            {atividades.map((atividade, index) => (
              <li key={index}>
                <strong>ID do Prisioneiro:</strong> {atividade.prisioneiroId} <br />
                <strong>Data:</strong> {new Date(atividade.data).toLocaleDateString()} <br />
                {renderDetalhesAtividade(atividade)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ListarAtividades;