import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext"
import { loginUser } from "../api/Auth";
import { useState } from "react";
import { AuthSwitch } from "../components/AuthSwitch";
import { AuthLayout } from "../components/AuthLayout";


export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    // validar email
    if (!email) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El email no es válido";
    }

    // validar password
    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 5) {
      newErrors.password = "Mínimo 5 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      
      const data = await loginUser(email, password);
      login(data.token);
      navigate("/");
    } catch (err: any) {
      setErrors({ general: "Credenciales incorrectas" });
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-xl w-80 flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-center text-sky-600">
            Iniciar sesión
          </h2>

          {/* ERROR GENERAL */}
          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}

          {/* EMAIL */}
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border rounded-lg p-2 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-400 focus:ring-red-400"
                  : "border-sky-200 focus:ring-sky-400"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">{errors.email}</span>
            )}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border rounded-lg p-2 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-400 focus:ring-red-400"
                  : "border-sky-200 focus:ring-sky-400"
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition-all duration-200 font-semibold"
          >
            Login
          </button>
          <AuthSwitch
            text="¿No tenés cuenta?"
            linkText="Registrate"
            to="/register"
          />
        </form>
      </div>
    </AuthLayout>
  );
};