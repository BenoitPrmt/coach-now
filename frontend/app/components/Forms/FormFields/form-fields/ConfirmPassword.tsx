import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import type {Props} from "~/interfaces/interfaces";

export function ConfirmPasswordField({ control }: Props) {
  return (
    <FormField
      control={control}
      name="confirmPassword"
      render={({field}) => (
        <FormItem className='grid gap-0'>
          <FormLabel>Confirmer le mot de passe</FormLabel>
          <FormControl className="mt-3">
            <Input placeholder="Confirmer le mot de passe"
                   type="password" {...field} />
          </FormControl>
          <div className="min-h-5 flex items-start mt-1">
            <FormMessage/>
          </div>
        </FormItem>
      )}
    />
  );
}





