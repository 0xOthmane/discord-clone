"use client";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import { ChangeEvent, forwardRef, useMemo } from "react";
import { imageSchema } from "@/lib/validation";
import { ZodError } from "zod";
import Image from "next/image";
import { X } from "lucide-react";

interface Props {
  onChange: (url?: string) => void;
  value: string;
  onError: (message: string) => void;
}
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const FileUpload = forwardRef<HTMLInputElement, Props>(
  ({ onChange, value, onError }: Props, ref) => {
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      maxFiles: 1,
      maxSize: 4194304,
      accept: {
        "image/*": [],
      },
    });
    const style = useMemo(
      () => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      }),
      [isFocused, isDragAccept, isDragReject]
    );

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
      console.log("Validation");
      if (!event.target.files) return;
      const file = event.target.files[0];
      if (!file) return;
      try {
        const valid = imageSchema.parse(file);
        onError("");
        const imgUrl = await uploadImage(valid);
        console.log("Changing");
        onChange(imgUrl);
      } catch (error) {
        onError((error as ZodError).issues[0].message);
      }
    };

    const uploadImage = async (image: File) => {
      const data = new FormData();
      data.append("image", image);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log("Upload successful");
        return responseData.imageUrl;
      }
    };

    if (value)
      return (
        <div className="relative h-20 w-20">
          <Image src={value} alt="Server image" fill className="rounded-full" />
          <button
            onClick={() => onChange("")}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      );

    return (
      <div {...getRootProps({ style })}>
        <Input
          ref={ref}
          {...getInputProps()}
          multiple={false}
          value={value}
          onChange={handleFileChange}
        />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag &apos;n&apos; drop an image here, or click to select one</p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "Image upload";

export default FileUpload;
