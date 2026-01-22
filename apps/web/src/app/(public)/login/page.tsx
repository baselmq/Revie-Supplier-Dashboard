"use client";

import { Show } from "@/utils";
import { useState } from "react";
import { SignInForm } from "./components/sign-in-form";
import { SignUpForm } from "./components/sign-up-form";

const LoginPage = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <Show>
      <Show.When isTrue={showSignIn}>
        <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
      </Show.When>
      <Show.Else>
        <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
      </Show.Else>
    </Show>
  );
};

export default LoginPage;
