package com.mtkrm.project.pages

import io.kvision.html.div
import io.kvision.html.h1
import io.kvision.panel.SimplePanel

fun NotFoundPage(): SimplePanel {
    return SimplePanel(className = "container mt-5").apply {
        h1("404 - Not Found")
        div { +"The page you are looking for does not exist." }
    }
}
