---
layout: post
title: 'Visible Responsive Design in Axure: A Hybrid Approach'
date: '2015-12-04 15:49:49'
image: posts/imported/2015/12/axure-responsive-hybrid-optim.gif
tags: [axure, tutorial]
---

In version 7, Axure released a tremendously powerful responsive design workflow. I&rsquo;m not going to go through how to set it up, [I highly recommend this tutorial from Smashing Magazine if you&rsquo;re trying to get it going](http://www.smashingmagazine.com/2014/02/creating-responsive-prototypes-with-adaptive-views-in-axure-rp-7/).

Instead, what I&rsquo;m addressing here is a glaring problem I&rsquo;ve seen when I&rsquo;ve shown these responsive wireframes to clients:

## Clients don&rsquo;t know how to find the mobile wires.

Having to tell the client &ldquo;Oh, you need to resize your browser window to see the other versions&rdquo; isn&rsquo;t intuitive to them. Since clients usually aren&rsquo;t web designers, they rarely resize their browser windows just to see how things work in different sizes. From a logical standpoint, the low fi nature of your typical Axure prototype doesn&rsquo;t indicate to a client that they can have a responsive capabilities.

Usually, designers show how the design morphs by copying and pasting the elements to different pages (i.e. *home_mobile* and *home_desktop*.) The challenge with this is it breaks the responsive workflow, and now if you have to make edits at one breakpoint, you have to make sure to edit that in every other responsive view. Not fun.

## A Solution to the unfindable mobile wires:

So instead of copying and pasting, we still need a way to break out the mobile wires onto their own pages, but preferably while maintaining the lovely responsive workflow. We can do this with a rarely used Axure feature, the **Inline Frame**.

An inline frame behaves exactly like an iFrame, and it limits the width of the window to the width of the frame. To show a mobile prototype:

1. **Develop your page structure**: I recommend keeping a base page (so that we can see how everything fits together) and then spinning off child pages for individual breakpoints.
2. **Drag out an inline frame**: Make sure that you are in the `base` view, otherwise it won&rsquo;t be visible at all sizes.
3. **Set the frame target**: The frame target is the page that it will load into the iFrame. Select your `pagename_base` page.
4. **Style frame as needed**: Right clicking the frame allows you to hide its inset border (Yuck.) You can also choose to hide scrollbars, but **beware**, hiding scrollbars is akin to setting <code class="language-css">overflow:hidden;</code>&mdash;and if your frame isn&rsquo;t tall enough it will clip your content.

You can see an [example prototype here](http://wires.glucasroe.com/1JTAR3/#c=2), and you can [download my source file here](http://glucasroe.com/files/rp-files/responsive-wireframes-hybrid-approach.rp).

Here's an explainer gif showing the process I described above:

<img class="gfyitem" data-id="EdibleFlakyBaldeagle" />


## Drawbacks:

The main drawback of this approach is that *inline frames in Axure require you to set a height*. Unfortunately, this means that you either have to set the iFrames to be arbitrarily tall, or you have to go back and check the pages upon adjusting the prototype. Not too painful.
