import React from "react";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Show } from "@/utils";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const PasswordField = ({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative flex items-center">
      <Input
        className={cn("pe-10", className)}
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        {...props}
      />

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute end-0 top-0"
        type="button"
      >
        <Show>
          <Show.When isTrue={showPassword}>
            <Eye />
          </Show.When>
          <Show.Else>
            <EyeOff />
          </Show.Else>
        </Show>
      </Button>
    </div>
  );
};

export default PasswordField;
