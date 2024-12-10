package com.mtkrm.project.pages

import io.kvision.html.div
import io.kvision.html.h1
import io.kvision.panel.SimplePanel

fun AboutPage(): SimplePanel {
    return SimplePanel(className = "container mt-5").apply {
        h1("My introduction!")
        div { +"yay" }
    }
}
