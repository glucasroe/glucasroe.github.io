---
title: 'The Axure Panel Exploder'
date: '2016-05-05 05:34:34'
---
Axure began as a tool to create functional specifications, and over time it pivoted slooowly to be its current interactive prototyping powerhouse. Interestingly, the better it becomes at prototyping, the more that the functional specs seem to lag by the wayside.

In early March, a reader reached out to me and asked if I had played at all with extending Axure's functional specification output. After I admitted that I hadn&rsquo;t, he proposed an interesting idea: What if you could layout each state of a dynamic panel in the browser so developers could see all possible states for it? Here are the screenshots they sent me:

![](/images/posts/imported/2016/03/pasted_image_at_2016_03_01_04_53_pm.png)
![](/images/posts/imported/2016/03/pasted_image_at_2016_03_01_04_54_pm.png)

Through some suggestions from him and a hell of a lot of experimenting from me, we actually made a plugin that accomplishes the majority of what we were looking for.

# The Plugin:
Are you looking to use the plugin yourself? [Check it out on github](https://github.com/glucasroe/Panel-Exploder). Use it by copying and pasting the code from [plugin.html](https://github.com/glucasroe/Panel-Exploder/blob/master/plugin.html) into an Axure plugin.

Here&rsquo;s a little screencast:
![](/images/posts/imported/2016/03/panel-exploder.gif)

# How it Works:
First, we lay out the CSS (so that we don't get a flash of unstyled content) and the HTML. The HTML consists of a div to hold all of the toggles (Which will overlay the prototype) and a a modal to show the panel in.

Next, we place the toggle buttons, so we iterate over every panel in the prototype and check if it has multiple states. If it does, we insert a toggle into the toggles div that is positioned over the panel.

### Why not just inject toggles directly into the panels?
Oh boy howdy did I try. Apparently, Axure keeps track of each individual element when handling things like hiding and showing, so consequentially it flips the table if you try to mess with its DOM after it has built the page. Consequentially, I needed a way to add the toggles to the page *without* adding any new elements into the actual panel structure. Pseudoelements seem attractive until you realize that there is not way to target them with JS. Initially I just overtook the natural JS function, but I wanted the dynamic panels to function normally unless you clicked on the toggle itself.

```js
//1: Build the annotations
//  1.1: Create Annotation Template
//  1.2: For each panel, place template
    panel.each(function(){ //Loop over panels
        if ( $(this).children('.panel_state').length > 1) { //If panel has more than one state
//    1.2.2: String manipulate to set ID
        panelID = $(this).attr('id'); //Get
        toggleID = panelID + '--toggle';
```

The string manipulation of the ID is how we figure out which panel to target when we click on a toggle, but we append `--toggle` to it so nothing explodes.

```js
//    1.2.1: Duplicate template
        toggles.append('<input type="button" value="+" class="exploder__toggle" id="' + toggleID + '"></input>');

//    1.2.3: Measure panel placement
//      1.2.3.1: Get panel x + y
        panelPosition = $(this).position();
        toggleTarget = $('#'+ toggleID);
        toggleX = panelPosition.left;
        toggleY = panelPosition.top;

//    1.2.4: Apply values to template instance
      toggleTarget.css({ top: toggleY + "px", left: toggleX + "px"});
    }
    });
```

We then position the toggle based off of the panel position. Also, if you&rsquo;re a real Javascript developer and my method of handling variables makes you want to claw your eyes out, I understand.

```js
//2: Show and hide functions
//  2.1: Initialization
    if(window.top != window.self){
      toggles.addClass('exploder--hidden');
    }
}
```

The main goal here is to figure out if the content is framed in. If it is, we don&rsquo;t immediately show the toggles so it is configurable. Otherwise, we show the toggles so that if you navigate directly to a prototype page, you still have options.

```js
//  2.2: Listen to changes
    $axure.internal(function($ax) {
      $ax.messageCenter.addMessageListener(function(message, data) {
          if(message == 'highlightInteractive') {
            //  2.3: Show elements
              if(data == true){
                toggles.removeClass('exploder--hidden');
              }
              if(data == false){
                toggles.addClass('exploder--hidden');
              }
          }
      });
    });
```
Because the viewer operates through an `iFrame`, Axure uses this `messageCenter` library to keep track of functions passing between the viewer and its frame. Here, I hook into the `highlightInteractive` function so that it will hide and show along with the interactivity glow. It will pass a `message` (Usually highlightInteractive or showAnnotation) along with a `data` variable that serves as a boolean toggle.

```js
//3: Explode Panel
    //  3.1: String manipulate to target panel ID
    $('.exploder__toggle').click(function(){
      toggleID = $(this).attr('ID');
      panelID = toggleID.substr(0, toggleID.length-8);
      targetablePanel = $('#' + panelID);
      clonedPanelID = panelID + '--cloned';
```

First, we get the toggle ID. Then we chop off `--toggle` and turn it into a jQuery object so we can target it.

```js
    //  3.2: Copy panel contents into viewer window
      targetablePanel.clone().removeClass('pulsateBorder').attr('id',clonedPanelID).appendTo(modal);
```

Here, we grab our targetted panel, strip the glowing border, set its ID so that its `panelID--cloned`, and shove it into the modal.

```js
    //  3.3: Sort states to be in correct order
     panelState = $('.exploder__modal .panel_state');
     panelInstance = $('.exploder__modal .ax_dynamic_panel');
     panelState.each(function(){
       simpleID = $(this).attr('ID').split('state').pop();
       $(this).attr('ID',simpleID);
     });
     panelState.sort(function(a, b) { //shamelessly ripped from http://stackoverflow.com/a/21267434
       return parseInt(a.id) - parseInt(b.id);
       }).each(function() {
         var elem = $(this);
         elem.remove();
         $(elem).appendTo(panelInstance);
       });
```
When you click a dynamic panel, if the dynamic panel state shifts, Axure will reorder the states inside of it. For instance, if you initially have states `1` `2` `3` and you click it, the order will now be `2` `3` `1`. This makes sense for a display viewpoint, and is really dumb looking when the panel is exploded.

First, we iterate over the states and reset their IDs to be a simple number. Their naming convention is `panelID + _state + number` or by way of example `#u0_state1`. For each state, we split it at the `state` pattern, pop the number off at the end, and set that number as the state&rsquo;s ID to give us integers.

<aside>Here&rsquo;s the part where you can tell that I&rsquo;m a <strong>real</strong> developer</aside> Then, using a script that I totally didn't write and copy and pasted from StackOverflow, we sort the states and throw them back into the panel.

```js
    //  3.4: Label States
      panelName.text(targetablePanel.attr('data-label'));
      panelState.each(function(){
        $(this).before('<h2 class="modal__stateName"></h2>');
        $(this).prev('.modal__stateName').text($(this).attr('data-label'));
      });
    //  3.5: Display viewer
      modal.removeClass('exploder--hidden');
    });
```

Whenever you name something in Axure, that text is actually injected into the prototype, usually in the form of a `data-label`. Bless the developers of Axure for doing this. This is how we set the title of the panel, and the title for each state.

```js
//  3.5: Display viewer
      modal.removeClass('exploder--hidden');
    });
    //4: Close Modal
    closeButton.click(function() {
    //  4.1 Hide viewer
      modal.addClass('exploder--hidden');
    //  4.2 Delete children
      panelInstance.remove();
    });
  });
```
Finally, these are just functions that show and hide the modal. Why these are currently done as negatives and not positives currently eludes me. We also delete the panel instance from the modal upon close so that it doesn&rsquo; stack up too much.

# To Do:
Currently, there isn&rsquo;t a way to use notes on the elements that are exploded. So far, the javascript that constructs the data eludes me, despite having spent an embarrassingly long time digging through the Axure build files. If any expert JS person or Axure aficionado wants to help me figure that out, I&rsquo;m all ears.
