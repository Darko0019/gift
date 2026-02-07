import { useState } from "react";
import SceneManager from "./core/SceneManager";

export default function App(): React.ReactNode {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const CORRECT_PASSWORD = "zahira2025"; // 🔥 Change this to your secret password

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-2xl max-w-md w-full">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Private Access
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
                Enter Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Password"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-white/90 transition-colors duration-200"
            >
              Enter
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="w-screen h-screen overflow-hidden bg-black">
      <SceneManager />
    </main>
  );
}