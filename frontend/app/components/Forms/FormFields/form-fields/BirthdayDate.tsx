import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form"
import {Popover, PopoverContent, PopoverTrigger,} from "~/components/ui/popover";
import {Button} from "~/components/ui/button";
import {cn} from "~/lib/utils";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "~/components/ui/calendar";
import { format } from "date-fns";
import type {Props} from "~/interfaces/interfaces";


export function BirthdayDateField({control}: Props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <FormField
        control={control}
        name="birthDate"
        render={({field}) => (
          <FormItem className="grid w-full max-w-sm gap-3">
            <FormLabel>Date de naissance</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon/>
                    {field.value ? format(field.value, "PPP") : <span>Choisir une date</span>}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage/>
          </FormItem>
        )}
      />
    </div>
  );
}
