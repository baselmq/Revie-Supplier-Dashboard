import PasswordField from "@/components/password-field";
import StepperFooter from "@/components/stepper/stepper-footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { If } from "@/utils";
import { Controller, useFormContext } from "react-hook-form";

const ContentInfoStep = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <Controller
        name="fullName"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="John Doe" {...field} />
            <If isTrue={!!error}>
              <p className="text-sm text-destructive mt-1">{error?.message}</p>
            </If>
          </div>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...field}
            />
            <If isTrue={!!error}>
              <p className="text-sm text-destructive mt-1">{error?.message}</p>
            </If>
          </div>
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              {...field}
            />
            <If isTrue={!!error}>
              <p className="text-sm text-destructive mt-1">{error?.message}</p>
            </If>
          </div>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordField {...field} id="password" />
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

export default ContentInfoStep;
