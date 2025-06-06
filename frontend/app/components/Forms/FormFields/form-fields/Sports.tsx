import {FormField, FormItem, FormLabel, FormControl, FormMessage,} from "~/components/ui/form";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem,} from "~/components/ui/select";
import type {Props} from "~/interfaces/interfaces";

export function SportsField({ control }: Props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <FormField
        control={control}
        name="sports"
        render={({ field }) => (
          <FormItem className="grid w-full max-w-sm gap-3">
            <FormLabel>Choix des sports</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir des sports" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sports</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
