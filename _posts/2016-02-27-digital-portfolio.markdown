---
layout: post
title: 'Project: Digital Portfolio'
date: '2016-02-27 05:34:34'
tags: project
image: posts/imported/2016/02/digital-portfolio.png
---

When students with disabilities progress out of their IEP programs, they have an entire extra process on their plates. There’s a name for this process, “Transition,” and it weighs heavily on students with IEPs ranging from mild learning disabilities to extensive physical and mental disabilities.

In Maryland, students who go through transition make a portfolio, a document that represents the skills that they have gathered throughout their education to help them transition to whatever their next step is, whether it’s college, a career, or community living. The portfolio itself is a thick three ring binder: treasured by teachers and ignored by everyone else.

At No.Inc, we were approached to create a Digital Portfolio, modernizing the process and helping the students create something more flexible and usable.

####Overview:
* **Company**: no.inc in partnership with Johns Hopkins CTE
* **Project Manager**: James Hagan
* **Designer**: Andy Spangler
* **Developer**: In house team at no.inc
* **Live Site**: Not applicable, but <a href="http://www.noinc.com/portfolio/student-portfolio/">check out this page on no.inc&rsquo;s site</a>

<div class="anchor-links">
<a href="#needfinding">Needfinding</a>
<a href="#testing">Testing</a>
<a href="#whatdidntwork">What Didn't Work</a>
<a href="#overall">Overall</a>
</div>

## Needfinding:

We started the project with a series of phone interviews with parents and educators. The most productive conversation was with a teacher named Mr. Lee, who ran a class focused on the career readiness element of transition. Attending the class as he worked with students, I observed the numerous issues students ran into while trying to create their portfolio with Google Docs:

* The students were entirely dependent on Mr. Lee to see the curriculum. Because he was spending the majority of his time running around the classroom, each student had to wait for the entire class to reach a milestone before proceeding.
* Google Docs was too complex for the students to use. They got lost easily and had a hard time completing their tasks.
* The students were confused by the assignments they received, and they needed a simpler way to walk through the material.

After interviewing some of the students, the teacher, and then a few parents, we established who our target users were and began building a list of features.

#### Initial Whiteboard sketches for the dashboard
![Dashboard whiteboarding](/images/posts/imported/2016/06/dashboard.png)

#### Processing through how students could move through a categorization schema
![Categorization Schema](/images/posts/imported/2016/06/workflows.png)

We made personas meant to and encompass our main 3 use cases, student, teacher, and parent. <a href="/images/posts/imported/2016/06/teacher-persona.png">Here is an example of one</a>.

After creating an information architecture based off of our initial feature list and personas, I jumped into a detailed wireframing session. Because of the timelines of scheduling user tests, we had a month and a half of lag time between our initial interviews and our first round of user tests. Consequentially, we tested with a much more robust prototype.

## Testing:

One of the biggest changes that came out of our user testing was the use of our language. Thankfully, our colleagues at John’s Hopkins agreed to come with us and witness the testing sessions - and they were stunned at how literal and direct the students were. I joke that teachers love metaphors, but students are tremendously literal.

#### Early version of the language
![Product areas called Roadmap, Library, and Portfolio](/images/posts/imported/2016/06/language.png)

#### Revised language
![Product areas revised to Your Tasks, Your Files, and Your Portfolio](/images/posts/imported/2016/06/language-revised.png)

We also had to change some of the workflows for students working with the feedback system, which was confusing. We needed to balance the ability for the students to send notifications to their teachers without the teachers being overwhelmed (considering some of them could have as many as 200 students as part of their caseload,) so we had a delicate balancing act of keeping efficient and simple workflows while not causing a flood of messages for teachers. I also had to rearrange the page, since the students weren't getting any information scent to scroll down.

#### The initial feedback system
![Feedback system with the feedback below the assignment](/images/posts/imported/2016/06/feedback.png)

#### Revised feedback system
![Revised system with feedback to the right of the assignment](/images/posts/imported/2016/06/feedback-revised.png)

Between rounds of user testing, I tweaked the questions that I asked, the interfaces and language, and phased out simple workflows that students understood more quickly.

## Teacher workflows:

Teachers (or as we ended up calling them, case managers) have far too many tools to deal with as part of their professional life. At every step in the process of designing the teacher views, we had to consider if the teacher could accomplish their goals quickly and move on to their other tasks.

One of the best features in the product is the idea of “Paths.” While the teachers need very granular tools to manage the assignments that their students are assigned, they do also generally fall into a couple of templates. Our proposed solution is the path, which gives the teachers a quick way to assign students a set of assignments, while also tagging the student as a member of the path, giving the teacher a way to find and understand the general workflows of their classroom quickly.

#### The sketch laying out "tracks" (Which turned into paths)
![Shows ideation of how to set state for multiple assignments at once](/images/posts/imported/2016/06/path-sketch.png)

####The path interface
![Final interface for path setting](/images/posts/imported/2016/06/path-interface.png)

As we worked through the teachers tools, I kept this balance as my focus at all times, fast and efficient workflows with the ability to be granular and specific when the need arises.

#### The granularity that balances the templating
![Showing how students can have individual tasks associated with them](/images/posts/imported/2016/06/granular-assignments.png)

## What didn’t work:
This project has had 2 critical shortcomings as part of its process, but both can be traced to scheduling.

First, our external scheduling with students meant that we weren’t able to test the early prototypes and wireframes—which would have been invaluable at helping us find deeper, structural issues with their mental model of the system.

Second, throughout the design process I didn’t have the availability of an engineer to work with, to check my assumptions and ensure the technical feasibility of different aspects of the prototype. Consequentially, we had to make changes after we had officially completed our user testing, which can be detrimental to the final experience.

##Overall:
One of the highest compliments that I’ve ever received was from Mark Trexler, a Project Coordinator at JHU CTE and 3 decade veteran of Maryland Public Schools. After a particularly difficult test with a largely non verbal student, he told me (paraphrased)

> You have the most incredible patience working with these kids. ... It’s great to watch them open up and work with you

The ethos of this project resonates strongly with me, and the idea of giving a voice to students who might otherwise feel disempowered make it by far my favorite work.
