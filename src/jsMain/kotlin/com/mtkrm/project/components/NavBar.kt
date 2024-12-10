package com.mtkrm.project.components

import com.mtkrm.project.routing.RouterManager
import io.kvision.core.*
import io.kvision.html.Div
import io.kvision.html.Li
import io.kvision.html.ul
import io.kvision.utils.px
import org.w3c.dom.css.CSSMarginRule

fun NavBar(): Div {
    // Helper function for creating navigation items
    val createNavItem: (String, String) -> Component = { text, route ->
        Li(className = "nav-item") {
            +text
            style {
                padding = 10.px
                margin = 5.px
                cursor = Cursor.POINTER
                borderRadius = 7.px
                background = Background(Color.name(Col.LIGHTBLUE))
                color = Color.name(Col.WHITE)
                fontSize = 16.px
                textAlign = TextAlign.CENTER
            }
            onClick {
                RouterManager.router.navigate(route)
            }
        }
    }

    return Div(className = "navbar bg-light shadow rounded").apply {
        style {
            display = Display.FLEX
            justifyContent = JustifyContent.CENTER // Center the nav bar within the container
        }

        ul(className = "nav-list") {
            style {
                display = Display.FLEX // Horizontal layout
                justifyContent = JustifyContent.CENTER // Align items within the list
                padding = 5.px
                listStyle = ListStyle(ListStyleType.NONE) // Remove bullets
                width = 50.px // Adjust width if needed
            }

            // Add navigation items
            add(createNavItem("Home", "home"))
            add(createNavItem("Tags", "tags"))
            add(createNavItem("About", "about"))
        }
    }
}
