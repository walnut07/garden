package com.mtkrm.project

import com.mtkrm.project.components.NavBar
import com.mtkrm.project.pages.HomePage
import com.mtkrm.project.pages.NotFoundPage
import com.mtkrm.project.pages.TagsPage
import com.mtkrm.project.routing.RouterManager
import io.kvision.*
import io.kvision.panel.root
import io.kvision.Application
import io.kvision.panel.SimplePanel

class App : Application() {
    override fun start() {
        val rootContainer = root("kvapp") {
            SimplePanel()
            NavBar()
        }

        // Initialize the global router
        RouterManager.initializeRouter(rootContainer)

        // Define routes
        RouterManager.router.addRoute("/") { HomePage() }
        RouterManager.router.addRoute("/home") { HomePage() }
        RouterManager.router.addRoute("/tags") { TagsPage() }
        RouterManager.router.addRoute("/404") { NotFoundPage() }

        // Start the router
        RouterManager.router.start()
    }
}

fun main() {
    startApplication(
        ::App,
        module.hot,
        BootstrapModule,
        BootstrapCssModule,
        CoreModule
    )
}
