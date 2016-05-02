---
layout: post
title: Using XMind for Information Architecture
date: '2015-11-24 22:47:42'
---

I spent about two years looking for an IA tool that worked for my process and my mental model. It was a pretty short list:

1. Draw elements based off of a data model. (i.e. don&rsquo;t draw a chart from my data and then not update it with the data)
2. Allow me to take notes on it.
3. Allow me to drag and drop data fragments so I can sort things easily.
4. Chart out my data from Excel without requiring me to reformat all of my data.

The day that I found [XMind](https://www.xmind.net/), I lost my mind a little bit.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/GLucasRoe">@GLucasRoe</a> AND YOU CAN PASTE BACK INTO EXCEL?! AND YOU CAN AUTOMATICALLY NUMBER AND YOU CAN DRAG AND DROP AND ANNOTATE AND... ::passes out::</p>&mdash; G. Lucas Roe (@GLucasRoe) <a href="https://twitter.com/GLucasRoe/status/634060624583106560">August 19, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Here&rsquo;s some tips on using it for IA.

##Entering Data in XMind:
As I noted above, XMind allows you to copy and paste structures from Excel. Indicate children by indenting a level. Here&rsquo;s a little explainer gif:

![XMind Data charting](/content/images/2015/11/xmind-charting.gif)

You will want to keep this limited to around **500 items at a time**. Every time you move things around in the tree, it redraws the entire structure which can make for some brutal lag. Get around this by pasting in a few hundred, collapsing the new tree, and then pasting in more.

![Collapsing elements](/content/images/2015/11/collapse-in-xmind-optim.gif)

I&rsquo;ve taken to just entering things directly in XMind because it cuts a step out of the process. Here are the shortcuts you will want to know:

* `F2`: **Edit** the node you have selected (Or just start typing to overwrite it)
* `F3`: **Label** the node. A label is a note that is always visible
* `F4`: **Open** the notes panel. A note is a more indepth, rich text annotation that isn&rsquo;t always visible.
* `Return`: **Create** a new node as a **sibling** of the node you have selected
* `Tab`: **Create** a new node as a **child** of the node you have selected
* `Arrow Keys`: **Navigate** the tree. Useful when you&rsquo;re done with siblings and you need to go back to the parent.
* `/`: **Collapse** all of the elements under the selected node.
* `*`: **Expand** all of the elements under the selected node.
* `Command/Control + L`: **Create relationship**, or an arbitrary line between 2 nodes.

##Organizing Elements:
You can reorganize elements in XMind by dragging and dropping them. Here&rsquo;s a few considerations though.

* <del>**Arrange your floating topics far away from each other**: Topics like to be children of other topics, so when you drag a node out of a tree, it&rsquo;s going to try and attach itself to the nearest floating topic. This behavior is pretty aggressive, so it&rsquo;s best to give yourself a lot of wiggle room.</del> **UPDATE**: It turns out you can turn off this aggressive snapping behavior by holding shift! [XMind help article about this](https://xmind.desk.com/customer/en/portal/articles/673090-how-to-move-topics-freely-).
* **Use Summaries and Boundaries**: Summaries and Boundaries are meta sections that you can attach to multiple nodes to comment on them as a group. A summary uses a large bracket, while a boundary surrounds the content with a shape.

##Exporting Data from XMind:
XMind allows only a few types of exports on their free version, text and HTML. The html version uses html headers to define the indenting, so it works for a visual display, but not much else.

I&rsquo;ve been using Sublime Text as a way to get a more flexible output (especially as nested bullets) by saving it as a markdown file. This doesn&rsquo;t capture your notes or relationships (the link lines) - but it is still useful for a general structure.

Here are the steps:

1. Copy all nodes from XMind
2. Paste into Sublime Text and Select All
3. Split cursor to lines (**Command + Shift + L**)
4. Jump to beginning of the line (**Command + Left Arrow**) and enter in asterisks.
5. Save as an MD file.

![Converting Xmind to bullet points](/content/images/2015/11/xmind-markdown-optim.gif)

##XMind 7 New Features:
XMind 7 added some really interesting new features! Unfortunately, they are on the paid tier, so I haven&rsquo;t tried any of them out yet. I certainly will in the future, and may update this as my experiences with it change.