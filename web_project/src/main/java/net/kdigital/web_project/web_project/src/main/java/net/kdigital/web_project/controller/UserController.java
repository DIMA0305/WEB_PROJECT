package net.kdigital.web_project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.kdigital.web_project.dto.CustomerDTO;
import net.kdigital.web_project.dto.CustomerItemDTO;
import net.kdigital.web_project.service.CustomerItemService;
import net.kdigital.web_project.service.CustomerService;

@Controller
@Slf4j
@RequiredArgsConstructor
public class UserController {
	public final CustomerService customerService;
	public final CustomerItemService customerItemService;
	
	// 회원가입 화면 요청
	@GetMapping("/user/join") 
	public String join() {
		return "/user/joinExample";
	}

	// 회원 저장
	@PostMapping("/user/joinProc")
	public String joinProc(@ModelAttribute CustomerDTO customerDTO
			, @ModelAttribute CustomerItemDTO customerItemDTO) {
		
		customerService.joinProc(customerDTO);
		customerItemService.insertItem(customerItemDTO);
		return "redirect:/";
	}
	
	
	// 로그인 화면 요청
	@GetMapping("/user/login")
	public String login(
			@RequestParam(value="error", required=false) String error
			, @RequestParam(value="errMessage", required=false) String errMessage
			, Model model
			) {
		model.addAttribute("error", error);
		model.addAttribute("errMessage", errMessage);
		
		return "/user/loginExample";
	}
	
}