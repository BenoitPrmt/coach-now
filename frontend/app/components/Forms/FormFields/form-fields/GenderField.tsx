import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form"
import {RadioGroup, RadioGroupItem} from "~/components/ui/radio-group"
import {Label} from "~/components/ui/label"
import type {Props} from "~/interfaces/interfaces";


export function GenderField({control}: Props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <FormField
        control={control}
        name="gender"
        render={({field}) => (
          <FormItem className="grid w-full max-w-sm gap-3">
            <FormLabel>Votre sexe</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                name={field.name}
                className="flex gap-5"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="MALE" id="gender-male"/>
                  <Label htmlFor="gender-male">Homme</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="FEMALE" id="gender-female"/>
                  <Label htmlFor="gender-female">Femme</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
      />
    </div>

  );
}
