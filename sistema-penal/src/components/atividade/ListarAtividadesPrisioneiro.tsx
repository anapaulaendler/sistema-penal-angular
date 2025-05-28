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

function ListarAtividadesPrisioneiro() {
  const [tipoAtividade, setTipoAtividade] = useState<TipoAtividade>();
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [mensagemClasse, setMensagemClasse] = useState("");
  const [prisioneiroId, setPrisioneiroId] = useState<string>("");
  const [resposta, setResposta] = useState("");
  const [respostaClasse, setRespostaClasse] = useState("");
  const [cpf, setCpf] = useState<string>("");

  const handleBuscarCpf = async () => {
    if (cpf.length !== 11) {
      setResposta("Por favor, insira um CPF com 11 dígitos.");
      setRespostaClasse("resposta-erro");
      return;
    }

    try {
      const res = await api.get(`/prisioneiros/cpf/${cpf}`);
      const prisioneiro = res.data;

      if (!prisioneiro || !prisioneiro.id) {
        setResposta("Prisioneiro não encontrado");
        setRespostaClasse("resposta-erro");
        return;
      }

      setPrisioneiroId(prisioneiro.id);
      setResposta("Prisioneiro encontrado");
      setRespostaClasse("resposta-sucesso");
    } catch (err) {
      setResposta("Erro ao conectar com o servidor.");
      setRespostaClasse("resposta-erro");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMensagem();

    if (!prisioneiroId) {
      mostrarMensagem("Informe um CPF válido primeiro", "erro");
      return;
    }
    if (!tipoAtividade) {
      mostrarMensagem("Selecione o tipo de atividade", "erro");
      return;
    }

    try {
      const res = await api.get(`${tipoAtividade}/${prisioneiroId}`);

      if (res.status === 200) {
        const dados: Atividade[] = res.data;
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
            CPF do Prisioneiro (apenas números):
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </label>
          <button type="button" onClick={handleBuscarCpf}>
            Buscar Prisioneiro
          </button>

          <label>
            Nome da Atividade:
            <select
              value={tipoAtividade}
              onChange={(e) => setTipoAtividade(e.target.value as TipoAtividade)}
              required
            >
              <option value="">-- Selecione --</option>
              <option value="estudos">Estudo</option>
              <option value="livros">Livro</option>
              <option value="dias-de-trabalho">Dia de Trabalho</option>
            </select>
          </label>

          <button type="submit">Buscar Atividades</button>
        </form>

        {mensagem && <div className={mensagemClasse}>{mensagem}</div>}

        <div className="lista-atividades">
          {atividades.length === 0 && !mensagem.includes("sucesso") && (
            <p>Nenhuma atividade encontrada.</p>
          )}

          {atividades.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {atividades.map((atividade) => (
                  <tr key={atividade.id}>
                    <td>{new Date(atividade.data).toLocaleDateString()}</td>
                    <td>{renderDetalhesAtividade(atividade)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListarAtividadesPrisioneiro;