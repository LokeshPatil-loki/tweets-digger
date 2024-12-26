import { promises as fs } from "fs";

export async function writeDataToFile(
  filePath: string,
  data: unknown
): Promise<boolean> {
  try {
    const encoded = JSON.stringify(data);
    await fs.writeFile(filePath, encoded);
    return true;
  } catch (error) {
    console.error("Error writing to file:", error);
    return false;
  }
}
