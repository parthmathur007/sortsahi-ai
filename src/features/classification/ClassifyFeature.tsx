"use client";

import { useState, useRef, useCallback } from "react";
import {
  Search,
  Upload,
  Camera,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";

import type {
  ClassificationResult,
  ConditionalOption,
} from "@/types";

import { ClassificationResultCard } from "./ClassificationResultCard";

type InputMode = "text" | "image";

type AiMode = "live" | "demo";

interface ClassificationResponse {
  success: boolean;
  result?: ClassificationResult;
  error?: string;
  aiMode?: AiMode;
}

const EXAMPLE_ITEMS = [
  "banana peel",
  "used battery",
  "clean cardboard",
  "sanitary pad",
  "glass bottle",
  "plastic bag",
  "CFL bulb",
  "leftover rice",
  "newspaper",
];

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export function ClassifyFeature() {
  const [mode, setMode] = useState<InputMode>("text");
  const [query, setQuery] = useState("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string>("image/jpeg");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [aiMode, setAiMode] = useState<AiMode | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Safely read and validate the classification API response.
  const readResponse = async (
    response: Response
  ): Promise<ClassificationResponse> => {
    let data: ClassificationResponse;

    try {
      data = (await response.json()) as ClassificationResponse;
    } catch {
      throw new Error("The server returned an invalid response.");
    }

    if (!response.ok) {
      throw new Error(
        data.error ?? `Classification failed (${response.status}).`
      );
    }

    if (!data.success) {
      throw new Error(data.error ?? "Classification failed.");
    }

    if (!data.result) {
      throw new Error(
        "The API returned no classification result. Please try again."
      );
    }

    return data;
  };

  // Reset previous results and errors.
  const resetResult = () => {
    setResult(null);
    setAiMode(null);
    setError(null);
    setStatus("idle");
  };

  // Handle image selection.
  const handleFileChange = useCallback((file: File) => {
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Please upload a JPEG, PNG, or WebP image.");
      setStatus("error");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image must be smaller than 5 MB.");
      setStatus("error");
      return;
    }

    setError(null);
    setResult(null);
    setAiMode(null);
    setStatus("idle");

    setImageMime(file.type);
    setImagePreview(null);
    setImageBase64(null);

    const reader = new FileReader();

    reader.onload = (event) => {
      const dataUrl = event.target?.result;

      if (typeof dataUrl !== "string") {
        setError("Could not read the image. Please select it again.");
        setStatus("error");
        return;
      }

      const base64 = dataUrl.split(",")[1];

      if (!base64) {
        setError("Could not process the image. Please try again.");
        setStatus("error");
        return;
      }

      setImagePreview(dataUrl);
      setImageBase64(base64);
    };

    reader.onerror = () => {
      setError("Could not read the image. Please try again.");
      setStatus("error");
    };

    reader.readAsDataURL(file);
  }, []);

  // Handle drag and drop.
  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const file = event.dataTransfer.files[0];

      if (file) {
        handleFileChange(file);
      }
    },
    [handleFileChange]
  );

  // Remove the selected image.
  const clearImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    setImageMime("image/jpeg");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    resetResult();
  };

  // Main classification action.
  // Both text and image buttons call this function.
  const classify = async () => {
    if (status === "loading") return;

    setError(null);
    setResult(null);
    setAiMode(null);

    let requestBody: {
      query?: string;
      imageBase64?: string;
      mimeType?: string;
    };

    if (mode === "text") {
      const cleanQuery = query.trim();

      if (!cleanQuery) {
        setError("Please enter an item name to classify.");
        setStatus("error");
        return;
      }

      if (cleanQuery.length > 200) {
        setError("Item descriptions must be 200 characters or fewer.");
        setStatus("error");
        return;
      }

      requestBody = { query: cleanQuery };
    } else {
      if (!imageBase64) {
        setError("Please select an image first.");
        setStatus("error");
        return;
      }

      requestBody = {
        imageBase64,
        mimeType: imageMime,
      };
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await readResponse(response);

      // The result is checked by readResponse before it is returned.
      if (!data.result) {
        throw new Error("The API returned no classification result.");
      }

      setResult(data.result);
      setAiMode(data.aiMode ?? (data.result.isDemo ? "demo" : "live"));
      setStatus("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );

      setStatus("error");
    }
  };

  // Handle conditional questions shown by the result card.
  const handleConditionalAnswer = (option: ConditionalOption) => {
    const resolved: ClassificationResult = {
      itemName: result?.itemName ?? "Item",
      stream: option.stream,
      confidence: "high",
      shortExplanation: option.explanation,
      disposalInstructions: option.disposalInstructions,
      preparationTips: [],
      isDemo: result?.isDemo ?? false,
      isDeterministic: true,
    };

    setResult(resolved);
    setAiMode(result?.isDemo ? "demo" : "live");
    setError(null);
    setStatus("success");
  };

  // Pressing Enter submits text classification.
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && mode === "text") {
      event.preventDefault();
      void classify();
    }
  };

  return (
    <div className="space-y-6">
      {/* Text and image mode selector */}
      <div
        className="flex gap-1.5 rounded-2xl border border-[#e1e8dc] bg-[#f0f3ec] p-1.5"
        role="tablist"
        aria-label="Classification method"
      >
        {(["text", "image"] as InputMode[]).map((itemMode) => (
          <button
            key={itemMode}
            type="button"
            role="tab"
            aria-selected={mode === itemMode}
            onClick={() => {
              setMode(itemMode);
              resetResult();
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-base font-bold transition-all ${
              mode === itemMode
                ? "bg-white text-green-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {itemMode === "text" ? (
              <Search className="h-4 w-4" />
            ) : (
              <Camera className="h-4 w-4" />
            )}

            {itemMode === "text" ? "Text Search" : "Photo / Image"}
          </button>
        ))}
      </div>

      {/* Text classification */}
      {mode === "text" && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setError(null);
                }}
                onKeyDown={handleKeyDown}
                placeholder="e.g. banana peel, used battery, pizza box..."
                className="w-full rounded-2xl border border-[#dbe4d6] bg-white py-4 pl-11 pr-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
                aria-label="Item to classify"
                autoComplete="off"
                disabled={status === "loading"}
              />

            </div>

            <button
              type="button"
              onClick={() => void classify()}
              disabled={status === "loading"}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Classify"
              )}
            </button>
          </div>

          {/* Example items */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-semibold text-gray-500">
              Try:
            </span>

            {EXAMPLE_ITEMS.map((item) => (
              <button
                key={item}
                type="button"
                disabled={status === "loading"}
                onClick={() => {
                  setQuery(item);
                  setMode("text");
                  resetResult();
                }}
                className="rounded-full border border-[#dce5d8] bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-green-400 hover:text-green-800 disabled:opacity-50"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image classification */}
      {mode === "image" && (
        <div className="space-y-3">
          {!imagePreview ? (
            <div
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              className="cursor-pointer rounded-3xl border-2 border-dashed border-[#cdddc5] bg-[#fbfcf8] p-8 text-center transition-colors hover:border-green-400 hover:bg-green-50/50 sm:p-12"
              role="button"
              tabIndex={0}
              aria-label="Upload an image"
            >
              <Upload className="mx-auto mb-3 h-8 w-8 text-gray-300" />

              <p className="text-base font-bold text-gray-800">
                Drop an image here, or{" "}
                <span className="text-green-600">click to browse</span>
              </p>

              <p className="mt-2 text-sm text-gray-500">
                JPEG, PNG, or WebP · Maximum 5 MB
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) handleFileChange(file);
                }}
                aria-label="Choose an image file"
              />
            </div>
          ) : (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Uploaded item preview"
                className="max-h-80 w-full rounded-2xl border border-gray-200 bg-gray-50 object-contain sm:max-h-96"
              />

              <button
                type="button"
                onClick={clearImage}
                className="absolute right-2 top-2 rounded-full border border-gray-200 bg-white p-1.5 shadow-sm transition-colors hover:border-red-200 hover:bg-red-50"
                aria-label="Remove selected image"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          )}

          {imagePreview && (
            <button
              type="button"
              onClick={() => void classify()}
              disabled={status === "loading" || !imageBase64}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analysing image…
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4" />
                  Classify Image
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading indicator */}
      {status === "loading" && (
        <div
          className="flex flex-col items-center justify-center gap-3 py-12"
          role="status"
          aria-live="polite"
        >
          <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          <p className="text-sm text-gray-500">
            Classifying your item…
          </p>
        </div>
      )}

      {/* Classification result */}
      {result && (
        <>
          <div className="text-xs font-semibold text-gray-500">
            Classification mode:{" "}
            <span
              className={
                aiMode === "live"
                  ? "text-green-700"
                  : "text-amber-700"
              }
            >
              {aiMode === "live" ? "Live AI" : "Demo / local mode"}
            </span>
          </div>

          <ClassificationResultCard
            result={result}
            onConditionalAnswer={handleConditionalAnswer}
          />
        </>
      )}
    </div>
  );
}