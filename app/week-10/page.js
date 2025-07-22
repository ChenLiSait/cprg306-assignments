"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <main className="p-8 text-center">
      {!user ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Welcome to Shopping List</h1>
          <button
            onClick={gitHubSignIn}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Login with GitHub
          </button>
        </>
      ) : (
        <>
          <p className="mb-2">
            👋 Welcome, {user.displayName} ({user.email})
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/week-9/shopping-list">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Go to Shopping List
              </button>
            </Link>
            <button
              onClick={firebaseSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Log out
            </button>
          </div>
        </>
      )}
    </main>
  );
}
