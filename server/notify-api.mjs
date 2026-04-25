/**
 * Logique partagée : enregistrement e-mails / téléphones dans data/*.json
 * (utilisé par le serveur HTTP en prod et par le middleware Vite en dev)
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
export const DATA_DIR = path.join(ROOT, "data");
const EMAILS_FILE = path.join(DATA_DIR, "emails.json");
const PHONES_FILE = path.join(DATA_DIR, "phones.json");

export async function ensureDataFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  for (const f of [EMAILS_FILE, PHONES_FILE]) {
    try {
      await fs.access(f);
    } catch {
      await fs.writeFile(f, "[]\n", "utf8");
    }
  }
}

async function readJsonList(file) {
  const raw = await fs.readFile(file, "utf8");
  const p = JSON.parse(raw);
  return Array.isArray(p) ? p : [];
}

async function writeJsonList(file, list) {
  await fs.writeFile(file, `${JSON.stringify(list, null, 2)}\n`, "utf8");
}

/**
 * @param {unknown} data
 * @returns {Promise<
 *   | { ok: true }
 *   | { ok: false; status: number; error: string }
 * >}
 */
export async function processNotifyPayload(data) {
  if (data == null || typeof data !== "object") {
    return { ok: false, status: 400, error: "invalid_json" };
  }
  const email =
    typeof data.email === "string" ? data.email.trim() : "";
  const phone =
    typeof data.phone === "string"
      ? data.phone.replace(/\s/g, "").trim()
      : "";

  if (!email && !phone) {
    return { ok: false, status: 400, error: "empty" };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, status: 400, error: "invalid_email" };
  }
  if (phone && phone.length < 8) {
    return { ok: false, status: 400, error: "invalid_phone" };
  }

  await ensureDataFiles();

  if (email) {
    const list = await readJsonList(EMAILS_FILE);
    if (list.some((e) => e.email && e.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, status: 409, error: "duplicate_email" };
    }
  }
  if (phone) {
    const list = await readJsonList(PHONES_FILE);
    if (list.some((e) => e.phone === phone)) {
      return { ok: false, status: 409, error: "duplicate_phone" };
    }
  }

  const at = new Date().toISOString();

  if (email) {
    const list = await readJsonList(EMAILS_FILE);
    list.push({ email, at });
    await writeJsonList(EMAILS_FILE, list);
  }
  if (phone) {
    const list = await readJsonList(PHONES_FILE);
    list.push({ phone, at });
    await writeJsonList(PHONES_FILE, list);
  }

  return { ok: true };
}
