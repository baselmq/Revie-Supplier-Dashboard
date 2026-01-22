import { useStepper } from "./stepper";
import { Button } from "../ui/button";
import { If, Show } from "@/utils";
import { cn } from "@/lib/utils";
import { useFormContext, useFormState } from "react-hook-form";
import { Loader2 } from "lucide-react";

const StepperFooter = () => {
  const { nextStep, prevStep, isFirstStep, isLastStep } = useStepper();
  const { control } = useFormContext();
  const { isSubmitting } = useFormState({ control });

  return (
    <div className="pt-4 grid grid-cols-2 gap-4">
      <If isTrue={!isFirstStep}>
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="w-full"
          disabled={isSubmitting}
        >
          Back
        </Button>
      </If>
      <If isTrue={!isLastStep}>
        <Button
          type="button"
          onClick={nextStep}
          className={cn("w-full", isFirstStep && "col-span-2")}
          disabled={isSubmitting}
        >
          Next
        </Button>
      </If>
      <If isTrue={isLastStep}>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          <Show>
            <Show.When isTrue={isSubmitting}>
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Creating...
              </span>
            </Show.When>
            <Show.Else>Create</Show.Else>
          </Show>
        </Button>
      </If>
    </div>
  );
};

export default StepperFooter;
