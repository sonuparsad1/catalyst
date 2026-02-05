import { useEffect, useRef, useState } from "react";
import Seo from "../../components/Seo.jsx";

const attendanceList = [
  { name: "Alina Parks", status: "Checked in", time: "19:02" },
  { name: "Marcus Hale", status: "Checked in", time: "19:08" },
  { name: "Priya Shah", status: "Pending", time: "--" },
];

const AdminAttendance = () => {
  const videoRef = useRef(null);
  const [scannerState, setScannerState] = useState("idle");
  const [lastScan, setLastScan] = useState(null);
  const [manualCode, setManualCode] = useState("");

  useEffect(() => {
    let stream;
    let detector;
    let animationId;

    const startScanner = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setScannerState("unsupported");
        return;
      }
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
        }
        setScannerState("active");
      } catch (error) {
        setScannerState("blocked");
      }
    };

    const scanFrame = async () => {
      if (detector && videoRef.current && scannerState === "active") {
        try {
          const barcodes = await detector.detect(videoRef.current);
          if (barcodes.length > 0) {
            setLastScan(barcodes[0].rawValue);
          }
        } catch (error) {
          setScannerState("active");
        }
      }
      animationId = requestAnimationFrame(scanFrame);
    };

    if (scannerState === "idle") {
      startScanner();
    }

    animationId = requestAnimationFrame(scanFrame);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [scannerState]);

  const handleManualSubmit = (event) => {
    event.preventDefault();
    if (manualCode.trim()) {
      setLastScan(manualCode.trim());
      setManualCode("");
    }
  };

  return (
    <section className="space-y-6">
      <Seo
        title="Admin Attendance"
        description="Scan tickets and track attendance in real time."
      />
      <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Attendance
          </p>
          <h2 className="text-3xl font-semibold text-textPrimary">
            Mobile QR scanner
          </h2>
          <p className="mt-2 text-sm text-textSecondary">
            Verify tickets instantly with a mobile-first scanner flow.
          </p>
        </div>
        <button
          type="button"
          disabled
          title="Exports are generated from the reporting service."
          className="rounded-full border border-primary/50 px-4 py-2 text-xs font-semibold text-primary/70 opacity-70"
        >
          Export attendance
        </button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-border bg-surface/70 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-textPrimary">
              Live scanner
            </h3>
            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              {scannerState}
            </span>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-background/60">
            <video
              ref={videoRef}
              className="h-64 w-full object-cover"
              muted
              playsInline
            />
          </div>
          <div className="mt-4 rounded-2xl border border-border bg-background/60 p-4 text-sm text-textSecondary">
            {lastScan
              ? `Last scan: ${lastScan}`
              : "Awaiting QR code scan..."}
          </div>
          <form
            className="mt-4 flex flex-col gap-3 sm:flex-row"
            onSubmit={handleManualSubmit}
          >
            <input
              type="text"
              value={manualCode}
              onChange={(event) => setManualCode(event.target.value)}
              placeholder="Enter ticket code"
              className="w-full rounded-full border border-border bg-background/80 px-4 py-2 text-sm text-textPrimary outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-semibold text-background shadow-accent-glow"
            >
              Verify
            </button>
          </form>
        </div>
        <div className="rounded-2xl border border-border bg-surface/70 p-4">
          <h3 className="text-lg font-semibold text-textPrimary">
            Attendance queue
          </h3>
          <p className="mt-2 text-sm text-textSecondary">
            Real-time confirmations for tonight’s event.
          </p>
          <div className="mt-4 grid gap-3">
            {attendanceList.map((guest) => (
              <div
                key={guest.name}
                className="flex items-center justify-between rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-textPrimary">{guest.name}</p>
                  <p className="text-xs text-textSecondary">{guest.time}</p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    guest.status === "Checked in"
                      ? "border-primary text-primary"
                      : "border-border text-textSecondary"
                  }`}
                >
                  {guest.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminAttendance;
