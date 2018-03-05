package aaaronny.dev.testchat.controller;

import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import aaaronny.dev.testchat.UsersContainer;
import aaaronny.dev.testchat.model.GeneralUser;

@RestController
public class UserListController {

	private static final Logger logger = Logger.getLogger(UserListController.class);
	
    @Autowired
    private UsersContainer activeUsers;

	@RequestMapping(value = "/onlineUsers", method = RequestMethod.GET, produces="application/json")
	public ResponseEntity<Set<GeneralUser>> getOldMsg() {
		ResponseEntity<Set<GeneralUser>> response = null;
		logger.info("RETURN >>> ALL USERS LIST");
		if (activeUsers.getAllUsers().size()>0) {
			response = new ResponseEntity<Set<GeneralUser>>(activeUsers.getAllUsers(), HttpStatus.OK);
		} else {
			response = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return response;
	}

}