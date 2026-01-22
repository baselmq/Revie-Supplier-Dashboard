"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RevieLogo from "@/components/icons/revie-logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordField from "@/components/password-field";
import { If, Show } from "@/utils";
import { useLocalStorage } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signInSchema, type SignInInput } from "./schemas/sign-in-schema";
import type { Supplier } from "@/types/supplier";

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

export function SignInForm({ onSwitchToSignUp }: SignInFormProps) {
  const router = useRouter();

  const [suppliers] = useLocalStorage<Supplier[]>("supplier", []);
  const [session, setSession] = useLocalStorage<{ id: string } | null>(
    "session",
    null,
  );

  const { handleSubmit, control, formState } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInInput) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = suppliers.find((supplier) => supplier.email === data.email);
    const isPasswordValid = user?.password === data.password;

    if (user && isPasswordValid) {
      setSession({ id: user.id });
      toast.success("Signed in successfully!");
      router.push("/");
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid place-items-center">
      <Card className="w-full max-w-md mx-auto border-none shadow-none sm:border sm:shadow-sm">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...field}
                  />
                  <If isTrue={!!error}>
                    <p className="text-sm text-destructive mt-1">
                      {error?.message}
                    </p>
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
                  <PasswordField {...field} id="" />
                  <If isTrue={!!error}>
                    <p className="text-sm text-destructive mt-1">
                      {error?.message}
                    </p>
                  </If>
                </div>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={formState.isSubmitting}
            >
              <Show>
                <Show.When isTrue={formState.isSubmitting}>
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    Signing in...
                  </span>
                </Show.When>
                <Show.Else>Sign In</Show.Else>
              </Show>
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 justify-center border-t">
          <div className="text-sm text-balance text-center text-muted-foreground">
            Don&apos;t have an account?
            <Button
              variant="link"
              type="button"
              className="px-1"
              onClick={onSwitchToSignUp}
            >
              Sign up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
