import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../auth/AuthContext.jsx";
import { scanTicket } from "../../api/scan.js";
import Seo from "../../components/Seo.jsx";

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
    <section className="space-y-6">
      <Seo title="Admin Scan" description="Scan tickets and validate entries." />
      <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Scan Mode
          </p>
          <h2 className="text-3xl font-semibold text-textPrimary">QR Entry Scanner</h2>
          <p className="text-sm text-textSecondary">
            Validate every guest quickly with a live scanning workflow.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-textSecondary">
          <span className="rounded-full border border-border px-4 py-2">
            Live status: {scanning ? "Scanning" : "Ready"}
          </span>
          <span className="rounded-full border border-primary/60 bg-primary/10 px-4 py-2 text-primary">
            124 checked in
          </span>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-surface/70 p-4">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-background/60">
              <video
                ref={videoRef}
                className="h-[360px] w-full object-cover"
                muted
                playsInline
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-36 w-36 rounded-2xl border border-primary/60 shadow-[0_0_60px_rgba(56,189,248,0.25)]" />
              </div>
              {scanning ? null : (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-textSecondary">
                  Camera ready.
                </div>
              )}
            </div>
            {streamError ? (
              <p className="mt-3 text-sm text-red-400">{streamError}</p>
            ) : null}
          </div>

          <div className="rounded-3xl border border-border bg-surface/70 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-textSecondary">Manual override</p>
              <span className="text-xs uppercase tracking-[0.3em] text-muted">
                Backup flow
              </span>
            </div>
            <form
              className="mt-4 flex flex-col gap-3 sm:flex-row"
              onSubmit={handleManualSubmit}
            >
              <input
                className="flex-1 rounded-lg border border-border bg-background/80 px-4 py-2 text-sm text-textPrimary"
                placeholder="Paste QR payload"
                value={manualCode}
                onChange={(event) => setManualCode(event.target.value)}
              />
              <button
                type="submit"
                className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary"
              >
                Validate
              </button>
            </form>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-border bg-surface/70 p-6">
            <h3 className="text-lg font-semibold text-textPrimary">Scan tips</h3>
            <ul className="mt-4 space-y-3 text-sm text-textSecondary">
              {scanTips.map((tip) => (
                <li key={tip} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-surface/70 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-textPrimary">Recent scans</h3>
              <span className="text-xs uppercase tracking-[0.3em] text-muted">
                Live feed
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {recentScans.map((scan) => (
                <div
                  key={scan.id}
                  className="flex items-center justify-between rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-semibold text-textPrimary">{scan.name}</p>
                    <p className="text-xs text-textSecondary">
                      {scan.id} · {scan.time}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      scan.status === "Approved"
                        ? "border-primary text-primary"
                        : "border-border text-textSecondary"
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
                  ? "border-primary bg-primary/10 text-primary"
                  : status.type === "error"
                    ? "border-red-400 bg-red-500/10 text-red-200"
                    : "border-border bg-background/60 text-textSecondary"
              }`}
            >
              {status.message}
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
};

export default AdminScan;
