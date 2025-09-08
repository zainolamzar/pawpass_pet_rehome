"use client";

import React from "react";

interface FilterFormProps {
  filters: {
    gender: string;
    breed: string;
    state: string;
    region: string;
    isVaccinated: string;
    isNeutered: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      gender: string;
      breed: string;
      state: string;
      region: string;
      isVaccinated: string;
      isNeutered: string;
    }>
  >;
  breeds: string[];
  regions: string[];
  states: string[];
  onClose?: () => void;
}

export default function FilterForm({
  filters,
  setFilters,
  breeds,
  regions,
  states,
  onClose,
}: FilterFormProps) {
  return (
    <div className="flex flex-col">
      {/* Gender */}
      <label className="block mb-2 text-sm font-semibold">Gender</label>
      <select
        value={filters.gender}
        onChange={(e) => setFilters((f) => ({ ...f, gender: e.target.value }))}
        className="mb-4 border rounded p-2"
      >
        <option value="">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      {/* Breed */}
      <label className="block mb-2 text-sm font-semibold">Breed</label>
      <select
        value={filters.breed}
        onChange={(e) => setFilters((f) => ({ ...f, breed: e.target.value }))}
        className="mb-4 border rounded p-2"
      >
        <option value="">All</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      {/* State */}
      <label className="block mb-2 text-sm font-semibold">State</label>
      <select
        value={filters.state}
        onChange={(e) => setFilters((f) => ({ ...f, state: e.target.value }))}
        className="mb-4 border rounded p-2"
      >
        <option value="">All</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* Region */}
      <label className="block mb-2 text-sm font-semibold">Region</label>
      <select
        value={filters.region}
        onChange={(e) => setFilters((f) => ({ ...f, region: e.target.value }))}
        className="mb-4 border rounded p-2"
      >
        <option value="">All</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      {/* Vaccination */}
      <label className="block mb-2 text-sm font-semibold">Vaccinated</label>
      <select
        value={filters.isVaccinated}
        onChange={(e) => setFilters((f) => ({ ...f, isVaccinated: e.target.value }))}
        className="mb-4 border rounded p-2"
      >
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      {/* Neutered */}
      <label className="block mb-2 text-sm font-semibold">Neutered</label>
      <select
        value={filters.isNeutered}
        onChange={(e) => setFilters((f) => ({ ...f, isNeutered: e.target.value }))}
        className="mb-4 border rounded p-2"
      >
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      {/* Close button (mobile only) */}
      {onClose && (
        <button
          onClick={onClose}
          className="md:hidden mt-2 px-4 py-2 rounded bg-[#748873] text-white font-semibold"
        >
          Close Filters
        </button>
      )}
    </div>
  );
}
