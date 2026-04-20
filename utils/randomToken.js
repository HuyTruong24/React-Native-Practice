import { v4 as uuidv4 } from "uuid";
export function generateRandomToken(length) {
  const token = uuidv4().replace(/-/g, "").slice(0, length);
  console.log("Generated token:", token);
  return token;
}
