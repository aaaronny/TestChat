package aaaronny.dev.testchat.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import aaaronny.dev.testchat.UsersContainer;
import aaaronny.dev.testchat.model.ChatMessage;

@Component
public class WebSocketEventListener {

    private static final Logger logger = Logger.getLogger(WebSocketEventListener.class);
	
    @Autowired
    private UsersContainer activeUsers;
    
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if(username != null) {
        	activeUsers.removeUserByUsername(username);
			logger.info("LOGOUT USER >>> " + username);
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setTypeMessage("LOGOUT");
            chatMessage.setSender(username);
            messagingTemplate.convertAndSend("/topic/public", chatMessage);
        }
    }
}
