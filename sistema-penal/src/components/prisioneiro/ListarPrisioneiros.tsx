import { useEffect, useState } from "react";
import { GetPrisioneirosAsync } from "./RequisicoesPrisioneiro";
import { Prisioneiro } from "../../models/Prisioneiro";

const ListarPrisioneiros = () => {
  const [prisioneiros, setPrisioneiros] = useState<Prisioneiro[]>([]);

  useEffect(() => {
    const fetchPrisioneiros = async () => {
      const resposta = await GetPrisioneirosAsync();
      setPrisioneiros(resposta);
    };
    fetchPrisioneiros();
  }, []);

  return (
    <div>
      <h1>Lista de Prisioneiros</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>CPF</th>
            <th>Descrição da Sentença</th>
            <th>Dia de Chegada</th>
            <th>Dia de Saída Original</th>
            <th>Dia de Saída Atualizado</th>
            <th>Contador de Livros</th>
            <th>Ano Atual</th>
          </tr>
        </thead>
        <tbody>
          {prisioneiros.map((prisioneiro) => (
            <tr key={prisioneiro.id}>
              <td>{prisioneiro.id}</td>
              <td>{prisioneiro.nome}</td>
              <td>
                {new Date(prisioneiro.dataNascimento).toLocaleDateString()}
              </td>
              <td>{prisioneiro.cpf}</td>
              <td>{prisioneiro.descricaoSentenca}</td>
              <td>{new Date(prisioneiro.diaDeChegada).toLocaleDateString()}</td>
              <td>
                {new Date(prisioneiro.diaDeSaidaOriginal).toLocaleDateString()}
              </td>
              <td>
                {new Date(
                  prisioneiro.diaDeSaidaAtualizado,
                ).toLocaleDateString()}
              </td>
              <td>{prisioneiro.contadorDeLivros}</td>
              <td>{prisioneiro.anoAtual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarPrisioneiros;
