import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import useConversation from "@/app/hooks/useConversation";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface IParams {
  conversationId: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid Id", { status: 400 });
    }

    const deleteConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    return NextResponse.json(deleteConversation);
  } catch (error) {
    console.log(error, "MESSAGES_SEEN_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
