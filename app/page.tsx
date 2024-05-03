import Image from "next/image";
import { Loader } from "lucide-react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <div className="h-full">
      <div className="h-full bg-gradient-to-tl from-sky-800 to-amber-900 backdrop-blur-3xl flex flex-row">
        <div className="w-[50%] flex items-center justify-center">
          <Logo className="from-white to-white text-7xl hover:opacity-100" />
        </div>
        <div className="w-[50%] bg-white justify-center items-center flex flex-col px-40 space-y-10">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                afterSignInUrl="/workspace"
                afterSignUpUrl="/workspace"
              >
                <Button size="lg" variant="outline" className="w-full">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton
                mode="modal"
                afterSignInUrl="/workspace"
                afterSignUpUrl="/workspace"
              >
                <Button size="lg" variant="default" className="w-full">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/workspace">Continue</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
