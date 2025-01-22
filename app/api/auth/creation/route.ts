import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // Retrieve the current user from Clerk
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Check if the user exists in your database
  let dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  // If the user doesn't exist, create a new record
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? "",
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        profileImage: user.imageUrl ?? "",
        customerId: null, // Optionally populate this if using Stripe
      },
    });
  }

  // Redirect the user to the dashboard
  return NextResponse.redirect(
    process.env.NODE_ENV === "production"
      ? "https://blog-marshal.vercel.app/dashboard"
      : "http://localhost:3000/dashboard"
  );
}
