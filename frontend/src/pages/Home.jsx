import { useState } from "react";

const Home = () => {
  const [backendStatus, setBackendStatus] = useState("Unknown");
  const [isLoading, setIsLoading] = useState(false);

  const handleBackendCheck = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/health");
      const data = await response.json();
      console.log("Backend response:", data);
      setBackendStatus(data.backend ?? "Unknown");
    } catch (error) {
      console.error("Backend connection failed:", error);
      setBackendStatus("Unavailable");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-start justify-center gap-6 px-6 py-16">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
          Ignite • Innovate • Lead
        </p>
        <h1 className="text-4xl font-semibold text-white sm:text-5xl">
          Catalyst Society
        </h1>
      </div>
      <p className="text-lg text-slate-300">Platform Running</p>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          onClick={handleBackendCheck}
          disabled={isLoading}
        >
          {isLoading ? "Checking..." : "Test Backend Connection"}
        </button>
        <span className="text-sm text-slate-300">
          Backend status: <strong className="text-white">{backendStatus}</strong>
        </span>
      </div>
    </main>
  );
};

export default Home;
