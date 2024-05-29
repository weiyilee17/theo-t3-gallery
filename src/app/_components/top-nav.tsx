// import { SignInButton, UserButton } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";

import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function TopNav() {
  // const user = await currentUser();
  // console.log("🚀 ~ TopNav ~ user:", user);

  const { isAuthenticated } = getKindeServerSession();

  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>
      <div>
        {/* Not sure why this doesn't work, user always shows null, and debug message shows 
        
        [clerk debug start: auth()]
        Headers debug, {
          "authStatus": "signed-out",
          "authMessage": "Invalid JWT form. A JWT consists of three parts separated by dots. (reason=token-invalid, token-carrier=header)",
          "authReason": "token-invalid"
        }
        Options debug, {
          "authStatus": "signed-out",
          "apiUrl": "https://api.clerk.com",
          "apiVersion": "v1",
          "authMessage": "Invalid JWT form. A JWT consists of three parts separated by dots. (reason=token-invalid, token-carrier=header)",
          "secretKey": "sk_test_*********SJK",
          "authReason": "token-invalid"
        }
        [clerk debug end: auth()] (@clerk/nextjs=5.1.3,next=14.2.3)

        The token could be successfully decoded in jwt's website, so not sure what is wrong about the jwt form. The UserButton gets my data, and shows my github profile image. My clerk's dashboard also shows my github account has successfully signed in, but no user because jwt token invalid.

        I personally think this is a bug on app router. I've tried to downgrade my next, clerk to Theo's version, but the result is still the same. Another possibility is pnpm. I'm using v9 and Theo is using v8.
        
        */}

        {/* <SignedOut>
        <SignInButton />
        </SignedOut>
        <SignedIn>
        <UserButton />
        </SignedIn> */}

        {/* Using kinde to follow the tutorial */}
        {(await isAuthenticated()) ? (
          <LogoutLink>Logout</LogoutLink>
        ) : (
          <LoginLink>Sign in</LoginLink>
        )}
      </div>
    </nav>
  );
}
