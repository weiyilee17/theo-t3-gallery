import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import Link from "next/link";
import SimpleUploadButton from "./simple-upload-button";

export default async function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <Link href="/">Gallery</Link>
      <div>
        <div className="flex flex-row items-center gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <SimpleUploadButton />
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
