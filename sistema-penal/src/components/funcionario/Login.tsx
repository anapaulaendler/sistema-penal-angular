import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    } catch {
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="main-content">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Usuário:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Senha:
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Entrar</button>
        {error && <p className="resposta-erro">{error}</p>}
      </form>
    </div>
  );
}

export default Login;