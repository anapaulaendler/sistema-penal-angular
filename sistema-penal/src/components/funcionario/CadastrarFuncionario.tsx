import { useState } from "react";
import { Role } from "../../models/enum/Role";
import { formatDateToISO } from "../../util/FormatarData";
import { CreateFuncionario } from "./RequisicoesFuncionario";
import { Funcionario } from "../../models/Funcionario";

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

function CadastrarFuncionario() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date>();
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [papel, setPapel] = useState<Role>("General");

  function enviarFuncionario(e: React.FormEvent) {
    e.preventDefault();

    if (!dataNascimento) {
      alert("Por favor, preencha a data de nascimento.");
      return;
    }

    const cpfLimpo = cpf.replace(/\D/g, "");
    if (!validarCPF(cpfLimpo)) {
      alert("CPF inválido.");
      return;
    }

    const funcionario = new Funcionario(
      nome,
      dataNascimento,
      cpfLimpo,
      email,
      papel,
      senha,
    );

    CreateFuncionario(funcionario)
      .then(() => {
        alert("Funcionário cadastrado com sucesso.");
        setNome("");
        setDataNascimento(undefined);
        setCpf("");
        setEmail("");
        setSenha("");
        setPapel("General");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar funcionário:", error);
        alert("Erro ao cadastrar funcionário. Tente novamente.");
      });
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Cadastro de Funcionário</h2>
      </div>
      <form className="form-content" onSubmit={enviarFuncionario}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            placeholder="José Inácio da Silva"
            type="text"
            id="nome"
            name="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            required
            value={dataNascimento ? formatDateToISO(dataNascimento) ?? "" : ""}
            onChange={(e) => setDataNascimento(new Date(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            required
            placeholder="000.000.000-00"
            inputMode="numeric"
            maxLength={14}
            value={formatarCPF(cpf)}
            onChange={(e) => {
              const apenasNumeros = e.target.value.replace(/\D/g, "");
              setCpf(apenasNumeros);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cargo">Cargo: </label>
          <select
            id="cargo"
            value={papel}
            onChange={(e) => setPapel(e.target.value as Role)}>
            {Object.entries(Role).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="form-submit-button">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastrarFuncionario;
