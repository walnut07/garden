package com.mtkrm.project.pages

import io.kvision.html.*
import io.kvision.panel.SimplePanel
import io.kvision.panel.VPanel
import com.mtkrm.project.components.NavBar
import io.kvision.core.Background
import io.kvision.core.Col
import io.kvision.core.Color
import io.kvision.core.style
import io.kvision.utils.px

fun HomePage(): SimplePanel {
    return SimplePanel(className = "homepage").apply {
        // Header Section
        add(HeaderSection())

        // Main Section
        add(MainSection())
    }
}

private fun HeaderSection(): SimplePanel {
    return SimplePanel(className = "header-section").apply {
        // Cover
        div(className = "cover") {
            +"Welcome to mtkrm's online space"
            style {
                background = Background(color = Color.name(Col.WHEAT))
                color = Color("fff")
                textAlign = io.kvision.core.TextAlign.CENTER
                fontSize = 36.px
                fontFamily = "Georgia, serif"
                padding = 50.px
                marginBottom = 20.px
                borderRadius = 10.px
            }
        }

        // NavBar
        add(NavBar())
    }
}

private fun MainSection(): SimplePanel {
    return VPanel(spacing = 20).apply {
        // Subsection: Quick Explanation
        add(QuickExplanationSection())

        // Subsection: Recent Notes
        add(RecentNotesSection())

        // Subsection: History
        add(HistorySection())
    }
}

private fun QuickExplanationSection(): SimplePanel {
    return SimplePanel(className = "quick-explanation").apply {
        h2("About This Digital Garden").apply {
            style {
                fontSize = 24.px
                marginBottom = 10.px
            }
        }
        p {
            +"This is a place where I organize my thoughts, ideas, and notes collected using Logseq. It's a growing, evolving repository of knowledge."
            style {
                fontSize = 16.px
            }
        }
    }
}

private fun HistorySection(): SimplePanel {
    // Placeholder content for history section
    return SimplePanel(className = "history-section").apply {
        h2("Logseq History").apply {
            style {
                fontSize = 24.px
                marginBottom = 10.px
            }
        }
        ul {
            li { +"2024-11: 5 notes" }
            li { +"2024-10: 12 notes" }
            li { +"2024-09: 8 notes" }
        }
    }
}
