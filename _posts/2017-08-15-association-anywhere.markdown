---
layout: post
title: 'Project: Association Anywhere—Version 8'
date: '2017-08-15 05:34:34'
tags: project
read: 4:43
---

While I worked at ACGI, whenever I would meet someone and that would ask what I did, I glazed a lot of eyeballs. After running through what it means to be a UX Designer, we would start talking about the work that the company did&mdash;making association management software. Professional associations run pretty similarly to other businesses or organizational bodies, but they typically do so with few resources for all of the myriad functions they need to put on. ACGI created the nerve center for these organizations, a sprawling product called "Association Anywhere" that managed almost every aspect of an associations existence.

Our task was to launch the 8th iteration of Association anywhere, a complete overhaul of the system's user facing navigation. We had from when I was hired in August until the user conference that next Spring.

**Note**: ACGI doesn't release screenshots of their system publicly, so you aren't going to see any here.

<div class="anchor-links">
    <a href="#evaluation">Evaluation</a>
    <a href="#structure">Structure</a>
    <a href="#testing-and-refinement">Testing and Refinement</a>
    <a href="#outcomes">Outcome</a>
</div>

#### Overview:

* **Company**: <a href="https://www.acgisoftware.com/">ACGI Software</a>
* **Collaborators**: Greg Reich, Head of Product. Alan Moore, UX Developer. Also, a ton of great developers on the ACGI Team.
* **Technology**: Oracle Database

## Evaluation

When I started at ACGI, we had a prototype that had been languishing in the company for a while. The prototype was a navigation overhaul, collecting together a lot of various types of navigation from throughout the system into a single tree structure. It was a huge improvement just through consolidation, because new users now didn't have to memorize which navigational structure came from which place. This had an added benefit of clarifying the hierarchy between the different levels of navigation in the interfaces, more clearly differentiating the switch view (Which moves users between different tables of a record) and actions (Which could apply to the record as a whole, or to the individual page). Now instead of wandering all over the page looking for navigation, the user had the ability to just move left to right as they narrowed their scope and specificity.

<figure>
    <img alt="Wireframe of the navigational setup before" src="/images/posts/aa/aa-navigation-before.jpg" />
    <figcaption>The rough structure of the navigation before the redesign</figcaption>
</figure>

<figure>
    <img alt="The basic structure of the redesign" src="/images/posts/aa/aa-navigation-after.jpg" />
    <figcaption>The basic structure of the redesign</figcaption>
</figure>

We began with a thorough heuristic evaluation of the prototype alongside of the broader product, which surfaced a lot of opportunities for small wins and gave us a solid baseline for the goals  we wanted to accomplish over the next few months. Version 8 would also be a major technology change for the software, so we had to walk into it with smart intentions and be prepared to move fast. ACGI is an agile-ish shop, and so we had a clear knowledge of how much work we could accomplish and in what sort of time frame.

The heuristic evaluation gave us a strong ability to prioritize changes, giving us a better baseline product to test against. Many of the changes that came out of the heuristic review were relatively simple, straight-forward solutions. Others were more difficult, but that early process gave us the ability to plan on those changes in the future.

## Structure

Improving the product was our #1 goal, but we also wanted to set up the company to do good work faster and with less effort in the future. That was only going to come about by creating a scaffolding for us all to use, in both concept and technology.

I started with a detailed breakdown of our design system in Confluence, giving detailed guidelines on what elements to use and when, and establishing an overall design system for the company. Because of the technology we were using, this system was largely documentation of the decisions we made instead of being a true, living style guide. However, this opened up communication with our developers and engineers about the interfaces that we used, why and when we would pull in specific components. Much of this was done by collecting together the various ways that we already did the interface design through years of legacy design, documenting the different versions that we saw of different pieces of interface design and unifying them into a single standard. The product department (Greg and I) also set up trainings with the engineering staff to teach them simple usability heuristics and standards, and to get them moving towards making more consistent, understandable interfaces.

Alan and I also oversaw a complete restructuring of the CSS of the application, which we broke down into a modern SCSS framework. It was so truly lovely to throw out buckets of legacy styles, and instead have a cleanly structured, logically arranged files. We went with a structure loosely based on `inuit.css`, with an emphasis on self documenting code, good modularity, and a reasonable specificity curve (There were a lot of `!important`s previously).

## Testing and Refinement

While we were iterating on building out the first versions of the interface overhaul and technology changes, I created a detailed testing plan that outlined what we would be testing, and how. Based off of interviews with various people at ACGI, the product department's goals for the redesign, and just various bits of information I picked up from working with the product everyday, we outlined about 12 questions that we wanted to be able to definitively answer at the end of the testing process. These were mostly focused on 2 ideas:
1. Do users understand the new system? If not, can they learn it quickly?
2. Once they understand the space better, is their overall ability to move through the system improved?

Our testing program was with our current partner organizations, testing the interface on users with various levels of familiarity with the system. Our testing plan paid off in spades because we were able to collaborate with our client contacts to find users who had been working with the product for 5 years,and even someone who had just started the week prior.

In each case, I went to the client site, testing scripts and a camera in tow, and did in person usability tests with each person on our schedule. Overall, we tested with about 25 different people. We instantly learned a few things:
1. Dear lord, did the navigation improvements make sense to people. They were learning the new method in minutes when it took weeks to grasp previously.
2. Our language and mental models about the navigation were a huge hinderance to the users understanding what we were talking about.

My favorite example of this came from a fairly simple feature we built in at the outset&mdash;the ability to collapse the menu and to keep it "pinned" open. After futzing with it for a few months, we were well familiar with the functionality of it, and it would make perfect sense to our users... right?

Turns out that it made zero sense to anyone. The menu automatically opened up, so when they saw something that kept the menu open, they just never touched it. We flipped the script&mdash;hey, what if the menu auto closed so that you can use a small screen more easily! Well now the users think that if they click this button it's going to exit them out of their browser entirely. Thankfully, our iterative testing gave us the ability to make changes through the process, finding small refinements and fixes as problems came up. Eventually, we realized that we could call it "Auto Hide" which when paired with a "Hide Menu" button, made it clear what the function was and how it would work.

## Outcomes
At our user conference in 2016, we presented a detailed overview of the changes that were coming to the AA interface in the coming months. What had just been a prototype previously was now a reality in bound to the clients, and our session served as a quick training method to get them up to speed.