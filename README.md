# [Pick-up](https://pick-up-1.firebaseapp.com)

App designed to find nearby basketball courts for pick-up games. Starting off as an Austin-based project with plans for expansion to other areas as development continues.

# Contribute

I'd love your help with this project. The steps below should get you going. If not, make a contribution by updating the docs!

This project makes use of several api keys, each of which is stored in a .env file that isn't pushed to GitHub for security reasons. You can register for keys by using the following links. 
[Dark Sky API](https://darksky.net/dev/register)
[Google Places API](https://cloud.google.com/maps-platform/?_ga=2.33032574.1722274875.1559603342-1851123871.1552525580#get-started)

You will also need to make use of [Firestore](https://firebase.google.com/docs/firestore/quickstart). Follow the directions for getting started with web to create your database for testing.

1. Fork the project by clicking the Fork button up at the top of the screen.
2. Clone your fork with `git clone [code-you-copied-from-clone-button]`
3. `cd pickup` to make sure you are in the right directory
4. Add an `upstream` remote for keeping your local repo up-to-date:
  > `git remote add upstream https://github.com/chrisdesilva/pickup.git`
5. Run `npm install` to install project dependencies.
6. In the root directory, create a new file called `.env`
7. Copy the variables from `.env.sample` into your .env file and update with your keys
8. Run `npm start` to start your dev environment 
9. Start contributing!

When you're ready to add your changes to the project, submit a [pull request](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork).

If you've got any ideas for making the app better, submit an [issue](https://github.com/chrisdesilva/pickup/issues). Thanks for helping out! 
