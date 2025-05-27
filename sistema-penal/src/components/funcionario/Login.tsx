import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5034/auth/login", {
        Email: username,
        Senha: password,
      });

      console.log(res.data);
      const token = res.data.token;
      localStorage.setItem("token", token);
      setRedirect(true);
    } catch {
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="form-content">
        <div className="form-group">
          <label htmlFor="username">
            Usuário:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Senha:
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="form-submit-button" type="submit">
          Entrar
        </button>
        {error && <p className="resposta-erro">{error}</p>}
        {redirect && <Navigate to="/listar/funcionario" />}
      </form>
    </div>
  );
}
export default Login;
