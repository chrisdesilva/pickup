This project makes use of several api keys, each of which is stored in a .env file that isn't pushed to GitHub for security reasons. You can register for keys by using the following links. 
[Dark Sky API](https://darksky.net/dev/register)
[Google Places API](https://cloud.google.com/maps-platform/?_ga=2.33032574.1722274875.1559603342-1851123871.1552525580#get-started)

You will also need to make use of [Firestore](https://firebase.google.com/docs/firestore/quickstart). Follow the directions for getting started with web to create your database for testing.

1. Fork the project by clicking the Fork button up at the top of the screen.
2. Clone your fork with `git clone [code-you-copied-from-clone-button]`
3. `cd pickup` to make sure you are in the right directory
4. Add an `upstream` remote for keeping your local repo up-to-date:
  > `git remote add upstream https://github.com/chrisdesilva/pickup.git`
5. Run `git fetch upstream master` to check for updates in the upstream remote repo
6. Run `git log --oneline --graph --all` to see the changes added to `upstream/master`
7. If upstream/master branch is ahead of origin/master:<br/>
  7.1 Make sure you are in the right branch to make the merge: `git checkout master`<br/>
  7.2 Merge to the changes added by the maintainer: `git merge upstream/master`
  7.3 Push the forked repo to update: `git push origin master`
8. Run `npm install` to install project dependencies.
9. In the root directory, create a new file called `.env`
10. Copy the variables from `.env.sample` into your `.env` file and update with your keys
11. Run `npm start` to start your dev environment 
12. Start contributing!

When you're ready to add your changes to the project, submit a [pull request](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork).

If you've got any ideas for making the app better, submit an [issue](https://github.com/chrisdesilva/pickup/issues). Thanks for helping out! 
