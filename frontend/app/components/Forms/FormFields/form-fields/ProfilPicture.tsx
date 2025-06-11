import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type {Props} from "~/interfaces/interfaces";

export function ProfilePictureField({ control }: Props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <FormField
        control={control}
        name="profilePictureUrl"
        render={({ field }) => (
          <FormItem className="grid w-full max-w-sm gap-3">
            <FormLabel>Photo de profil (URL)</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="https://exemple.com/monimage.jpg"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
