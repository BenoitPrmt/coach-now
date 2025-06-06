import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type {Props} from "~/interfaces/interfaces";

export function FirstNameField({ control }: Props) {
  return (
    <FormField
      control={control}
      name="firstName"
      render={({field}) => (
        <FormItem className='grid gap-0'>
          <FormLabel>Prénom</FormLabel>
          <FormControl className="mt-2">
            <Input placeholder="John" {...field} />
          </FormControl>
          <div className="min-h-5 flex items-start mt-1">
            <FormMessage/>
          </div>
        </FormItem>
      )}
    />
  );
}

