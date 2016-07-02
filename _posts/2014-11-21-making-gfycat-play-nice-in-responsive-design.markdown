---
layout: post
title: Making Gfycat Play Nice in Responsive Design
date: '2014-11-21 04:35:41'
tags: [dev, tutorial]
image: posts/imported/2015/12/gfycat-responsive-design.png
---

When writing tutorials, mini animations can save a lot of time and overexplanation. In my [first Axure tutorial](http://glucasroe.com/onscrollup-and-onscrolldown-in-axure/), I used some screen recordings to walk through some of the most complex pieces of the process.

I could have just uploaded some videos, but having a looping gif is nice because repeats so someone reading can watch the tutorial happen repeatedly and get the gist of what's happening without requiring any interaction.

To save on bandwidth and give the user more control, I opted to go with [Gfycat](https://gfycat.com/). The [javascript embed](http://gfycat.com/about#embed) is very easy to set up and serves different files to different browsers, so it sounded perfect... right?

**Side note**: For recording gifs I have 2 recommendations for Mac Users: [GifGrabber](http://www.gifgrabber.com/) for fast, simple, and short and then I use Quicktime Screen recordings for longer things.

## Gfycat Don't Play Nice.
When they're standalone, the gfycat pieces seem to work just fine. As soon as I put them in my template however, the display went haywire and it broke my mobile site. Here are the things that I did to make it work, written in SCSS
```language-scss
div.gfyitem {
    width:100%;
    div:not(.gfyCtrlBox):not(.gfyCtrlTabPull){
        width: 100% !important;
        max-width:100% !important;
        height: auto !important;    
        .gfyPreLoadCanvas{
            display: none;
        }
        video{
            position:relative !important;
            height: auto !important;
            margin-top: 0;
        }
    }
    .gfyCtrlBox{
        margin-bottom:10px !important;
        .gfyCtrlPause, .gfyCtrlReverse, .gfyCtrlSlower, .gfyCtrlFaster{
        width:15px;
        height:15px;
        margin-top:0;
        display:inline;
        }
    }
    .gfyGif{
        position:relative !important;
    }
}
```
* `div.gfyitem{width:100%;}` Gfycat starts by throwing in a div with this class.
* `div:not(.gfyCtrl...){width: 100% !important; max-width:100% !important; height: auto !important;}` Inside of the gfyitem div, it puts a div with no class with a lot of inline styling including absolute values for height and width. This is what was breaking my mobile site. My friend and coworker [Matt Geiger](https://twitter.com/Mgeiger410) suggested using `!important` rules to overwrite the inline styling. It worked beautifully even though it feels gross
* `div:not(.gfyCt...) .gfyPreLoadCanvas{display: none;}` I'm not thrilled about this, but the preload canvas couldn't be set in size without more javascript and I didn't want to take the risk of conflicts.
* `div:not(.gfyCt...) video{position:relative !important; margin-top: 0;}` Many of gfy's elements are absolutely positioned, so this helps make sure they're still playing nice now that we're breaking it's build method. The `margin-top:0;` is only because I recently converted to [axiomatic css](http://alistapart.com/article/axiomatic-css-and-lobotomized-owls)
* `.gfyCtrlBox{margin-bottom:10px !important;}` This also feels gross, but the pull tab wasn't aligning. You can't set a `bottom` value on it because gfycat animates it to slide the pull drawer in and out. Your mileage may vary.
* `.gfyCtrlBox .gfyCtrlPause,...{width:15px; height:15px; margin-top:0;` These tiny controls don't seem to have their width and height set correctly, so my `img{width:100%;}` site rule was causing them to break and look horrible. This fixed it!
* `.gfyGif{position:relative !important;}` When it detects a mobile browser, gfycat will drop in a absolutely positioned gif instead of a video, depending on what the browser supports. Many thanks to The Curb for pointing this out in the comments.

Enjoy your responsive gfys

<img class="gfyitem" data-id="BrokenCalculatingBluefintuna" />
*This one isn't mine, I just thought it was pretty.*
