package com.samsiegel.awsspringapp

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

/**
 * Created by Sam on 1/30/2017.
 */

@Controller
class IndexController {

    @RequestMapping("/")
    String index() {
        return "index"
    }

}
