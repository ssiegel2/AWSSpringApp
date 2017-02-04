package com.samsiegel.awsspringapp

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam

@SpringBootApplication
@Controller
class AwsspringappApplication {

	static void main(String[] args) {
		SpringApplication.run AwsspringappApplication, args
	}

	@RequestMapping("/")
	String index() {
		return "index"
	}

	@RequestMapping("/upload")
	String upload() {
		return "upload"
	}

	@RequestMapping('/verify')
	String verify(@RequestParam(value = "username", required = true) String username, Model model) {
		model.addAttribute("username", username)
		return "verify"
	}
}
