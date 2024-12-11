---
public: "true"
slug: "observer-pattern"
title: "Observer Pattern"
---

The **Observer pattern** is a behavioral design pattern that lets you define a subscription mechanism to notify multiple objects (observers) of changes in a certain object (the subject).


## How is it used in an event-driven application?

Observer: Observers subscribed to a same Subject share changes of another Observer.

```kotlin
interface Observer {
    fun update(message: String)
}
```

Subject: Subject manages subscription of Observers

```kotlin
interface Subject {
    fun attach(observer: Observer)
    fun detach(observer: Observer)
    fun notifyObservers(message: String)
}
```

Implementation of Subject. An example here is notification services

```kotlin
class NotificationService : Subject {
    private val observers = mutableListOf<Observer>()

    override fun attach(observer: Observer) {
        observers.add(observer)
    }

    override fun detach(observer: Observer) {
        observers.remove(observer)
    }

    override fun notifyObservers(message: String) {
        for (observer in observers) {
            observer.update(message)
        }
    }

    // This function is public!
    fun newEvent(eventInfo: String) {
        notifyObservers("New event occurred: $eventInfo")
    }
}
```

Implementation of Observer:

```kotlin
class EmailObserver : Observer {
    override fun update(message: String) {
        println("Email Notification: $message")
    }
}

class SMSObserver : Observer {
    override fun update(message: String) {
        println("SMS Notification: $message")
    }
}

class PushObserver : Observer {
    override fun update(message: String) {
        println("Push Notification: $message")
    }
}
```

How to use the Subject and Observer:

```kotlin
fun main() {
    val notificationService = NotificationService()

    val emailObserver = EmailObserver()
    val smsObserver = SMSObserver()
    val pushObserver = PushObserver()

    // Attach observers to the notification service
    notificationService.attach(emailObserver)
    notificationService.attach(smsObserver)
    notificationService.attach(pushObserver)

    // Trigger a new event to notify all observers
    notificationService.newEvent("Product release version 2.0")
}
```

Use cases:
- notification system
- Reflect data update on UI:
	- A certain class that contains data inherits Observer Pattern
	- Also UI components that will be affected by the data change inherits Observer Pattern
	- An update in data will be notified to the other observers
- Event-driven architecture
	- related: #[[Apache Kafka]]