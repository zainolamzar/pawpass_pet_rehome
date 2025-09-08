"use client";

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
import React from "react";

export default function StateSelect({
  state,
  setState,
  states,
}: {
  state: string;
  setState: (val: string) => void;
  states: string[];
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-xl border-gray-300 h-[46px]"
        >
          {state || "Select state"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[250px] p-0 bg-white shadow-lg border rounded-xl max-h-[250px] overflow-y-auto"
      >
        <Command>
          <CommandInput placeholder="Search state..." />
          <CommandEmpty>No state found.</CommandEmpty>
          <CommandGroup className="max-h-[200px] overflow-y-auto">
            {states.map((s) => (
              <CommandItem
                key={s}
                value={s}
                onSelect={() => {
                  setState(s);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    state === s ? "opacity-100" : "opacity-0"
                  )}
                />
                {s}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

