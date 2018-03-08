package aaaronny.dev.testchat.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

@Controller
public class AccountKitController {
	
	private static final Logger logger = Logger.getLogger(AccountKitController.class);

    @RequestMapping("/requestToken")
    public String requestToken(@RequestParam("code") String code, ModelMap model) {
    	String url = "https://graph.accountkit.com/v1.3/access_token?grant_type=authorization_code&code=";
    	url += code + "&access_token=AA|1022508357842402|fe80861d44e55b2054546bcaf64deb4c";
		logger.info("ACCOUNT KIT JSON RESULT TOKEN >>> start method");
		RestTemplate restTemplate = new RestTemplate();
		String res = restTemplate.getForObject(url, String.class);
		logger.info("ACCOUNT KIT JSON RESULT TOKEN >>> " + res);
		model.addAttribute("akResponse", res);
        return "testpage";
    }
    
    @RequestMapping("/falder")
    public String testpage() {
        return "testpage";
    }
}
