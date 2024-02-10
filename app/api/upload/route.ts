import { mkdir, stat, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const POST = async (req: NextRequest) => {
  const data = await req.formData();
  const file: File | null = data.get("image") as unknown as File;
  if (!file)
    return NextResponse.json(
      { success: false, error: "No files received." },
      { status: 400 }
    );
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const relativeUploadDir = `/uploads/servers/${new Date()
    .toISOString()
    .slice(0, 10)}`;
  const uploadDir = path.join(process.cwd(), "public", relativeUploadDir);
  try {
    await stat(uploadDir);
  } catch (e) {
    if (
      typeof e === "object" &&
      e &&
      "code" in e &&
      typeof e.code === "string" &&
      e.code === "ENOENT"
    ) {
      await mkdir(uploadDir, { recursive: true });
    } else {
      throw e;
    }
  }
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${file.name
    .split(".")[0]
    .replaceAll(" ", "_")}-${uniqueSuffix}.${file.name.split(".").pop()}`;

  try {
    // Write the file to the specified directory (public/assets) with the modified filename
    await writeFile(`${uploadDir}/${filename}`, buffer);

    // Return a JSON response with a success message and a 201 status code
    return NextResponse.json({
      Message: "Success",
      status: 201,
      imageUrl: `${relativeUploadDir}/${filename}`,
    });
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
