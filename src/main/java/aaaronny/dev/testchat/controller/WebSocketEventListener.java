package aaaronny.dev.testchat.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import aaaronny.dev.testchat.model.ChatMessage;

@Component
public class WebSocketEventListener {

    private static final Logger logger = Logger.getLogger(WebSocketEventListener.class);
    
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        String displayName = (String) headerAccessor.getSessionAttributes().get("displayName");
        if(username != null) {
			logger.info("LOGOUT USER >>> " + username + " - " + displayName);
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setTypeMessage("LOGOUT");
            chatMessage.setSender(username);
            chatMessage.setDisplayName(displayName);
            messagingTemplate.convertAndSend("/topic/public", chatMessage);
        }
    }
}
