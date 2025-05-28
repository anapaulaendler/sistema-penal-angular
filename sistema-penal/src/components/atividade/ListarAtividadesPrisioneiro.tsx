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
  const [cpf, setCpf] = useState<string>("");

  const mostrarMensagem = (msg: string, tipo: "sucesso" | "erro" | "info") => {
    setMensagem(msg);
    setMensagemClasse(`resposta-${tipo}`);
  };

  const resetMensagem = () => {
    setMensagem("");
    setMensagemClasse("");
  };

  const handleBuscarCpf = async () => {
    resetMensagem();

    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
      return mostrarMensagem("Insira um CPF válido com 11 dígitos numéricos.", "erro");
    }

    try {
      const res = await api.get(`/prisioneiros/cpf/${cpf}`);
      const prisioneiro = res.data;

      if (!prisioneiro || !prisioneiro.id) {
        return mostrarMensagem("Prisioneiro não encontrado.", "erro");
      }

      setPrisioneiroId(prisioneiro.id);
      mostrarMensagem("Prisioneiro encontrado com sucesso.", "sucesso");
    } catch {
      mostrarMensagem("Erro ao buscar prisioneiro.", "erro");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMensagem();

    if (!prisioneiroId) return mostrarMensagem("Busque um prisioneiro antes.", "erro");
    if (!tipoAtividade) return mostrarMensagem("Selecione o tipo de atividade.", "erro");

    try {
      const res = await api.get(`${tipoAtividade}/${prisioneiroId}`);
      const dados: Atividade[] = res.data;
      setAtividades(dados);

      if (dados.length === 0) {
        mostrarMensagem("Nenhuma atividade encontrada.", "info");
      } else {
        mostrarMensagem("Atividades carregadas com sucesso.", "sucesso");
      }
    } catch {
      mostrarMensagem("Erro ao buscar atividades.", "erro");
      setAtividades([]);
    }
  };

  const renderDetalhesAtividade = (atividade: Atividade) => {
    if (atividade.descricao) return atividade.descricao;
    if (atividade.isbn) return `ISBN: ${atividade.isbn}`;
    if (atividade.materia) return `Matéria: ${atividade.materia}`;
    return <em>Sem detalhes</em>;
  };

  return (
    <div className="main-content">
      <div id="form">
        <h1>Consultar Atividades de Prisioneiro</h1>

        <form onSubmit={handleSubmit} className="formulario">
          <div className="form-group">
            <label>CPF do Prisioneiro:</label>
            <input
              type="text"
              value={cpf}
              maxLength={11}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Somente números"
              required
            />
            <button type="button" onClick={handleBuscarCpf}>Buscar</button>
          </div>

          <div className="form-group">
            <label>Tipo de Atividade:</label>
            <select
              value={tipoAtividade}
              onChange={(e) => setTipoAtividade(e.target.value as TipoAtividade)}
              required
            >
              <option value="">-- Selecione --</option>
              <option value="estudos">Estudos</option>
              <option value="livros">Livros</option>
              <option value="dias-de-trabalho">Dias de Trabalho</option>
            </select>
          </div>

          <button type="submit">Buscar Atividades</button>
        </form>

        {mensagem && <div className={`mensagem ${mensagemClasse}`}>{mensagem}</div>}

        {atividades.length > 0 && (
          <table className="tabela-atividades">
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
  );
}

export default ListarAtividadesPrisioneiro;
