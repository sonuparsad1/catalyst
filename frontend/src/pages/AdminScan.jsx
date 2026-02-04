import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../auth/AuthContext.jsx";
import { scanTicket } from "../api/scan.js";

const recentScans = [
  { id: "TCK-8842", name: "Jordan Lee", status: "Approved", time: "19:41" },
  { id: "TCK-9911", name: "Casey Patel", status: "Approved", time: "19:43" },
  { id: "TCK-2204", name: "Morgan Park", status: "Manual", time: "19:44" },
];

const scanTips = [
  "Center the QR inside the frame for faster focus.",
  "Use the manual override for damaged badges.",
  "Wi-Fi drops? Stay on this screen to retry automatically.",
];

const AdminScan = () => {
  const { token } = useContext(AuthContext);
  const videoRef = useRef(null);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [manualCode, setManualCode] = useState("");
  const [streamError, setStreamError] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    let stream;
    let detector;
    let animationFrame;

    const setupCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        if ("BarcodeDetector" in window) {
          detector = new BarcodeDetector({ formats: ["qr_code"] });
          setScanning(true);
          const scanLoop = async () => {
            if (!videoRef.current || !detector) {
              return;
            }
            try {
              const barcodes = await detector.detect(videoRef.current);
              if (barcodes.length > 0) {
                const value = barcodes[0].rawValue;
                if (value) {
                  await handleScan(value);
                }
              }
            } catch (error) {
              setStreamError("Unable to scan QR codes.");
            }
            animationFrame = requestAnimationFrame(scanLoop);
          };
          animationFrame = requestAnimationFrame(scanLoop);
        } else {
          setStreamError("Barcode scanning not supported on this device.");
        }
      } catch (error) {
        setStreamError("Camera access denied or unavailable.");
      }
    };

    setupCamera();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleScan = async (qrData) => {
    if (!qrData || status.type === "loading") {
      return;
    }
    setStatus({ type: "loading", message: "Validating ticket..." });
    try {
      await scanTicket(qrData, token);
      setStatus({ type: "success", message: "Entry granted." });
    } catch (error) {
      setStatus({ type: "error", message: error?.message || "Scan failed." });
    }
  };

  const handleManualSubmit = async (event) => {
    event.preventDefault();
    await handleScan(manualCode);
    setManualCode("");
  };

  return (
    <section className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 border-b border-slate-800 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Scan Mode
            </p>
            <h1 className="text-3xl font-semibold md:text-4xl">
              QR Entry Scanner
            </h1>
            <p className="text-sm text-slate-300">
              Validate every guest quickly with a full-screen scanning workflow.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-slate-300">
            <span className="rounded-full border border-slate-700 px-4 py-2">
              Live status: {scanning ? "Scanning" : "Ready"}
            </span>
            <span className="rounded-full border border-emerald-400/60 bg-emerald-500/10 px-4 py-2 text-emerald-200">
              124 checked in
            </span>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
                <video
                  ref={videoRef}
                  className="h-[420px] w-full object-cover"
                  muted
                  playsInline
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-40 w-40 rounded-2xl border border-emerald-300/70 shadow-[0_0_60px_rgba(16,185,129,0.35)]" />
                </div>
                {scanning ? null : (
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
                    Camera ready.
                  </div>
                )}
              </div>
              {streamError ? (
                <p className="mt-3 text-sm text-red-400">{streamError}</p>
              ) : null}
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-slate-300">Manual override</p>
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Backup flow
                </span>
              </div>
              <form
                className="mt-4 flex flex-col gap-3 sm:flex-row"
                onSubmit={handleManualSubmit}
              >
                <input
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-white"
                  placeholder="Paste QR payload"
                  value={manualCode}
                  onChange={(event) => setManualCode(event.target.value)}
                />
                <button
                  type="submit"
                  className="rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-200"
                >
                  Validate
                </button>
              </form>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-lg font-semibold">Scan tips</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {scanTips.map((tip) => (
                  <li key={tip} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent scans</h2>
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Live feed
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {recentScans.map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-semibold text-white">{scan.name}</p>
                      <p className="text-xs text-slate-400">
                        {scan.id} · {scan.time}
                      </p>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        scan.status === "Approved"
                          ? "border-emerald-400 text-emerald-200"
                          : "border-slate-600 text-slate-300"
                      }`}
                    >
                      {scan.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {status.message ? (
              <div
                className={`rounded-3xl border px-6 py-4 text-sm ${
                  status.type === "success"
                    ? "border-emerald-400 bg-emerald-500/10 text-emerald-200"
                    : status.type === "error"
                      ? "border-red-400 bg-red-500/10 text-red-200"
                      : "border-slate-700 bg-slate-900/70 text-slate-200"
                }`}
              >
                {status.message}
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AdminScan;
