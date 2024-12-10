package com.mtkrm.project.routing

import io.kvision.panel.SimplePanel
import kotlinx.browser.window

class Router(private val rootContainer: SimplePanel) {
    private val routes = mutableMapOf<String, () -> SimplePanel>()

    fun addRoute(path: String, handler: () -> SimplePanel) {
        routes[path] = handler
    }

    fun navigate(path: String) {
        window.history.pushState(null, "", path)
        resolve()
    }

    fun resolve() {
        val currentPath = window.location.pathname
        val handler = routes[currentPath] ?: routes["/404"]
        rootContainer.removeAll() // Clear previous content
        handler?.let { rootContainer.add(it.invoke()) }
    }

    fun start() {
        window.onpopstate = { resolve() }
        resolve() // Resolve the initial route
    }
}
