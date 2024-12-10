package com.mtkrm.project.routing

import io.kvision.panel.SimplePanel

object RouterManager {
    lateinit var router: Router

    fun initializeRouter(rootContainer: SimplePanel) {
        router = Router(rootContainer)
    }
}
