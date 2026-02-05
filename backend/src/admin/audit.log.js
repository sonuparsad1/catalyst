import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");
const logFile = path.join(logDir, "admin-actions.log");

const ensureLogDir = () => {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
};

const logAdminAction = async ({ actor, action, target, meta = {} }) => {
  ensureLogDir();
  const entry = {
    timestamp: new Date().toISOString(),
    actor,
    action,
    target,
    meta,
  };
  await fs.promises.appendFile(logFile, `${JSON.stringify(entry)}\n`);
};

export default logAdminAction;
