import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId || userId === null) {
    throw new Error("Unauthorized");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
      },
    });
  }

  return new Response(JSON.stringify(dbUser));
}
