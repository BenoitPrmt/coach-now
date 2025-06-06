import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import type {Props} from "~/interfaces/interfaces";

export function PasswordField({ control }: Props) {
  return (
    <FormField
      control={control}
      name="password"
      render={({field}) => (
        <FormItem className='grid gap-0'>
          <FormLabel>Mot de passe</FormLabel>
          <FormControl className="mt-3">
            <Input placeholder="Mot de passe" type="password" {...field} />
          </FormControl>
          <div className="min-h-5 flex items-start mt-1">
            <FormMessage/>
          </div>
        </FormItem>
      )}
    />
  );
}



