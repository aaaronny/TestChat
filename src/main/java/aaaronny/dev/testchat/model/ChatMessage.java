package aaaronny.dev.testchat.model;

import java.util.Date;

public class ChatMessage {
    private String content;
    private String sender;
    private String displayName = null;
    private String date;
    private String typeMessage = "CHAT";

	public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		date = new Date().toGMTString();
    	this.date = date.substring(0, date.length()-4);
	}

	public String getTypeMessage() {
		return typeMessage;
	}

	public void setTypeMessage(String typeMessage) {
		this.typeMessage = typeMessage;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	
}
