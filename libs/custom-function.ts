import { randomUUID } from "crypto";

export function generateEmail(name?: string, type?: number): string {
  let cleanedName = name ? name.replace(/\s+/g, "") : "";

  let randomNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");

  let shortUUID = randomUUID().replace(/-/g, "").substring(0, 4);

  if (!cleanedName && type == 0) {
    cleanedName = "customer";
  } else if (!cleanedName && type == 1) {
    cleanedName = "driver";
  }

  return `${cleanedName}${randomNumber}${shortUUID}@example.com`.toLowerCase();
}