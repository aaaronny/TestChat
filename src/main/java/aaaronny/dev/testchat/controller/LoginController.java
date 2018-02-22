package aaaronny.dev.testchat.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class LoginController {

	private static final String URI_LOGIN = "https://testfirebase-4864d.firebaseio.com/USERS/";

	@RequestMapping(value = "/login/{username}", method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<String> login(@PathVariable String username,
			@RequestBody String password) {

		ResponseEntity<String> response = null;

		RestTemplate restTemplate = new RestTemplate();
		String res = restTemplate.getForObject(URI_LOGIN + username + "/" + password + ".json", String.class);
		System.out.println("prova GET >>> " + URI_LOGIN + username + "/" + password + ".json");
		System.out.println(res);
		if (!res.equals("null")) {
			response = new ResponseEntity<String>("OK", HttpStatus.OK);
		} else {
			response = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return response;
	}

}
