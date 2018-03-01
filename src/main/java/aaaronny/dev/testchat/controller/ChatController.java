package aaaronny.dev.testchat.controller;

import org.apache.log4j.Logger;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

import aaaronny.dev.testchat.model.ChatMessage;

@Controller
public class ChatController {
	
	private static final String URI_MESSAGES = "http://aaaronny.altervista.org/testchat_api/messages.php";

	private static final Logger logger = Logger.getLogger(ChatController.class);

    @MessageMapping("/chat")
    @SendTo("/topic/public")
	public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
		if (chatMessage.getTypeMessage().equals("CHAT")) {
			String requestRest = "?sender=" + chatMessage.getSender() + "&content=" + chatMessage.getContent() + "&date=" + chatMessage.getDate();
			RestTemplate restTemplate = new RestTemplate();
			String res = restTemplate.getForObject(URI_MESSAGES + requestRest, String.class);
			logger.info("POST to aaaronnyAPI for NEW MESSAGES >>> " + URI_MESSAGES);
			logger.info("RESULT >>> " + res);
		} else if (chatMessage.getTypeMessage().equals("LOGIN")) {
			logger.info("LOGIN USER >>> " + chatMessage.getSender());
		}
		return chatMessage;
	}

	@MessageMapping("/chat/{user}")
	@SendTo("/topic/{user}")
	public ChatMessage sendPvtMessage(@DestinationVariable String user, @Payload ChatMessage chatMessage) {
		return chatMessage;
	}

}
