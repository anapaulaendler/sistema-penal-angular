import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Prisioneiro } from "../../models/Prisioneiro";
import { Livro } from "../../models/Livro";
import { Estudo } from "../../models/Estudo";
import { DiaDeTrabalho } from "../../models/DiaDeTrabalho";
import {
  GetPrisioneiroByIdAsync,
  UpdatePrisioneiroAsync,
} from "./RequisicoesPrisioneiro";
import { GetLivrosByPrisioneiroIdAsync } from "../atividade/RequisicoesLivro";
import { GetEstudosByPrisioneiroIdAsync } from "../atividade/RequisicoesEstudo";
import { GetDiasDeTrabalhoByPrisioneiroIdAsync } from "../atividade/RequisicoesDiasDeTrabalho";

export default function DetalharPrisioneiro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [prisioneiro, setPrisioneiro] = useState<Prisioneiro | null>(null);
  const [nomeEditando, setNomeEditando] = useState(false);
  const [nome, setNome] = useState("");
  const [livros, setLivros] = useState<Livro[]>([]);
  const [estudos, setEstudos] = useState<Estudo[]>([]);
  const [trabalhos, setTrabalhos] = useState<DiaDeTrabalho[]>([]);

  useEffect(() => {
    if (!id) return;
    carregarPrisioneiro(id);
  }, [id]);

  async function carregarPrisioneiro(prisioneiroId: string) {
    try {
      const dados = await GetPrisioneiroByIdAsync(prisioneiroId);
      setPrisioneiro(dados);
      setNome(dados.nome);

      const [livros, estudos, trabalhos] = await Promise.all([
        GetLivrosByPrisioneiroIdAsync(prisioneiroId),
        GetEstudosByPrisioneiroIdAsync(prisioneiroId),
        GetDiasDeTrabalhoByPrisioneiroIdAsync(prisioneiroId),
      ]);
      setLivros(livros);
      setEstudos(estudos);
      setTrabalhos(trabalhos);
    } catch (error) {
      console.error("Erro ao carregar dados do prisioneiro:", error);
    }
  }

  async function salvarEdicao() {
    if (!prisioneiro) return;
    try {
      await UpdatePrisioneiroAsync({ ...prisioneiro, nome });
      setNomeEditando(false);
      await carregarPrisioneiro(prisioneiro.id!);
    } catch (error) {
      console.error("Erro ao atualizar prisioneiro:", error);
    }
  }

  return (
    <div className="detalhes-container">
      <h2>Detalhes do Prisioneiro</h2>
      {prisioneiro && (
        <>
          <div className="campo">
            <strong>Nome:</strong>{" "}
            {nomeEditando ? (
              <>
                <input
                  className="input-edicao"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <button onClick={salvarEdicao} className="botao">
                  Salvar
                </button>
              </>
            ) : (
              <>
                {prisioneiro.nome}{" "}
                <button onClick={() => setNomeEditando(true)} className="botao">
                  Editar
                </button>
              </>
            )}
          </div>
          <div className="campo">
            <strong>CPF:</strong> {prisioneiro.cpf}
          </div>
          <div className="campo">
            <strong>Data de Nascimento:</strong>{" "}
            {new Date(prisioneiro.dataNascimento).toLocaleDateString()}
          </div>

          <hr />
          <h3>Atividades</h3>

          <section className="atividade">
            <h4>Livros Lidos ({livros.length})</h4>
            <table className="tabela-atividade">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ISBN</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {livros.map((livro, index) => (
                  <tr key={livro.id}>
                    <td>{index + 1}</td>
                    <td>{livro.Isbn}</td>
                    <td>{new Date(livro.data).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="atividade">
            <h4>Estudos ({estudos.length})</h4>
            <table className="tabela-atividade">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Matéria</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {estudos.map((estudo, index) => (
                  <tr key={estudo.id}>
                    <td>{index + 1}</td>
                    <td>{estudo.materia}</td>
                    <td>{new Date(estudo.data).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="atividade">
            <h4>Dias de Trabalho ({trabalhos.length})</h4>
            <table className="tabela-atividade">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Data</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {trabalhos.map((trabalho, index) => (
                  <tr key={trabalho.id}>
                    <td>{index + 1}</td>
                    <td>{new Date(trabalho.data).toLocaleDateString()}</td>
                    <td>{trabalho.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      <br />
      <button onClick={() => navigate(-1)} className="botao-voltar">
        Voltar
      </button>
    </div>
  );
}
