package aaaronny.dev.testchat;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import aaaronny.dev.testchat.model.GeneralUser;

@SpringBootApplication
public class Application {

	@Bean
	public UsersContainer getUsersContainer() {

		return new UsersContainer() {

			private Set<GeneralUser> users = new HashSet<GeneralUser>();

			@Override
			public void removeUserByUsername(String username) {
				for (GeneralUser user : users) {
					if (user.getUsername().equals(username)) {
						users.remove(user);
						break;
					}
				}
			}

			@Override
			public void addUser(GeneralUser user) {
				users.add(user);
			}

			@Override
			public Set<GeneralUser> getAllUsers() {
				return users;
			}

			@Override
			public boolean isOnlineUser(GeneralUser user) {
				boolean result = false;
				for (GeneralUser listUser : users)
					if (user.equals(listUser)){
						result = true;
						break;
					}
				return result;
			}
		};

	}

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}