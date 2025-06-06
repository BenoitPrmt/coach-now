import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type {Props} from "~/interfaces/interfaces";

export function LastNameField({ control }: Props) {
  return (
    <FormField
      control={control}
      name="lastName"
      render={({field}) => (
        <FormItem className='grid gap-0'>
          <FormLabel>Nom</FormLabel>
          <FormControl className="mt-2">
            <Input placeholder="Doe" {...field} />
          </FormControl>
          <div className="min-h-5 flex items-start mt-1">
            <FormMessage/>
          </div>
        </FormItem>
      )}
    />
  );
}


