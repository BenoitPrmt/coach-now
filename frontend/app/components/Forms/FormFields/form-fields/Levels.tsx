import {FormField, FormItem, FormLabel, FormControl, FormMessage,} from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import type {Props} from "~/interfaces/interfaces";
import {levels} from "~/constants/levels";

export function LevelField({ control, defaultValue }: Props & { defaultValue?: ("BEGINNER" | "MEDIUM" | "HIGHLEVEL") }) {
  return (
    <div className="grid gap-3">
      <FormField
        control={control}
        name="level"
        render={({ field }) => (
          <FormItem className="grid gap-3">
            <FormLabel>Pour quel niveau enseignez-vous ?</FormLabel>
            <FormControl>
              <RadioGroup
                className="flex gap-5"
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={defaultValue}
              >
                  {levels.map((level, index) => (
                    <div key={level.key} className="flex items-center gap-3">
                      <RadioGroupItem value={level.key} id={`r${index+1}`} />
                      <Label htmlFor={`r${index+1}`}>{level.name}</Label>
                    </div>
                  ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
