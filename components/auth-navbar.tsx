"use client";

import Link from "next/link";
import { signIn, signOut } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";

export function AuthNavbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  return (
    <nav className="border-b border-border bg-background py-4">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          YourApp
        </Link>
        
        <div>
          {isLoading ? (
            <Button variant="ghost" disabled>
              Loading...
            </Button>
          ) : isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {session?.user?.name || "Account"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session?.user?.email && (
                  <DropdownMenuItem className="text-sm text-muted-foreground">
                    {session.user.email}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <form
                    action={async () => {
                      await signOut();
                    }}
                    className="w-full"
                  >
                    <button className="flex w-full items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <form
              action={async () => {
                await signIn();
              }}
            >
              <Button>Sign in</Button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
} 