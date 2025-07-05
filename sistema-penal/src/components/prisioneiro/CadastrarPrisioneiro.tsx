import { useState } from "react";
import { Prisioneiro } from "../../models/Prisioneiro";
import { CreatePrisioneiroAsync } from "./RequisicoesPrisioneiro";
import { formatDateToISO } from "../../util/FormatarData";
import { formatarCPF } from "../../util/FormatarCPF";

function CadastrarPrisioneiro() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date>();
  const [cpf, setCpf] = useState("");
  const [diaDeChegada, setDiaDeChegada] = useState<Date>();
  const [diaDeSaidaOriginal, setDiaDeSaidaOriginal] = useState<Date>();
  const [diaDeSaidaAtualizado, setDiaDeSaidaAtualizado] = useState<Date>();

  function handleCpfChange(e: string) {
    const raw = e.replace(/\D/g, "").slice(0, 11);
    const formatted = formatarCPF(raw);
    setCpf(formatted);
  }

  function enviarPrisioneiro(e: React.FormEvent) {
    e.preventDefault();

    if (
      !dataNascimento ||
      !diaDeChegada ||
      !diaDeSaidaOriginal ||
      !diaDeSaidaAtualizado
    ) {
      alert("Preencha todas as datas.");
      return;
    }

    const novoPrisioneiro = new Prisioneiro(
      nome,
      dataNascimento,
      cpf,
      diaDeChegada,
      diaDeSaidaOriginal,
      diaDeSaidaAtualizado,
      0,
      new Date().getFullYear(),
      [],
      [],
      [],
    );

    CreatePrisioneiroAsync(novoPrisioneiro)
      .then(() => {
        alert("Prisioneiro cadastrado com sucesso.");
        setNome("");
        setDataNascimento(undefined);
        setCpf("");
        setDiaDeChegada(undefined);
        setDiaDeSaidaOriginal(undefined);
        setDiaDeSaidaAtualizado(undefined);
      })
      .catch((error) => {
        console.error("Erro ao cadastrar prisioneiro:", error);
        alert("Erro ao cadastrar prisioneiro.");
      });
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Cadastro de Prisioneiro</h2>
      </div>
      <form className="form-content" onSubmit={enviarPrisioneiro}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            required
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome completo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
            type="date"
            id="dataNascimento"
            value={formatDateToISO(dataNascimento) || ""}
            required
            onChange={(e) => setDataNascimento(new Date(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            inputMode="numeric"
            maxLength={14}
            value={cpf}
            required
            onChange={(e) => {
              handleCpfChange(e.target.value);
            }}
            placeholder="000.000.000-00"
          />
        </div>

        <div className="form-group">
          <label htmlFor="diaDeChegada">Dia de Chegada</label>
          <input
            type="date"
            id="diaDeChegada"
            value={formatDateToISO(diaDeChegada) ?? ""}
            required
            onChange={(e) => setDiaDeChegada(new Date(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="diaDeSaidaOriginal">Data de Saída</label>
          <input
            type="date"
            id="diaDeSaidaOriginal"
            value={
              (diaDeSaidaOriginal ? formatDateToISO(diaDeSaidaOriginal) : "") ||
              ""
            }
            required
            onChange={(e) => {
              const novaData = new Date(e.target.value);
              setDiaDeSaidaOriginal(novaData);
              setDiaDeSaidaAtualizado(novaData);
            }}
          />
        </div>

        <button type="submit" className="form-submit-button">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastrarPrisioneiro;
