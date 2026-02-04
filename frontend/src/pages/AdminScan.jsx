import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { scanTicket } from "../api/scan.js";

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
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Scan Mode</p>
          <h1 className="text-3xl font-semibold">QR Entry Scanner</h1>
          <p className="text-sm text-slate-300">
            Hold the camera over a ticket QR code to validate entry.
          </p>
        </header>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
            <video
              ref={videoRef}
              className="h-72 w-full object-cover"
              muted
              playsInline
            />
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

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-sm text-slate-300">Manual override</p>
          <form className="mt-3 flex flex-col gap-3 sm:flex-row" onSubmit={handleManualSubmit}>
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

        {status.message ? (
          <div
            className={`rounded-2xl border px-6 py-4 text-sm ${
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
      </div>
    </section>
  );
};

export default AdminScan;
