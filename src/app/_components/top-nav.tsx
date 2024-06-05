import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";

// import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UploadButtonClient from "./upload-button-client";

export default async function TopNav() {
  // const user = await currentUser();
  // console.log("🚀 ~ TopNav ~ user:", user);

  // const { isAuthenticated } = getKindeServerSession();

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

        I personally think this is a bug on app router. In clerk's templates, it is not using src folder and so the app folder is at the root.
        
        I've tried to downgrade my next, clerk to Theo's version, but the result is still the same. Another possibility is pnpm. I'm using v9 and Theo is using v8.

        // Not sure why clerk works again, but since it does, I'll move back to clerk

        */}
        <div className="flex flex-row items-center gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UploadButtonClient />
            <UserButton />
          </SignedIn>
        </div>

        {/* Using kinde to follow the tutorial. It doesn't work as the clerk way though. I think it is because the way the matcher in
        the middleware is written? 
        
        The home page is protected, and after logout, it redirects to the homepage, so if you are not logged
        in, you would be redirected to the login page; if you are logged in, you would see logout.

        Could write all the application assuming the user logged in, since the middleware blocks un authed users, but in case clerk
        fixes itself in the future and we want to change to use clerk, we can write it this way.
        
        */}

        {/* <div className="flex flex-row">
          {(await isAuthenticated()) ? (
            <>
              <UploadButtonClient />
              <LogoutLink>Logout</LogoutLink>
            </>
          ) : (
            <LoginLink>Sign in</LoginLink>
          )}
        </div> */}
      </div>
    </nav>
  );
}
