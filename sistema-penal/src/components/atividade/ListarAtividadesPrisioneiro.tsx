import { useState } from "react";
import axios from "axios";
import api from "../../api";

type TipoAtividade = "dias-de-trabalho" | "estudos" | "livros";

function ListarAtividadesPrisioneiro() {
  const [tipoAtividade, setTipoAtividade] = useState<TipoAtividade>();
  const [atividades, setAtividades] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [mensagemClasse, setMensagemClasse] = useState("");
  const [prisioneiroId, setPrisioneiroId] = useState<string>("");

  const handleCpfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cpf = e.target.value;
    resetMensagem();

    try {
      const res = await axios.get(`http://localhost:5034/prisioneiros/cpf/${cpf}`);
      const prisioneiro = res.data;

      if (!prisioneiro?.prisioneiroId) {
        mostrarMensagem("Prisioneiro não encontrado", "erro");
        setPrisioneiroId("");
        return;
      }

      setPrisioneiroId(prisioneiro.prisioneiroId);
      mostrarMensagem("Prisioneiro encontrado", "sucesso");
    } catch {
      mostrarMensagem("Erro ao buscar prisioneiro", "erro");
      setPrisioneiroId("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMensagem();

    if (!prisioneiroId) {
      mostrarMensagem("Informe um CPF válido primeiro", "erro");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5034/${tipoAtividade}/${prisioneiroId}`);

      if (res.status === 200) {
        const dados = res.data;
        setAtividades(dados);

        if (dados.length === 0) {
          mostrarMensagem("Nenhuma atividade encontrada", "info");
        } else {
          mostrarMensagem("Atividades carregadas com sucesso", "sucesso");
        }
      } else {
        mostrarMensagem("Erro ao buscar atividades", "erro");
        setAtividades([]);
      }
    } catch {
      mostrarMensagem("Erro ao conectar com o servidor", "erro");
      setAtividades([]);
    }
  };

  const mostrarMensagem = (msg: string, tipo: "sucesso" | "erro" | "info") => {
    setMensagem(msg);
    setMensagemClasse(`resposta-${tipo}`);
  };

  const resetMensagem = () => {
    setMensagem("");
    setMensagemClasse("");
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
            CPF do Prisioneiro (apenas números):
            <input type="text" onChange={handleCpfChange} required />
          </label>

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

        {mensagem && <div className={mensagemClasse}>{mensagem}</div>}

        <div className="lista-atividades">
          {atividades.length > 0 && (
            <ul>
              {atividades.map((atividade, index) => (
                <li key={index}>
                  <strong>ID do Prisioneiro:</strong> {atividade.prisioneiroId} <br />
                  <strong>Data:</strong> {new Date(atividade.data).toLocaleDateString()} <br />
                  {renderDetalhesAtividade(atividade)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListarAtividadesPrisioneiro;