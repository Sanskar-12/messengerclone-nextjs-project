import { FullConversationType, FullMessageType } from "@/app/types";
import { Conversation } from "@prisma/client";

interface ConversationListProps {
  intialItems: FullConversationType[];
}

const ConversationList = ({ intialItems }: ConversationListProps) => {
  return <div>sdf</div>;
};

export default ConversationList;
