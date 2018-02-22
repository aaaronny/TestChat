package aaaronny.dev.testchat.controller;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import aaaronny.dev.testchat.model.User;

@RestController
public class LoginController {

	private static final String URI_LOGIN = "https://testfirebase-4864d.firebaseio.com/USERS/";
	private static final Logger logger = Logger.getLogger(LoginController.class);

	@RequestMapping(value = "/login", method = RequestMethod.POST, produces="application/json", consumes="application/json")
	public ResponseEntity<String> login(@RequestBody User user) {

		ResponseEntity<String> response = null;

		RestTemplate restTemplate = new RestTemplate();
		String res = restTemplate.getForObject(URI_LOGIN + user.getUsername() + "/" + user.getPassword() + ".json", String.class);
		logger.info("POST to FireBase >>> " + URI_LOGIN + user.getUsername() + "/" + user.getPassword() + ".json");
		logger.info("RESULT >>> " + res);
		if (!res.equals("null")) {
			response = new ResponseEntity<String>("OK", HttpStatus.OK);
		} else {
			response = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return response;
	}

}
