"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperContextValue {
  activeStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextStep: () => Promise<void>;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

interface StepProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const StepperContext = React.createContext<StepperContextValue | null>(null);

export const useStepper = () => {
  const context = React.useContext(StepperContext);
  if (!context) throw new Error("useStepper must be used within a Stepper");
  return context;
};

function Stepper({
  children,
  defaultStep = 0,
  className,
  onBeforeNext,
}: {
  children: React.ReactNode;
  defaultStep?: number;
  className?: string;
  onBeforeNext?: (step: number) => boolean | Promise<boolean>;
}) {
  const [activeStep, setActiveStep] = React.useState(defaultStep);

  const steps = React.Children.toArray(children).filter(
    (c): c is React.ReactElement<StepProps> =>
      React.isValidElement(c) && c.type === Step,
  );

  const totalSteps = steps.length;
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === totalSteps - 1;

  const nextStep = async () => {
    if (isLastStep || (onBeforeNext && !(await onBeforeNext(activeStep))))
      return;
    setActiveStep((s) => s + 1);
  };

  const prevStep = () => !isFirstStep && setActiveStep((s) => s - 1);
  const goToStep = (s: number) => s >= 0 && s < totalSteps && setActiveStep(s);

  return (
    <StepperContext.Provider
      value={{
        activeStep,
        totalSteps,
        isFirstStep,
        isLastStep,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      <div className={cn("flex flex-col gap-4", className)}>
        <nav className="flex items-center justify-center gap-2">
          {steps.map(({ props: { title } }, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                    i <= activeStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground text-muted-foreground",
                  )}
                >
                  {i < activeStep ? <Check className="size-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    i === activeStep
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {title}
                </span>
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-8 transition-colors",
                    i < activeStep ? "bg-primary" : "bg-muted",
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </nav>
        <div className={cn("mt-4", steps[activeStep]?.props.className)}>
          {steps[activeStep]?.props.children}
        </div>
      </div>
    </StepperContext.Provider>
  );
}

function Step({ children, className }: StepProps) {
  return <div className={className}>{children}</div>;
}

export { Stepper, Step };
