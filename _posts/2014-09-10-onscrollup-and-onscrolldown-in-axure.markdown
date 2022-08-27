---
layout: post
title: 'OnScrollUp and OnScrollDown in Axure'
date: '2014-09-10 21:12:44'
image: posts/imported/2015/12/scrollup-scrolldown-axure-1.png
---

Axure 7 added the wonderful and tremendously useful `OnWindowScroll` event to page interactions. Unfortunately, it doesn't include direction like `OnScrollUp` or `OnScrollDown`. An event like this is super useful because you can use it to show a sticky header, like in [this example jquery plugin, headroom.js](http://wicky.nillia.ms/headroom.js/). I'll walk through the steps and then explain the logic. Example link:[ http://wires.glucasroe.com/VSHYD6](http://wires.glucasroe.com/VSHYD6)

## 1. Build your content
Before adding your interactivity, build your content. It's a grand idea, trust me.

Here's my sample prototype:
![Silly little prototype](/images/posts/imported/2014/Sep/Screen-Shot-2014-09-10-at-5-05-03-PM.png)

## 2. Pin the header to the browser
Convert all of your header to a dynamic panel and pin it to the browser. Make sure your header is **in front** of all your other content or you'll get a display bug.
![This is how you pin a panel! Yay!](/images/posts/imported/2014/Sep/Pinthepanel.jpg)


## 3. Create and set a windowScroll variable
In your **Page Interactions** (If you don't see these, go to *View > Panes > Page Properties* and click the center tab), double click `OnWindowScroll`. First, add in a `Wait` action (I use 100ms, I'll explain why later). Then we'll need to set set a `windowScroll` variable to `[[window.scrollY]]`. Here's a quick walkthrough.

<style type="text/css">.gfyitem>div{max-height:700px}</style>
<img class="gfyitem" data-id="WildLikableKingsnake" />

## 4. Hide the header onScrollDown
Add a new case, put in the conditional if `[[windowScroll + 10]] is less than [[Window.scrollY]]` and have it `hide header slide up`. Right click the case after you have set it up and toggle If/Else if. Screencast!

<img class="gfyitem" data-id="UntimelyFreeGnatcatcher" />

## 5. Show the header onScrollUp
Add a new case, put in the conditional if `[[windowScroll - 10]] is greater than [[Window.scrollY]]` and have it `show header slide down`. This is basically the exact opposite of what you did for onScrolldown. Here's what it should look like when you're done
![Full settings](/images/posts/imported/2014/Sep/full-settings.png)

# What's happening here?
The first event sets a value, but only after a brief delay. See what happens on the [example URL](http://wires.glucasroe.com/VSHYD6) if you open the variables panel in the left sidebar and scroll.

After a value is set (after initial scroll), on a subsequent scroll it holds the value briefly before resetting it. Comparing this value to the current scroll position allows you to determine scroll direction and then sets it again for the next time scrolling stops.

The additions to the variable value in the comparisons section gives you your tolerances. This prevents the functions from firing too easily as scrolling stops, especially if you're using a trackpad.

If you would like to to make the scroll event fire less easily (for instance, slow scrolling up doesn't open the header), adjust the tolerance for the on scroll up to a greater amount, for instance `windowScroll - 100`. If the window doesn't scroll up more than 100 px in 0.1s, the header doesn't show. If you do this however, make sure that you account for the user slow scrolling to the top of the page. You might want to either put a non sticky version of the header at the top, or put a final `OnWindowScroll` event that shows the header if the user scrolls too high i.e. `if Window.scrollY is less than 200, show Header slide down`.
