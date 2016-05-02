---
layout: post
title: 'Getcher Big Boy Pants On: Leaving CloudatCost for DigitalOcean'
date: '2015-02-01 19:12:54'
---

This past weekend I punched the button and changed hosting providers.

When CloudatCost first opened, I was **ecstatic**. I finally had a cost effective way to get started with ghost blogging, and I could learn about system administration. Totally a win win, right?

Because of the one time cost, I wasn't super upset when there were issues. I accepted that I was pretty much on my own, and the first few times that I wrecked my server, I shrugged it off and reimaged. I was ok with a few day response time for 2 reasons:
 
1. It was a personal website, so who cared if it was down.
2. It was extremely cheap.

Now that I'm establishing a presence, this isn't ok. I need uptime, I need stability, and I need to know that I can count on having help if I need it.

#The Last "Event"
A week ago today, January 25, I finally got my secure Ghost box up and running on CloudatCost. I had been working under a severe lack of security  without realizing (more to come on this later) and had finally gotten a secure and stable server up with the help of my friend [Dan](http://dandwire.com/). I went to go move over my data from my old box, and it was down.

By down I mean that it refused all external connections, even from the CloudatCost control panel. Restarting the server caused the control panel to crash, usually for upward of half an hour. The CloudatCost site said that they had a group of SSDs fail, and that they were replaced and everything should be fine. It took 6 days to be fixed.

In those 6 days, I submitted a ticket. The ticket initially would be responded to in about 5 hours with some promise of the panel being up the next day or that evening.

![A conversation with a tech](/content/images/2015/02/Screen-Shot-2015-02-01-at-13-15-57-.png)

I don't mean this to beat up on their techs, my conversations with them have always been cordial, but bluntly they have a nonexistance SLA. This sort of failed promise has happened every time I've had an issue.

Eventually, I stopped receiving responses to my ticket and resorted to emailing the supportescalations@cloudatcost.com email address. This is where I received my final confirmation that the problem was fixed on Saturday the 31st. My ticket is still open.

#What is CloudatCost good for?
CloudatCost **is not good for things you need to rely on**. Experiments, new things, weird stuff, sure go ahead. If you're planning on relying on it though, CloudatCost isn't a good idea. If you'd like an example, just try [searching CloudatCost on Twitter](https://twitter.com/search?q=cloudatcost&src=typd) and see the responses. It doesn't look like they bother with their Twitter account responses - it would be too much work!

#Why DigitalOcean?
As I was going through the process of setting up a secure server, I repeatedly referenced DigitalOcean's articles. They're well written and helpful articles, and I could see that they bring a lot of expertise and professionality to their product. Their lowest level service is only $5 a month, certainly reasonable for a site of my size.

I was able to setup an Ubuntu box with ghost in 3 clicks, and it was setup in a way that made it easy to work with (nginx and Ghost installed as services and good tutorials to cross the final barriers). Server images, reinstalls and destructions are snappy and consistent. I've been literally hopping up and down with excitement, to the amusement of my wife.