package com.mtkrm.project.pages

import io.kvision.core.style
import io.kvision.html.*
import io.kvision.panel.SimplePanel
import io.kvision.utils.px
import kotlinx.browser.window
import kotlin.js.Date
import kotlin.js.Promise

fun RecentNotesSection(): SimplePanel {
    return SimplePanel(className = "recent-notes").apply {
        h2("Recent Notes").apply {
            style {
                fontSize = 24.px
                marginBottom = 10.px
            }
        }

        val notesList = ul()

        // Fetch and display the latest three notes
        val notesPath = "http://localhost:3000/exportedNotes/logseq-pages/"
        fetchMarkdownFiles(notesPath) { recentNotes ->
            println("-----------------")
            println(recentNotes)
            recentNotes.forEach { note ->
                println("note")
                println(note.title)
                notesList.add(
                    li {
                        +"${note.title} (${note.lastModified?.toLocaleDateString() ?: "Unknown Date"})"
                        div { +note.preview }
                    }
                )
            }
        }
        add(notesList)
    }
}

// Data class for note metadata
data class Note(
    val title: String,
    val slug: String,
    val preview: String,
    val lastModified: Date? = null
)

// Fetch Markdown Files and Parse Metadata
fun fetchMarkdownFiles(dirPath: String, callback: (List<Note>) -> Unit) {
    window.fetch("$dirPath").then { response ->
        response.text()
    }.then { rawFiles ->
        // Assuming rawFiles contains a list of filenames (you'll need server logic for this)
        val fileNames = rawFiles.split("\n").filter { it.endsWith(".md") }
        val notes = mutableListOf<Promise<Note?>>()

        fileNames.forEach { fileName ->
            notes.add(
                fetchMarkdownFile("jsMain/resources").then { content ->
                    parseMarkdownFile(content, fileName)
                }
            )
        }

        Promise.all(notes.toTypedArray()).then { results ->
            val recentNotes = results.filterNotNull()
                .sortedByDescending { it.lastModified?.getTime()?.toDouble() ?: 0.0 } // Explicitly cast to Double
                .take(3)
            callback(recentNotes)
        }
    }
}

// Fetch the content of a single Markdown file
fun fetchMarkdownFile(filePath: String): Promise<Promise<String>> {
    return window.fetch(filePath).then { response ->
        response.text()
    }
}

// Parse Metadata and Content from a Markdown File
fun parseMarkdownFile(content: String, fileName: String): Note? {
    val lines = content.split("\n")
    if (lines.size < 3 || !lines[0].startsWith("---")) return null // No valid front matter

    val metadata = mutableMapOf<String, String>()
    var index = 1
    while (index < lines.size && lines[index] != "---") {
        val line = lines[index]
        val parts = line.split(":", limit = 2)
        if (parts.size == 2) {
            metadata[parts[0].trim()] = parts[1].trim().replace("\"", "")
        }
        index++
    }

    val preview = content.substringAfter("---").trim().take(140).replace("\n", " ")

    return Note(
        title = metadata["title"] ?: fileName,
        slug = metadata["slug"] ?: fileName,
        preview = preview,
        lastModified = null // You can fetch the last modified date if the server provides it
    )
}
