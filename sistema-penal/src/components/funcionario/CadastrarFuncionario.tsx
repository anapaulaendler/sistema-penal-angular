import { useState } from "react";
import { Role } from "../../models/enum/Role";
import { formatDateToISO } from "../../util/FormatarData";
import { CreateFuncionario } from "./RequisicoesFuncionario";
import { Funcionario } from "../../models/Funcionario";

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

    const funcionario = new Funcionario(
      nome,
      dataNascimento,
      cpf,
      email,
      papel,
      senha,
    );

    CreateFuncionario(funcionario)
      .then(() => {
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
            placeholder="000.000.000-00"
            type="text"
            id="cpf"
            name="cpf"
            required
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
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
