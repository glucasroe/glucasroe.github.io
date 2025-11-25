---
title: Callbacks in Axure
date: '2015-03-07 15:18:04'
image: posts/imported/2015/01/Axurecallbackillu.jpg
---

If you aren't familiar with the idea of a callback, I'll lead off with a definition and then an example.

## A Definition:
It's useful to know when a task is finished, especially when you want it to trigger another action. Axure has the ability to chain some actions into others (e.g. OnMove causing a dynamic panel to Hide), but chaining **with conditional statements** is tricky. Lost yet? Let's try an example.

## Exhibit A: Undo after delete

We have a table of options that our user can delete things from. Instead of confirming each delete, we want them to be able to undo for a few seconds. ([Why?](http://alistapart.com/article/neveruseawarning)) For my amusement, [let's pretend that the data is the characters from Chrono Trigger](http://wires.glucasroe.com/8AGK1S/#p=callbacks).

![Deleted!](/images/posts/imported/2015/03/baweeted.jpg)

If we were to pseudocode out our current interaction, we would probably say something like:

    OnClick of ×:
        set panel to state deleted
        wait 3 seconds
        hide panel and pull widgets below

 The problem with this is that if the user clicks undo in that three second period, Axure will still stomp through to the last rule and hide the panel anyway. What we should have instead should look something like this

     OnClick of ×:
        set panel to state deleted
        wait 3 seconds
        if panel state is deleted:
            hide panel and pull widgets below

It is this `if statement` that I'm calling a callback. (**Nerd Note**: *Technically* this isn't a "real" callback. In practicality however, it ends up functioning kinda like one, and this is for protyping so c'mon.)

## The Second If Statement (And how to do it):
What we need is to be able to do is **trigger a second conditional statement**. We will accomplish this by exploiting `OnMove` without actually moving anything. On our code for ×, we'll put the following:

    OnClick of ×:
        set panel to state deleted
        wait 3 seconds
        move panel by 0,0

![Interaction Example](/images/posts/imported/2015/03/Screen-Shot-2015-03-05-at-13-46-59-.png)

Then, we set up an `OnMove` statement that tests if the panel is in the deleted state after the delay. Screencast!

<img class="gfyitem" data-id="KlutzyShowyKoalabear" />

## The Caveat:

There is one case that this ends up breaking a little bit, and that's **clock restarts**. The user clicks delete, which starts the 3 second clock. They undo the change 1 second later. Just because they're testing, 1 second later later they delete the item again. The clock from the **first** click is still running, which causes the row to be deleted when it runs out 1 second later.

In this particular circumstance, you can solve this by **disabling the delete button** on click and reenabling it onMove.

![Example of a clock restart edge case](/images/posts/imported/2015/03/chronopanel.jpg)
