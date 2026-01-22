import StepperFooter from "@/components/stepper/stepper-footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { If } from "@/utils";
import { Controller, useFormContext } from "react-hook-form";

const CompanyDetailsStep = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-4">
      <Controller
        name="companyName"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" placeholder="Acme Inc." {...field} />
            <If isTrue={!!error}>
              <p className="text-sm text-destructive mt-1">{error?.message}</p>
            </If>
          </div>
        )}
      />

      <Controller
        name="licenseNumber"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="space-y-2">
            <Label htmlFor="licenseNumber">License / Tax ID</Label>
            <Input id="licenseNumber" placeholder="TAX-123456" {...field} />
            <If isTrue={!!error}>
              <p className="text-sm text-destructive mt-1">{error?.message}</p>
            </If>
          </div>
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="123 Business St" {...field} />
            <If isTrue={!!error}>
              <p className="text-sm text-destructive mt-1">{error?.message}</p>
            </If>
          </div>
        )}
      />

      <Controller
        name="city"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="New York" {...field} />
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

export default CompanyDetailsStep;
