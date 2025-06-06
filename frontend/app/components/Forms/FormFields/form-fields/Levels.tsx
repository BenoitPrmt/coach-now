import {FormField, FormItem, FormLabel, FormControl, FormMessage,} from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import type {Props} from "~/interfaces/interfaces";

export function LevelField({ control }: Props) {
  return (
    <div className="grid gap-3">
      <FormField
        control={control}
        name="level"
        render={({ field }) => (
          <FormItem className="grid gap-3">
            <FormLabel>Votre niveau</FormLabel>
            <FormControl>
              <RadioGroup
                className="flex gap-5"
                onValueChange={field.onChange}
                value={field.value}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="BEGINNER" id="r1" />
                  <Label htmlFor="r1">BEGINNER</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="MEDIUM" id="r2" />
                  <Label htmlFor="r2">MEDIUM</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="HIGHLEVEL" id="r3" />
                  <Label htmlFor="r3">HIGHLEVEL</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
