import StepperFooter from "@/components/stepper/stepper-footer";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { If } from "@/utils";
import { Controller, useFormContext } from "react-hook-form";

const ServiceCategoriesStep = () => {
  const { control } = useFormContext();

  const serviceCategories = [
    { id: "carpentry", label: "Carpentry" },
    { id: "painting", label: "Painting" },
    { id: "electrical", label: "Electrical" },
    { id: "plumbing", label: "Plumbing" },
    { id: "hvac", label: "HVAC" },
    { id: "cleaning", label: "Cleaning" },
    { id: "landscaping", label: "Landscaping" },
  ];

  return (
    <div className="space-y-4">
      <Label className="text-base">Select Services You Provide</Label>
      <Controller
        name="serviceCategories"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-3">
              {serviceCategories.map((category) => (
                <Label
                  key={category.id}
                  htmlFor={category.id}
                  className="flex items-center border p-3 rounded-md hover:bg-accent transition-colors"
                >
                  <Checkbox
                    id={category.id}
                    checked={field.value?.includes(category.id)}
                    onCheckedChange={(checked) => {
                      field.onChange(
                        checked
                          ? [...(field.value || []), category.id]
                          : (field.value || []).filter(
                              (v: string) => v !== category.id,
                            ),
                      );
                    }}
                  />

                  {category.label}
                </Label>
              ))}
            </div>
            <If isTrue={!!error}>
              <p className="text-sm text-destructive mt-1">{error?.message}</p>
            </If>
          </div>
        )}
      />

      <StepperFooter />
    </div>
  );
};

export default ServiceCategoriesStep;
