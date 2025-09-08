"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BreedSelectProps {
  animal: "cat" | "dog";
  breed: string;
  setBreed: (val: string) => void;
}

const catBreeds = [
  "Persian",
  "Siamese",
  "Maine Coon",
  "Bengal",
  "Ragdoll",
  "Sphynx",
  "Other",
];

const dogBreeds = [
  "Beagle",
  "Golden Retriever",
  "Bulldog",
  "Poodle",
  "German Shepherd",
  "Labrador",
  "Other",
];

export function BreedSelect({ animal, breed, setBreed }: BreedSelectProps) {
  const [open, setOpen] = React.useState(false);
  const breeds = animal === "cat" ? catBreeds : dogBreeds;

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
        <PopoverContent
          className="w-[250px] p-0 bg-white border rounded-xl shadow-md"
        >
          <Command>
            <CommandInput placeholder="Search breed..." />
            <CommandEmpty>No breed found.</CommandEmpty>
            <CommandGroup>
              {breeds.map((b) => (
                <CommandItem
                  key={b}
                  value={b}
                  onSelect={() => {
                    setBreed(b);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      breed === b ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {b}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* If Other, show input */}
      {breed === "Other" && (
        <Input
          type="text"
          placeholder="Enter breed"
          className="mt-2 rounded-xl border-gray-300 focus:ring-[#D1A980] h-11"
          onChange={(e) => setBreed(e.target.value)}
        />
      )}
    </div>
  );
}
