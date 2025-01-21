import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const requireUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/api/auth/login");
  }

  return userId;
};
