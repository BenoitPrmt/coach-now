import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import type {Props} from "~/interfaces/interfaces";

export function EmailField({ control }: Props) {
  return (
    <FormField
      control={control}
      name="email"
      render={({field}) => (
        <FormItem className='grid gap-0'>
          <FormLabel>Email</FormLabel>
          <FormControl className="mt-3">
            <Input placeholder="john.doe@example.com" {...field} />
          </FormControl>
          <div className="min-h-5 flex items-start mt-1">
            <FormMessage/>
          </div>
        </FormItem>
      )}
    />
  );
}

