package com.mtkrm.project.pages

import io.kvision.html.div
import io.kvision.html.h1
import io.kvision.panel.SimplePanel

fun TagsPage(): SimplePanel {
    return SimplePanel(className = "container mt-5").apply {
        h1("Tags")
        div { +"This is the Tags page." }
    }
}
