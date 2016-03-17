###Was the question/problem clear? Did you feel like something was missing or not explained correctly?
Yes! I guess it could have felt a little vague to the wrong person, but as a designer, I really enjoyed the blank slate. If it was for a less-design oriented developer, it might not be the right challenge, though.

###How much time did you spend on each part: understanding, designing, coding, testing?
I probably spent an hour or so just thinking about it and playing around with possible design ideas. Coding was around 3 hours from start to finish, including a while at the end where I started tweaking some mobile optimizing stuff and then decided it was not that important for now. (I'm going to continue fixing it and send an updated version later if I get to it tonight.)

###What would you have done differently if you have more time or resources?
Ahhh, so much stuff! I'll pick three things:
 - If I had more time to gather user data and understand the overall vision, I probably would have spent a lot more time designing strategically. This one is kind of an arbitrary, quick layout of whatever came to mind first.
 - We probably wouldn't use an iframe for the video if this was a real Vimeo product. :)
 - I'd like to work on the mobile optimization!! (Right now it's pretty crappy, but the tablet -- desktop is fine.)

###Are there any bottlenecks with your solution? if so, what are they and what can you do to fix them/minimize their impact?
Well, with the way I'm retrieving the data, the entire video feed section (featured and feed) are only rendering once it's fetched. If there's an error, there's no explanation and nothing loads. Womp womp womp. I'd love to implement some sort of "optimistic" loading -- we have some of the layout pre-render while waiting for the data to get fetched, and then replace/err on load.

###How would the system scale for more users/visitors?
Hmm, well as of now, we're not loading too much data, so it won't be that much a difference in terms of the API call (I think?). But to help it out, we could update the api call to only get the first X results, then only bring in more when you clicked "Show More", etc. For the top animation, I should definitely put in a placeholder/still version in case of slow connections.

###How would your solution cope if the api was slow or broke or returned incorrect data?
Right now, there's just a screen that shows up on error that will tell the user to try reloading the page. It's not really doing anything extra to handle the api speed at the moment, although I can add a custom timeout if necessary.

###Anything else you want to share about your solution or the problem?
It was fun! There's so much I would add or dive deeper into, so this is really just the quickest possible MVP-draft I could get out there. 
