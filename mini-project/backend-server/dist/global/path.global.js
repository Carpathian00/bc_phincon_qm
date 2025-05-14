import path from "path";
import { fileURLToPath } from "url";
export const getDirname = (url) => path.dirname(fileURLToPath(url));
export const getBasename = (url) => path.basename(fileURLToPath(url));
