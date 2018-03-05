package aaaronny.dev.testchat;

import java.util.Set;

import aaaronny.dev.testchat.model.GeneralUser;

public interface UsersContainer {
	
	public void addUser(GeneralUser user);
	public void removeUserByUsername(String username);
	public Set<GeneralUser> getAllUsers();
	public boolean isOnlineUser(GeneralUser user);
	
}
