/*
    AWSSpringApp
    AwsspringappApplication.groovy

    Sam Siegel

*/

package com.samsiegel.awsspringapp

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam

// Main Spring App launcher and controller
@SpringBootApplication
@Controller
class AwsspringappApplication {

	// Launch Spring Application
	static void main(String[] args) {
		SpringApplication.run AwsspringappApplication, args
	}

	// index.html
	@RequestMapping("/")
	String index() {
		return "index"
	}

	// upload.html
	@RequestMapping("/upload")
	String upload() {
		return "upload"
	}

	// verify.html
	@RequestMapping('/verify')
	String verify(@RequestParam(value = "username", required = true) String username, Model model) {
		model.addAttribute("username", username)
		return "verify"
	}
}
