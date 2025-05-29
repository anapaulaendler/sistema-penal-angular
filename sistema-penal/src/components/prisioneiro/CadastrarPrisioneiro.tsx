import { useState } from "react";
import { Prisioneiro } from "../../models/Prisioneiro";
import { CreatePrisioneiroAsync } from "./RequisicoesPrisioneiro";
import { formatDateToISO } from "../../util/FormatarData";

// Função para validar CPF com os dígitos verificadores
function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;

  return resto === parseInt(cpf.charAt(10));
}

// Função para aplicar a máscara no CPF
function formatarCPF(cpf: string): string {
  const somenteNumeros = cpf.replace(/\D/g, "").slice(0, 11);
  return somenteNumeros
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function CadastrarPrisioneiro() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date>();
  const [cpf, setCpf] = useState("");
  const [diaDeChegada, setDiaDeChegada] = useState<Date>();
  const [diaDeSaidaOriginal, setDiaDeSaidaOriginal] = useState<Date>();
  const [diaDeSaidaAtualizado, setDiaDeSaidaAtualizado] = useState<Date>();

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

    const cpfLimpo = cpf.replace(/\D/g, "");
    if (!validarCPF(cpfLimpo)) {
      alert("CPF inválido.");
      return;
    }

    const novoPrisioneiro = new Prisioneiro(
      nome,
      dataNascimento,
      cpfLimpo,
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
            value={formatarCPF(cpf)}
            required
            onChange={(e) => {
              const apenasNumeros = e.target.value.replace(/\D/g, "");
              setCpf(apenasNumeros);
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
