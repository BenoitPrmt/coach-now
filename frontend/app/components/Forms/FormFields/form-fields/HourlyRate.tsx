import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form"
import {Input} from "~/components/ui/input"
import type {Props} from "~/interfaces/interfaces";


export function HourlyRateField({control}: Props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <FormField
        control={control}
        name="hourlyRate"
        render={({field}) => (
          <FormItem className="grid w-full max-w-sm gap-3">
            <FormLabel>Taux horaire (€)</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" placeholder="45.99€" {...field} />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
    </div>
  );
}
