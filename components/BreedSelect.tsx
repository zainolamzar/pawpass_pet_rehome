"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface BreedSelectProps {
  animal: "cat" | "dog";
  breed: string;
  setBreed: (val: string) => void;
}

const catBreeds = ["Persian", "Siamese", "Maine Coon", "Bengal", "Ragdoll", "Sphynx"];
const dogBreeds = ["Beagle", "Golden Retriever", "Bulldog", "Poodle", "German Shepherd", "Labrador"];

export function BreedSelect({ animal, breed, setBreed }: BreedSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const breeds = animal === "cat" ? catBreeds : dogBreeds;

  const filteredBreeds = breeds.filter((b) => b.toLowerCase().includes(query.toLowerCase()));
  const showAddNew = query && !breeds.map((b) => b.toLowerCase()).includes(query.toLowerCase());

  // Capitalize first letter of each word
  const capitalizeWords = (str: string) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between rounded-xl border-gray-300 h-11"
          >
            {breed || "Select breed"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[250px] p-0 bg-white border rounded-xl shadow-md">
          <Command>
            <CommandInput
              placeholder="Search breed..."
              value={query}
              onValueChange={(val) => setQuery(val)}
            />
            <CommandEmpty>No breed found.</CommandEmpty>
            <CommandGroup>
              {filteredBreeds.map((b) => (
                <CommandItem
                  key={b}
                  value={b}
                  onSelect={() => {
                    setBreed(b);
                    setQuery("");
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", breed === b ? "opacity-100" : "opacity-0")} />
                  {b}
                </CommandItem>
              ))}

              {showAddNew && (
                <CommandItem
                  value={query}
                  onSelect={() => {
                    setBreed(capitalizeWords(query));
                    setQuery("");
                    setOpen(false);
                  }}
                >
                  `➕ Add {capitalizeWords(query)}`
                </CommandItem>
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
