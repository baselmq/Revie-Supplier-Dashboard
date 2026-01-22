"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "usehooks-ts";
import RevieLogo from "@/components/icons/revie-logo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Stepper, Step } from "@/components/stepper/stepper";
import CompanyDetailsStep from "./sign-up-stepper/company-details-step";
import ServiceCategoriesStep from "./sign-up-stepper/service-categories-step";
import ContentInfoStep from "./sign-up-stepper/contact-info-step";
import {
  companySchema,
  contactSchema,
  servicesSchema,
  signUpSchema,
  type SignUpInput,
} from "./schemas/sign-up-schema";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Supplier } from "@/types/supplier";
import { useRouter } from "next/navigation";

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

export function SignUpForm({ onSwitchToSignIn }: SignUpFormProps) {
  const router = useRouter();

  const [suppliers, setSuppliers] = useLocalStorage<Supplier[]>("supplier", []);
  const [session, setSession] = useLocalStorage<{ id: string } | null>(
    "session",
    null,
  );

  const methods = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      id: crypto.randomUUID(),
      companyName: "",
      licenseNumber: "",
      address: "",
      city: "",
      serviceCategories: [],
      fullName: "",
      email: "",
      phone: "",
      password: "",
    },
    mode: "onTouched",
  });

  const { handleSubmit, trigger, setError } = methods;

  const stepSchemas = [companySchema, servicesSchema, contactSchema];

  const validateStep = async (step: number): Promise<boolean> => {
    const schema = stepSchemas[step];
    const fields = Object.keys(schema.shape) as (keyof SignUpInput)[];
    const result = await trigger(fields);
    return result;
  };

  const onSubmit = async (data: SignUpInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isSupplierExists = suppliers.some(
      (supplier) => supplier.email === data.email,
    );

    if (isSupplierExists) {
      toast.error("Supplier with this email already exists.");
      setError("email", { type: "manual", message: "Email already in use" });
      return;
    }

    const updatedSuppliers = [...suppliers, data];
    setSuppliers(updatedSuppliers);
    setSession({ id: data.id });
    toast.success("Registration successful!");
    router.push("/");
  };
  return (
    <div className="min-h-[calc(100vh-6rem)] grid place-items-center py-8">
      <Card className="w-full max-w-xl mx-auto border-none shadow-none sm:border sm:shadow-sm">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Supplier Registration
          </CardTitle>
        </CardHeader>

        <CardContent>
          <FormProvider {...methods}>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Stepper onBeforeNext={validateStep}>
                <Step title="Company Details">
                  <CompanyDetailsStep />
                </Step>
                <Step title="Services">
                  <ServiceCategoriesStep />
                </Step>
                <Step title="Contact Info">
                  <ContentInfoStep />
                </Step>
              </Stepper>
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 justify-center border-t">
          <div className="text-sm text-balance text-center text-muted-foreground">
            Already have an account?
            <Button
              variant="link"
              type="button"
              className="px-1"
              onClick={onSwitchToSignIn}
            >
              Sign in
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
