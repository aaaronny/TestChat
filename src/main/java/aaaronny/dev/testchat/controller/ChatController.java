package aaaronny.dev.testchat.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

import aaaronny.dev.testchat.UsersContainer;
import aaaronny.dev.testchat.model.ChatMessage;
import aaaronny.dev.testchat.model.GeneralUser;

@Controller
public class ChatController {

	@Autowired
	private UsersContainer activeUsers;

	private static final String URI_MESSAGES = "http://aaaronny.altervista.org/testchat_api/messages.php";

	private static final Logger logger = Logger.getLogger(ChatController.class);

	@MessageMapping("/chat")
	@SendTo("/topic/public")
	public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
		if (chatMessage.getDisplayName() == null)
			chatMessage.setDisplayName(chatMessage.getSender());
		String requestRest = "?sender=" + chatMessage.getSender() + "&displayName=" + chatMessage.getDisplayName()
				+ "&content=" + chatMessage.getContent() + "&date=" + chatMessage.getDate();
		RestTemplate restTemplate = new RestTemplate();
		String res = restTemplate.getForObject(URI_MESSAGES + requestRest, String.class);
		logger.info("POST to aaaronnyAPI for NEW MESSAGES >>> " + URI_MESSAGES);
		logger.info("RESULT >>> " + res);
		return chatMessage;
	}

	@MessageMapping("/users")
	@SendTo("/topic/public")
	public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
		if (chatMessage.getDisplayName() == null)
			chatMessage.setDisplayName(chatMessage.getSender());
		if (chatMessage.getTypeMessage().equals("LOGIN")) {
			headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
			GeneralUser generalUser = new GeneralUser(chatMessage.getSender(), chatMessage.getDisplayName(), chatMessage.getContent());
			if (!activeUsers.isOnlineUser(generalUser)){
				logger.info("LOGIN USER >>> " + chatMessage.getSender() + " - " + chatMessage.getDisplayName());
				activeUsers.addUser(generalUser);
			} else {
				logger.info("LOGIN USER >>> UTENTE GIA' LOGGATO");
			}
		}
		return chatMessage;
	}

	@MessageMapping("/chat/{user}")
	@SendTo("/topic/{user}")
	public ChatMessage sendPvtMessage(@DestinationVariable String user, @Payload ChatMessage chatMessage) {
		return chatMessage;
	}

}
