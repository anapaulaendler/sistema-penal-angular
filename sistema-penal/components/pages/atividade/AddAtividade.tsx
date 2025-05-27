import { useState } from "react";
import axios from "axios";

type TipoAtividade = "dias-de-trabalho" | "estudos" | "livros";

function AddAtividade() {
  const [prisioneiroId, setPrisioneiroId] = useState<string>("");
  const [tipoAtividade, setTipoAtividade] = useState<TipoAtividade>("dias-de-trabalho");
  const [descricao, setDescricao] = useState<string>(""); // ana: pra dia de trabalho
  const [isbn, setIsbn] = useState<string>(""); // ana: pra livro
  const [materia, setMateria] = useState<string>(""); // ana: pra estudo
  const [resposta, setResposta] = useState("");
  const [respostaClasse, setRespostaClasse] = useState("");

  const handleCpfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cpf = e.target.value;

    try {
      const res = await axios.get(`http://localhost:5034/prisioneiros/cpf/${cpf}`);
      const prisioneiro = res.data;

      if (!prisioneiro || !prisioneiro.prisioneiroId) {
        setResposta("Prisioneiro não encontrado");
        setRespostaClasse("resposta-erro");
        return;
      }

      setPrisioneiroId(prisioneiro.prisioneiroId);
      setResposta("Prisioneiro encontrado");
      setRespostaClasse("resposta-sucesso");
    } catch {
      setResposta("Prisioneiro não encontrado");
      setRespostaClasse("resposta-erro");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const baseUrl = `http://localhost:5034/${tipoAtividade}`;

    const atividadeBase = {
      prisioneiroId,
      data: new Date().toISOString()
    };

    // ana: adiciona coisinhas especificas baseado no tipo de atividade
    let payload: any = atividadeBase;

    if (tipoAtividade === "dias-de-trabalho") {
      payload = { ...atividadeBase, descricao };
    }
    else if (tipoAtividade === "estudos") {
      payload = { ...atividadeBase, materia };
    } 
    else if ( tipoAtividade === "livros") {
      payload = { ...atividadeBase, isbn };
    }

    try {
      const res = await axios.post(baseUrl, payload);

      if (res.status === 200) {
        alert("Atividade adicionada com sucesso!");
      } else {
        alert("Impossível adicionar atividade.");
      }
    } catch {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="main-content">
      <div id="form">
        <h1>Cadastrar Atividade a Prisioneiro</h1>
        <form onSubmit={handleSubmit}>
          <label>
            CPF do Prisioneiro (apenas números):
            <input type="text" onChange={handleCpfChange} required />
            <div className={respostaClasse}>{resposta}</div>
          </label>

          {/* ana: aqui as partes específicas! :> */}
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

          {tipoAtividade === "dias-de-trabalho" && (
            <label>
              Descrição do Trabalho:
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </label>
          )}

          {tipoAtividade === "livros" && (
            <label>
              ISBN 11 do livro:
              <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
            </label>
          )}

          {tipoAtividade === "estudos" && (
            <label>
              Matéria estudada:
              <input
                type="text"
                value={materia}
                onChange={(e) => setMateria(e.target.value)}
              />
            </label>
          )}

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default AddAtividade;