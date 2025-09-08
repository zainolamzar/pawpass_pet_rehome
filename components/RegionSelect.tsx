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

export default function RegionSelect({
  region,
  setRegion,
  regions,
  disabled,
}: {
  region: string;
  setRegion: (val: string) => void;
  regions: string[];
  disabled: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          aria-expanded={open}
          className="w-full justify-between rounded-xl border-gray-300 h-[46px]"
        >
          {region || "Select region"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[250px] p-0 bg-white shadow-lg border rounded-xl max-h-[250px] overflow-y-auto"
      >
        <Command>
          <CommandInput placeholder="Search region..." />
          <CommandEmpty>No region found.</CommandEmpty>
          <CommandGroup className="max-h-[200px] overflow-y-auto">
            {regions.map((r) => (
              <CommandItem
                key={r}
                value={r}
                onSelect={() => {
                  setRegion(r);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    region === r ? "opacity-100" : "opacity-0"
                  )}
                />
                {r}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
