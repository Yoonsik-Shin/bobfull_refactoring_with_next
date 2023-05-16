import { useEffect } from "react";

export const useChatRoomScroll = ({ data, chatContainer }) => {
  useEffect(() => {
    if (!chatContainer.current) return;
    const { scrollHeight, clientHeight } = chatContainer.current;

    if (scrollHeight > clientHeight) {
      chatContainer.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [data.length]);
};
