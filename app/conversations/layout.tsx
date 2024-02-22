import getConversations from "../actions/getConversation";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const conversations = await getConversations();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList intialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default layout;
