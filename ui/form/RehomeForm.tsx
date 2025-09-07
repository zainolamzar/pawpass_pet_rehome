/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

export default function RehomeForm() {
  const [breed, setBreed] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("male");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [animal, setAnimal] = useState("cat"); // default to cat
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      images.forEach((img) => formData.append("images", img));
      formData.append("breed", breed);
      formData.append("location", location);
      formData.append("gender", gender);
      formData.append("description", description);
      formData.append("age", age);
      formData.append("phone_number", phoneNumber);
      formData.append("owner_name", ownerName);
      formData.append("animal", animal);

      // 👇 dynamically choose API route
      const endpoint = animal === "cat" ? "/api/cats" : "/api/dogs";

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Saved:", data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* 👇 Fix: correct handler for animal */}
      <select value={animal} onChange={(e) => setAnimal(e.target.value)}>
        <option value="cat">Cat</option>
        <option value="dog">Dog</option>
      </select>

      <input
        type="text"
        placeholder="Breed"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Owner Name"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
        required
      />
      <input type="file" multiple accept="image/*" onChange={handleImageChange} />

      <div className="flex gap-2">
        {previewUrls.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt="preview"
            className="w-24 h-24 object-cover rounded"
          />
        ))}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}