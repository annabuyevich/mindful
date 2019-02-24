# **Mindful**

### What is Mindful?
Mindful was created to provide innovative assistance to people who are struggling with their mental health. About 44 million Americans do not have access to health care, which inhibits many from getting the proper mental health care they may need. We wanted to create a solution that provides resources and wellness activities for those who do not have the means to go to counseling or receive help from a professional.

### How it works:
In order to guide a user's journey through our website, we have implemented the Microsoft Face API. We use this API to detect and track the user's mood/feelings after participating in activies. This will help us recommend resources and activies for users who may have a hard time expressing their thoughts and feelings. Some of the activities we will recommend include meditation, breathing exercises, wellness talks, and physical exercises like going for a walk. In the journaling activity, a sentiment analysis was used to identify entries with negative sentiment. Once the program identifies a particular sentiment, it will redirect users to various resources that can provide the assistance that they may need. Some of these resources include information about the University of Illinois Counseling Center, group therapy sessions, and individual counseling sessions. We hope that this website will be of aid to those who may be hesitant about seeking help or cannot afford it.

### The details:
Mindful is built with Flask as its backend and AngularJS as its frontend. Microsoft's Face and Text Analysis APIs from their Cognitive Services suite are run in Python scripts to analyze image and text data to predict the user's emotion. The project currently runs locally on the developer's machine.

Note: Most up-to-date code in mvp_real branch.

### How to help:
Currently, Mindful is still young and a proof of concept. In the future, we hope to expand Mindful with greater support for journal entries, more activities, and even a graph API to allow the user to track their mental health over time and make sense of how they are feeling at certain periods, and why. We would appreciate work to be done to achieve those goals first.
If you want to help with the project, you must build the AngularJS frontend using ng serve. The backend is simply run with Flask and a couple of Python scripts; you will need the cognitive_faces, flask, and numpy packages. If you want to submit any changes, just make a pull request!


[Contributing Guide](https://github.com/annabuyevich/mindful/blob/master/CONTRIBUTING.md)

[Contributors](https://github.com/annabuyevich/mindful/blob/master/CONTRIBUTORS.md)
##### Licensed under the MIT License.
