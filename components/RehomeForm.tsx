/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BreedSelect } from "./BreedSelect";
import RegionSelect from "./RegionSelect";
import StateSelect from "./StateSelect";
import SubmitLoading from "@/components/SubmitPetLoading";

const states = [
  "Choose states",
  "Perlis",
  "Kedah",
  "Pulau Pinang",
  "Perak",
  "Kelantan",
  "Terengganu",
  "Pahang",
  "Selangor",
  "Melaka",
  "Negeri Sembilan",
  "Johor",
  "Sabah",
  "Sarawak",
  "WP Kuala Lumpur",
  "WP Putrajaya",
  "WP Labuan",
];

const MAX_FILES = 3;
const MAX_SIZE_MB = 10;

export default function RehomeForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form fields
  const [breed, setBreed] = useState("");
  const [state, setState] = useState(states[0]);
  const [regions, setRegions] = useState<string[]>([]);
  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("male");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [animal, setAnimal] = useState("cat");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Validate steps
  const validateStep = (stepNumber: number) => {
    const newErrors: string[] = [];

    if (stepNumber === 1) {
      if (!breed || breed.trim() === "") newErrors.push("Please enter/select a breed");
      if (!age) newErrors.push("Please enter age");
      if (!description) newErrors.push("Please enter description");
    }
    if (stepNumber === 2) {
      if (!ownerName) newErrors.push("Please enter your name");
      if (!phoneNumber) newErrors.push("Please enter your phone number");
      if (!state || state === "Choose states") newErrors.push("Please select a state");
      if (!region) newErrors.push("Please select a region");
    }
    if (stepNumber === 3) {
      if (images.length === 0) newErrors.push("Please upload at least 1 photo");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Image handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > MAX_SIZE_MB) {
        alert(`${file.name} exceeds the ${MAX_SIZE_MB}MB limit and will not be added.`);
        return false;
      }
      return true;
    });

    const newFiles = [...images, ...validFiles].slice(0, MAX_FILES);
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setImages(newFiles);
    setPreviewUrls(newFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previewUrls];
    URL.revokeObjectURL(newPreviews[index]);
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviewUrls(newPreviews);
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const stepsValid = [1, 2, 3].every((s) => validateStep(s));
    if (!stepsValid) return;

    try {
      setLoading(true);

      const formData = new FormData();
      images.forEach((img) => formData.append("images", img));

      const selectedState = state && state !== "Choose states" ? state : "unknown";
      const selectedRegion = region || "unknown";
      formData.append("location", `${selectedRegion}, ${selectedState}`);
      formData.append("breed", breed);
      formData.append("gender", gender);
      formData.append("description", description);
      formData.append("age", age);
      formData.append("phone_number", phoneNumber.replace(/\D/g, ""));
      formData.append("owner_name", ownerName);
      formData.append("animal", animal);

      const endpoint = animal === "cat" ? "/api/cats" : "/api/dogs";
      const res = await fetch(endpoint, { method: "POST", body: formData });
      const data = await res.json();

      if (!data.success) throw new Error(data.error || "Failed to submit pet");

      setTimeout(() => router.push("/submit-your-pet/successful"), 1000);
    } catch (err: any) {
      console.error(err);
      alert(`Submission failed: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-6"
      style={{ border: "3px dashed #D1A980" }}
    >
      {loading && <SubmitLoading isVisible={loading} />}
      <h2 className="text-3xl font-bold text-center" style={{ color: "#748873" }}>
        🐾 Rehome Your Pet
      </h2>

      {/* Progress bar */}
      <div className="flex justify-between items-center mb-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition ${
                step >= s ? "bg-[#D1A980] text-white" : "bg-[#E5E0D8] text-[#748873]"
              }`}
            >
              {s}
            </div>
            <span className="mt-2 text-sm text-[#748873] font-semibold">
              {s === 1 ? "Pet Info" : s === 2 ? "Owner Info" : "Photos"}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              type="button"
              onClick={() => setAnimal("cat")}
              className={`px-4 py-2 rounded-full font-semibold shadow-md transition ${
                animal === "cat" ? "bg-[#D1A980] text-white" : "bg-[#E5E0D8] text-[#748873]"
              }`}
            >
              🐱 Cat
            </button>
            <button
              type="button"
              onClick={() => setAnimal("dog")}
              className={`px-4 py-2 rounded-full font-semibold shadow-md transition ${
                animal === "dog" ? "bg-[#D1A980] text-white" : "bg-[#E5E0D8] text-[#748873]"
              }`}
            >
              🐶 Dog
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#748873] mb-1">Breed</label>
              <BreedSelect animal={animal as "cat" | "dog"} breed={breed} setBreed={setBreed} />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#748873] mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D1A980]"
              >
                <option value="male">♂ Male</option>
                <option value="female">♀ Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#748873] mb-1">Age</label>
              <input
                type="text"
                placeholder="e.g., 2"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D1A980]"
              />
            </div>
          </div>

          <textarea
            placeholder="Tell us about your pet (playful, shy, favorite food...)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D1A980] min-h-[120px]"
          />
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D1A980]"
          />
          <input
            type="text"
            placeholder="Your Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D1A980]"
          />

          <StateSelect
            state={state}
            setState={async (selectedState) => {
              setState(selectedState);
              try {
                const res = await fetch(`/api/regions?state=${selectedState}`);
                const data = await res.json();
                setRegions(data);
                setRegion("");
              } catch (err) {
                console.error("Failed to fetch regions", err);
                setRegions([]);
                setRegion("");
              }
            }}
            states={states}
          />

          <RegionSelect region={region} setRegion={setRegion} regions={regions} disabled={!regions.length} />
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="flex flex-col gap-4">
          <div
            className={`p-4 border-2 border-dashed rounded-xl text-center cursor-pointer transition ${
              images.length >= MAX_FILES ? "opacity-50 cursor-not-allowed" : "hover:bg-[#E5E0D8]"
            }`}
            onClick={() => images.length < MAX_FILES && document.getElementById("pet-images")?.click()}
          >
            <span className="text-[#748873] font-medium">📸 Upload Pet Photos (Max 3, 10MB each)</span>
          </div>

          <input
            id="pet-images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="flex flex-wrap gap-2 justify-center">
            {previewUrls.map((url, idx) => (
              <div key={idx} className="relative w-24 h-24">
                <img
                  src={url}
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg border-2 border-[#D1A980]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col md:flex-row gap-2 mt-4">
        {step === 1 && (
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-full font-semibold shadow-md transition bg-[#E5E0D8] text-[#748873] w-full md:w-auto"
          >
            Cancel
          </button>
        )}
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="px-6 py-3 rounded-full font-semibold shadow-md transition bg-[#E5E0D8] text-[#748873] w-full md:w-auto"
          >
            ⬅ Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={() => validateStep(step) && setStep((s) => s + 1)}
            className="ml-auto px-6 py-3 rounded-full font-semibold shadow-md transition bg-[#D1A980] text-white hover:opacity-90 w-full md:w-auto"
          >
            Next ➡
          </button>
        ) : (
          <button
            type="submit"
            className="ml-auto bg-[#D1A980] text-white py-3 px-6 rounded-full font-bold shadow-md hover:opacity-90 w-full md:w-auto"
          >
            ✨ Submit Your Pet ✨
          </button>
        )}
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <ul className="text-red-500 text-sm mt-2">
          {errors.map((err, idx) => (
            <li key={idx}>⚠ {err}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
