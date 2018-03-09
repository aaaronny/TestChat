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
    public String requestToken(@RequestParam("code") String code) {
    	String url = "https://graph.accountkit.com/v1.1/access_token?grant_type=authorization_code&code=";
    	url += code + "&access_token=AA|1022508357842402|a9ad38d68d09a9f2e0e3eb8b3bf9cffb";
		logger.info("ACCOUNT KIT JSON RESULT TOKEN >>> " + url);
		RestTemplate restTemplate = new RestTemplate();
		String res = restTemplate.getForObject(url, String.class);
		logger.info("ACCOUNT KIT JSON RESULT TOKEN >>> " + res);
    	//model.addAttribute("akResponse", res);
        return "testtoken";
    }
    
//    @RequestMapping("/falder")
//    public String testpage(ModelMap model) {
//    	model.addAttribute("akResponse", "FALDER JOLTER JOYASS JORAIS FORAIS BLACKBOARD OSSIGENO");
//        return "testtoken";
//    }
}
