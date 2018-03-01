package aaaronny.dev.testchat.controller;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class MessageRestController {
	
	private static final String URI_MESSAGES = "http://aaaronny.altervista.org/testchat_api/messages.php";

	private static final Logger logger = Logger.getLogger(MessageRestController.class);

	@RequestMapping(value = "/oldMsg", method = RequestMethod.GET)
	public ResponseEntity<String> getOldMsg() {

		ResponseEntity<String> response = null;

		RestTemplate restTemplate = new RestTemplate();
		String res = restTemplate.getForObject(URI_MESSAGES, String.class);
		logger.info("GET to aaaronnyAPI for OLD MESSAGES >>> " + URI_MESSAGES);
		logger.info("RESULT >>> " + res);
		if (!res.equals("null")) {
			response = new ResponseEntity<String>(res, HttpStatus.OK);
		} else {
			response = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return response;
	}

}