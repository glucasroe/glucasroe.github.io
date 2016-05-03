---
layout: post
title: A Taxonomy of Prototyping Tools
date: '2015-12-07 14:26:56'
---

On [Designer Hangout](https://www.designerhangout.co/), I moderate one of the more popular channels, `#resources_tools`. With the glut of new prototyping tools that have been released this year, I&rsquo;ve found myself grouping them into quick categories so I can talk about them more easily (and understand where the new things fit in.) I&rsquo;ve been working on a project to better explore this range of tools (In the same vein as [Cooper&rsquo;s work on this](http://www.cooper.com/prototyping-tools))&mdash;but it&rsquo;s also useful to have a vocabulary to talk about these different tools. 

<div class="anchor-links">
<a href="#definition">Definition</a>
<a href="#taxonomy">Taxonomy</a>
<a href="#future-tools">Future Tools</a>
<a href="#contributions">Contributions</a>
</div>

# Definition:
What is a prototyping tool though? Here are the criteria that I&rsquo;m using:

1. **It isn&rsquo;t for production**: You won&rsquo;t find any comparisons of rapid development frameworks here like Unity. You won&rsquo;t find a debate of Sketch vs. Photoshop. A prototype is a rudimentary proof of concept, and we are focusing on tools that generate that.
2. **It is focused on visual and conceptual design**: These are not tools for IA or diagramming, although they frequently can be used for these purposes. These tools are focused on UI design and the flow of interfaces.
3. **They are meant for demonstration**: They are not focused on only documentation, but on demonstrating functionality and thought process.
4. **It isn&rsquo;t a library**: There are some fantastic libraries to help you prototype in your existing graphics tool. We won&rsquo;t be talking about those.


# Taxonomy:

We&rsquo;re going to go in a rough order from lowest fidelity to highest fidelity. Examples are listed in the order they come to mind, and shouldn&rsquo;t be treated as a ranking of products.

## Drawing Tools

* **Examples**: [Balsamiq](https://balsamiq.com/), [wireframe.cc](https://wireframe.cc/), [Precursor](https://precursorapp.com/), [Lucidchart](https://www.lucidchart.com/), [Pencil](http://pencil.evolus.vn/), [Omnigraffle](https://www.omnigroup.com/omnigraffle), [Gliffy](https://www.gliffy.com/), [Mockflow](https://mockflow.com/#wireframe), [Moqups](https://moqups.com/), [Mockplus](http://www.mockplus.com/)
* **Description**: Drawing tools are used for the production of static wireframes. They usually differentiate themselves with a combination of collaborative features (**Precursor**), prebuilt interface libraries (**Balsamiq**, **Gliffy**, &amp;**Mockplus**), hosted projects, and occasional click through functionality (**Balsamiq** &amp; **Mockplus**.)
* **Use**: Drawing tools are typically focused on getting an interface representation produced as quickly as possible. They are simple tools that are meant to show visual ideas quickly, and are a step above sketches.
* **Benefits**: Speed. These tools are all about getting feedback on ideas, and doing it quickly. Interface libraries can drastically speed up the drawing process. They usually have a low level of visual fidelity, so stakeholders aren&rsquo;t caught up on the look and feel.
* **Drawbacks**: Whenever I see a new one of these, I sarcastically comment &ldquo;You can only draw boxes so quickly.&rdquo; In the end, many of these can be replaced with a graphics program, a wireframe library, and a project planning solution.
* **Notes**: Anecdotally, it seems like **Balsamiq** &amp; **Omnigraffle** have the largest followings. You can also find examples of wireframing libraries for programs like **Sketch**, **Illustrator**, and **Photoshop** (of course.)

## Hotspotters (or Clickthrough Tools)

* **Examples**: [InVision](http://www.invisionapp.com/), [Marvel](https://marvelapp.com/), [POP](https://popapp.in/), [Flinto](https://www.flinto.com/)  (Browser Version), [Solidify](http://www.solidifyapp.com/), [Composite](http://www.getcomposite.com/), [Prott](https://prottapp.com/)
* **Description**: Hotspotters create a prototype from existing graphics. You draw interfaces in a graphics program (or by hand) and link them together in a web interface. The term &ldquo;Hotspotter&rdquo; comes from the way that you add interactivity, by drawing clickable areas on top of your graphics.
* **Use**: Hotspotters can be used for a wide range of prototypes, from initial sketches to hi fidelity final interfaces. They are designed to quickly link together screens, and will typically roll in some sort of feedback functionality. They may integrate animated transitions, fixed headers, and other similar non functional features to indicate interactive patterns.
* **Benefits**: Once you have produced graphics, hotspotters are very fast. They allow you a wide range of fidelity, and integrate to existing processes fairly easily. Being browser based, they all are easy to share with colleagues and they frequently add robust feedback systems to collect comments on the designs.
* **Drawbacks**: Hotspotters are limited in very arbitrary ways. Because you are linking together static graphics, there are hard limitations on what you can do and what you can show. They do not allow any sort of text entry or on screen interactivity. (I see people regularly asking &ldquo;How do I make this animation in **InVision**?&rdquo; and the answer is frequently &ldquo;It&rsquo;s impossible.&rdquo;)
* **Notes**: **InVision** has expanded their product suite, but hotspotting is still the core of their business. Both **InVision** and **Marvel** have desktop applications to help you get screens into the webapp more quickly and easily.

## Animation Tools
* **Examples**: [Principle](http://principleformac.com/), [After Effects](http://www.adobe.com/products/aftereffects.html), [Keynote](http://www.apple.com/mac/keynote/), [Animatron](https://www.animatron.com/)
* **Description**: Animation tools are focused around timeline based animations. They may allow some interaction, but their output is typically a movie (in GIF or video form) that shows the intended animation.
* **Use**: Animation tools are typically used to show [microinteractions](http://microinteractions.com/what-is-a-microinteraction/). They usually show an example of the user interacting instead of allowing the viewer to interact directly with the prototype.
* **Benefits**: Because the output is just a video, there is almost an infinite amount of flexibility with what you can create. **Principle** &amp; **Tumult Hype** are both relatively quick to learn, so you can craft these short videos very quickly. **After Effects** offers you an incredible amount of power, but it does have a steep learning curve.
* **Drawbacks**: Because of the output, they aren&rsquo;t suited to prototyping an entire application. You would still need some sort of external program or service to put the microinteractions together into a cohesive whole. They end up being much more of documentation instead of demonstration.
* **Notes**: **Keynote** has a rabid following that uses it for all sorts of purposes (It is frequently used as a drawing tool or even a hotspotter)&mdash;but I frequently see it used as a way to create animations quickly. Also, the grand majority of the super pretty UI animation you see on Dribbble is created with **After Effects**.
* **Tutorials**: [Design in Sketch, Animate in Keynote](https://medium.com/@_jshmllr/design-in-sketch-then-animate-in-keynote-c7f40e59f8f8#.n8z943nm8) via [Josh Miller](https://twitter.com/@_jshmllr)

## Interactive Prototyping Tools

* **Examples**: [Axure](http://www.axure.com/), [JustInMind](http://www.justinmind.com/), [UXApp](https://www.ux-app.com/), [proto.io](https://proto.io), [UXPin](https://www.uxpin.com/), [HotGloo](http://www.hotgloo.com/), [Atomic](https://atomic.io/), [Antetype](http://www.antetype.com/), [Picodo](https://pidoco.com/), [FluidUI](https://www.fluidui.com)
* <p>**Description**: Interactive prototyping tools combine an interface drawing feature with some form of protocoding. They focus on creating high fidelity interactions, and will usually provide different types of interaction (Swipes, clicks, holds) and methods of sharing the final product.</p><p>These products have a range of fidelity and speed and there is a lot of feature variance in this category. **Axure** &amp; **JustInMind** are desktop tools with a lot of quirks but robust features. **UXPin** &amp; **UXApp** have libraries of prebuilt interfaces for speed. **Atomic** &amp; **proto.io** have rich, timeline animation features. **UXApp** has an easily understood visual code editor. **Axure** has a detailed note taking feature that allows you to output rough functional specifications.</p>
* **Use**: These tools are typically used to test more detailed interactions, or frequently to sell work at agencies. While each of them can be used to draw rudimentary wireframes, typically the focus is on creating more detailed interactivity. They also tend to have a wide range of output, which means they can be used for testing in both mobile and desktop settings.
* **Benefits**: These tools are useful for testing a wide range of ideas, from basic interface structures through complex animations. They are wonderful for showing specific ideas in a shorter period of time than creating the prototype in situ would *usually* take. They can create a stunning range of functionality with relative simplicity.
* **Drawbacks**: These products typically suffer from getting mired in prototype hell&mdash;where designers spend far too much time fiddling with the functionality and not enough time talking to people. They can have a steep learning curve and dozens of individual quirks to be remembered and planned for. Many detractors say that you would be better off just creating something in code (They have a good point.)
* **Notes**: **Axure** has a lot of users, but much of the community seems to have died off mysteriously before version 7 was released. Of the others, **UXPin** and **Proto.io** are the two I hear about the most.

## HTML5 Production Tools:
* **Examples**: [iAD Producer](https://developer.apple.com/iad/iad-producer/), [Google Web Designer](), [Tumult Hype](http://tumult.com/hype/), [Edge Animate](http://www.adobe.com/products/edge-animate.html)
* **Description**: HTML5 production tools are tools that blend together a visual HTML editor with interactive and animation features. While they&rsquo;re intended use is to produce ads to be served across mobile platforms, their acceptance of interactions and sophisticated animation tools means that they can be repurposed to prototype tools.
* **Use**: These tools work best in an environment that is creating web native applications, and where there is already a defined graphical workflow. Interface elements and graphics would be produced in another program, before being imported to the tool and linked together into interfaces. Different screens would be created as *scenes* which the user would transition between.
* **Benefits**: Native technologies means that there aren&rsquo;t many things that you can do in these programs that can&rsquo;t be reproduced in a production environment. These tools also tend to offer a preview mode that ties them closely to the browser, letting you test your interactions and animations in multiple environments. Being web native means that you can also insert your own HTML, CSS, or Javascript pretty easily into these prototypes if you just want to knock something out manually.
* **Drawbacks**: The biggest drawbacks of these tools are workflow related. They generally don&rsquo;t allow you to create graphics inside of them, so you would need to be importing assets from another program. All of these programs are fairly obscure as well, so it can be hard to find support or tutorials if you&rsquo;re stuck. The output from these tools are usually heavily layered `canvas` elements, so while they&rsquo;re technically accessible and reusable, the final output is difficult to break apart. Finally, since the output of these tools is a flat file, you will have to host and distribute them manually.
* **Notes**: There is a fairly blurry line between these tools and animation tools, the main differentiation is the outputs.
* **Tutorials**: [Prototyping with iAd Producer](http://www.lindadong.com/blog/prototyping-with-iad-producer) via [Linda Dong](https://twitter.com/lindadong).

## Website Builders
* **Examples**: [Webflow](https://webflow.com/), [Macaw](http://macaw.co/), [Wix](http://www.wix.com/), [Pingendo](http://pingendo.com/), [Squarespace](http://www.squarespace.com/), [Weebly](http://www.weebly.com/), [Adobe Muse](http://muse.adobe.com/), [Webydo](http://www.webydo.com/), [Bootstrap Studio](https://bootstrapstudio.io/)
* **Description**: Website builders are meant to produce production level websites, usually for small businesses or individuals. However, they can also be used to simulate more complex functionality, and can prototype everything from native apps to e-commerce websites.
* **Use**: While you can create simple colors, shapes, and typography in website builders, the majority of your resources would still be created in some sort of graphics program. They typically allow light functionality and CSS generated transitions. They will offer templates with varying degrees of flexibility, depending on which platform you are working in.
* **Benefits**: If you are creating a website or webapp, the final product could be very similar to your prototypes. While they aren&rsquo;t incredibly fast to create, website builders can be used more easily and with less training than coding. Because they are designed to be used on the web, they are usually very easy to share with others.
* **Drawbacks**: The biggest drawback is the limitations of the platforms. Due to the structure of a WYSIWYG editor, the designers and developers need to limit the available options in order to produce efficient and reasonable code. Even though you are creating in a web native environment, the code and animations are likely not suitable to be exported directly into production (and most of these tools are not likely to turn over the code to you without complaint, it&rsquo;s their business model!)
* **Notes**: **Pingendo** and **Bootstrap Studio** are specifically for using Bootstrap, so while they might be speedy for specific things, they are even more limited than the other tools in this category. **Wix** &amp; **Squarespace** aren&rsquo;t quite as suited to the prototyping because of their subscription models. **Macaw** & **Pingendo** are desktop applications, which would export the code by default, therefore not requiring you to host on a platform of theirs.
* **Tutorials**: [Wireframing and Prototyping with Muse](https://web.archive.org/web/20150426045007/http://supersteil.com/blog/456/wireframing-and-prototyping-with-muse) via [Mark van der Poel](https://twitter.com/markvdpoel)

## Mobile Native Prototyping

* **Examples**: [Pixate](http://www.pixate.com/), [Form](http://www.relativewave.com/form/), [Origami](https://facebook.github.io/origami/) (Built on [Quartz Composer](http://quartzcomposer.com/)), [Avocado](https://github.com/ideo/avocado) (Built on Origami), [Flinto for Mac](https://www.flinto.com/mac) (Not to be confused with Flinto for Web), [Framer Studio](http://framerjs.com/), [Creo](http://creolabs.com/creo), [Creator](http://ionic.io/products/creator), [Noodl](http://www.getnoodl.com/)
* **Description**: Mobile Native Prototyping tools are used to generate prototypes for mobile devices that utilizes their native code languages. They are not graphics programs, and need to have graphic resources imported. They are very typically Mac based (Many of them rely on the Quartz Composer libraries) and they frequently utilize the Visual Programming Language of QC.
* **Use**: Mobile Native Prototypes are most useful for companies that are developing a mobile application as their main line of business. They allow semi-technical designers to try out ideas in technologies that are very similar or identical to what is available in the final production versions. Because they produce proto-applications or utilize app viewers, they aren&rsquo;t as easily shared and distributed as other prototyping tools.
* **Benefits**: The key benefit of these tools is they operate inside of the space of possibilities for native apps. Other prototyping tools typically use hacky code to produce their animations and transitions, which can be hard to replicate in production versions. They also theoretically have the ability to output animations and other functionality to be used by developers. I haven&rsquo;t seen this in production, so I&rsquo;m shy to give it a ringing endorsement. Of the options listed here, these animations and interaction patterns are the most robust, and aren&rsquo;t likely to break in a testing environment like some of the interactive prototyping tools.
* **Drawbacks**: These tools typically have very steep learning curves. While **Flinto** &amp; **Pixate** are simpler, they are still complex and can take a lot of training to master. While they could be used to mock up desktop interactions, they really are suited for mobile app work. They are much harder to share than other sorts of prototypes, which make them more suited to an in house environment. Most of them are not cross platform, and tend to work with iOS devices only.
* <p>**Notes**: **Pixate** &amp; **Form** were both acquired by Google recently, which freaked out a lot of anti Googlers.</p><p>Also, a note on **Framer**. It doesn&rsquo;t fit perfectly into this category, but due to learning curve and output, it seems most appropriate here. **Framer.js** is a free javascript library that enables rapid prototyping. **Framer Studio** is a paid Mac program that builds in importing, previewing, and help with the framework. Framer code is written in CoffeeScript, a preprocessed, whitespace dependent language that transpiles to Javascript. Its output isn&rsquo;t device specific like the other programs in this category, and probably can&rsquo;t be repurposed because of its build methods. However, because they are rendered in a browser, Framer prototypes are more easily shared and can be used for a wider range of devices.</p>

<!-- ## Headline
* **Examples**:
* **Description**:
* **Use**:
* **Benefits**:
* **Drawbacks**:
* **Notes**:-->
# Future Tools:
With the tremendous growth of prototyping tools in the past year, it&rsquo;s interesting to see how easily they can be grouped with other tools that preceded them. Hopefully, this taxonomy is flexible enough that it can be used to cover a wide range of future tools and give us the ability to better compare amongst the incredible range of options we have. Here are some of the future tools that I&rsquo;m watching, and where I think they&rsquo;ll fit in the taxonomy.

* **[Silver](http://silverflows.com/)**: Silver is a addon for Sketch that allows you to link together artboards and test it on a device. It seems like it will operate most similarly to a hotspotter, but due to some of the features, it may be more of an interactive prototyping tool. **Silver** is currently in private beta, and will be launching a public beta &ldquo;very soon.&rdquo;
* **[Project Comet](http://landing.adobe.com/en/na/products/creative-cloud/comet/229818-notifyme.html)**: This is Adobe&rsquo;s foray into the space, which they bill as a &ldquo;all in one solution for UX designers&rdquo; (forgive me for rolling my eyes, but hey, gotta hit that buzz word!) **Project Comet** seems most like an interactive prototyping tool to me, but it may incorporate some elements of mobile native prototypes. We&rsquo;ll see in 2016!

# Contributions:
Feel like something is missing or want to make any suggestions for this article? Feel free to <a href="mailto:lucas@glucasroe.com?subject=Prototyping%20Tool%20Taxonomy%20Suggestion">send me an email</a>! You can also leave a comment below.

### Changelog:
* **2016/02/22**: Added FluidUI to Interactive Prototyping Tools. It seems almost like a mobile native prototyping tool, but it doesn't look like its outputs are similar enough.
* **2016/02/15**: Added Composite and Prott to Hotspotters. Found on [UX Design Weekly&rsquo;s prototyping tool list](http://uxdesignweekly.com/ux-resources/prototyping-tools/). Added Bootstrap Studio to web builders. Recommended by [Sonali Agrawal](https://twitter.com/sonaliagrawal) on the #resources_tools channel.
* **2016/02/11**: Added Noodl to Mobile Native Prototyping. Recommended by Tim Martens.
* **2016/01/27**: Reorganized some animation tools into a new category, HTML5 Production Tools. Added Google Web Designer and iAd Producer into the new category.
* **2016/01/26**: Added Animatron to Animation Tools and Mockplus to Drawing Tools.
* **2016/01/21**: Added Webydo to Website Builders.
* **2016/01/19**: Added Creos and Creator to Mobile Native Prototyping.
* **2015/12/09**: Adobe Muse added to Website Builders. Recommended by [Volodymyr Bondaruk](https://twitter.com/wladi) on the #resources_tools channel.
* **2015/12/07**: Published.
