import emailjs from "@emailjs/browser";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function isEmailJsConfigured() {
  return Boolean(
    serviceId && String(serviceId).trim() && templateId && publicKey,
  );
}

/**
 * @param {{ email: string; phone: string }} param0
 * @returns {Promise<import("@emailjs/browser").EmailJSResponseStatus>}
 */
export function sendAvantPremiereLead({ email, phone }) {
  if (!isEmailJsConfigured()) {
    const err = new Error("EMAILJS_NOT_CONFIGURED");
    Object.assign(err, { code: "EMAILJS_NOT_CONFIGURED" });
    throw err;
  }
  return emailjs.send(
    serviceId,
    templateId,
    {
      user_email: email || "—",
      user_phone: phone || "—",
      source: "avant-premiere",
      site: "smartsaver.ci",
      submitted_at: new Date().toISOString(),
    },
    { publicKey },
  );
}
