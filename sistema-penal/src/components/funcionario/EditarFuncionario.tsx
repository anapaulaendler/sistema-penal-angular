import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { Funcionario } from "../../models/Funcionario";
import { Role } from "../../models/enum/Role";
import {
  GetFuncionarioByCpf,
  UpdateFuncionarioAsync,
} from "./RequisicoesFuncionario";

const EditarFuncionario = () => {
  const { cpf } = useParams();

  const navigate = useNavigate();

  const [funcionario, setFuncionario] = useState<Funcionario>();

  const [nome, setNome] = useState<string>("");
  const [papel, setPapel] = useState<Role>("General");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  function enviarFuncionario(e: React.FormEvent) {
    e.preventDefault();
    salvarEdicao();
  }

  const carregarFuncionario = async () => {
    try {
      const resposta = await GetFuncionarioByCpf(cpf!);
      const dados: Funcionario = resposta;

      if (!dados) {
        alert("Funcionario não encontrado");
        return;
      }
      setPapel(dados.papel);
      setFuncionario(dados);
      setNome(dados.nome);
      setEmail(dados.email);
      setSenha(dados.senha);

      // Converte papel para string "Admin" ou "General" baseado no enum
      const papelComoString = dados.papel === Role.Admin ? "Admin" : "General";
      setPapel(papelComoString as Role);
    } catch (erro: any) {
      console.error("Erro ao carregar funcionarios:", erro);
      alert("Erro ao carregar funcionarios");
    }
  };

  useEffect(() => {
    carregarFuncionario();
  }, []);

  const salvarEdicao = async () => {
    if (cpf === null || funcionario === undefined) return;

    try {
      const funcionarioEditado: Funcionario = {
        id: funcionario.id,
        nome,
        cpf: funcionario.cpf,
        dataNascimento: funcionario.dataNascimento as Date,
        email,
        senha,
        papel,
      };

      UpdateFuncionarioAsync(funcionarioEditado).catch((erro) => {
        console.error("Erro ao atualizar funcionario:", erro);
        return alert(
          erro instanceof Error
            ? erro.message
            : "Erro desconhecido ao atualizar",
        );
      });

      alert("Funcionario atualizado com sucesso!");
      navigate("/listar/funcionario");
      window.location.reload();
    } catch (erro) {
      console.error("Erro ao editar funcionario:", erro);
      alert(
        erro instanceof Error ? erro.message : "Erro desconhecido ao atualizar",
      );
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Editar Funcionário</h2>
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
        <button type="submit" className="save-btn">
          Salvar
        </button>
        <Link to={"/listar/funcionario"} className="cancel-btn">
          Cancelar
        </Link>
      </form>
    </div>
  );
};

export default EditarFuncionario;
