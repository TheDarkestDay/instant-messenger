import { useParams } from 'react-router-dom';
import { useChatMessages } from './useChatMessages';

export const MessagesList = () => {
  const { chatId } = useParams();
  const { messages } = useChatMessages(chatId);

  return (
    <section>
      {
        messages.map((message) => {
          return (
            <article>
              <header>
                {message.author.name}
              </header>

              <p>
                {message.text}
              </p>
            </article>
          );
        })
      }
    </section>
  );
};