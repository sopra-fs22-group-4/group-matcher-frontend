# SoPra FS22 - Group 04 Frontend

## Introduction
Group matching in university courses can be very tedious. Whether it is finding great group members, having similar group sizes
or simply having balanced skills across all groups.
In order to circumvent that we decided to create a group matcher which does exactly that: match groups according to customizable
traits and group sizes with the help of a matching quiz!

The matching quiz consists of single and multiple choice questions which are editable and predefined by the course administrators -
of which you can have as many as you need! The quiz will then be sent out via e-mail to a customizable list of students/participants
who can fill it out and submit their answers!

Depending on the settings you implemented (group size etc.) the groups will be matched accordingly once everybody has submitted
their answers or the deadline has been met - of course all participants will be notified via e-mail with their group and team members!

The goal of this application is to support both teachers and students in group related work and provide everyone with a quick, easy
and fair way of finding group members and organizing the surrounding structure.

## Technologies
- React: CSS, Typescript, HTML, Formik
- Chakra UI
- GitHub Actions
- Heroku
- REST API

## High-level Components
Most important components:
- [Dashboard](src/pages/admin/Dashboard.tsx)
- [Matcher](src/pages/admin/Matcher.tsx)
- [Quiz](src/pages/students/Quiz.tsx)

### Dashboard
After successful login an admin will land on the dashboard page. The dashboard contains a narrow menu overview on the left including workspaces,
the matchers and the profile. The remaining page is filled with recent information about the matchers:

- All active matchers are shown and can be clicked to access the individual matcher pages
- Recent submissions on any matchers the admin is part of are listed with some basic information about the submission
- An activity diagram shows real time traffic concerning the matchers

The dashboard provides a great and quick overview over any matchers the admin is part of.

### Matcher
Once a matcher has been initialized and clicked in the dashboard the matcher page is the next high level component. On here,
all information about the matcher itself is displayed and editable:

- General information like the amount of students or questions, publish and due date and the status of the matcher (active/inactive)
- Existing questions including all of their answers
- The matching logic and the respective strategy chosen
- A button for a preview of the student quiz
- An extra page for managing students manually

A matcher is customizable in many ways by all the admins notifying other admins if changes have been made to a matcher. Any settings
or content of a matcher can be changed after initialization.

### Quiz
After sending the invite link via e-mail to participants of the quiz, all students are verified by checking their e-mail again and
then redirected to the quiz itself if verification was successful. The questions can be filled out one by one in a simple and clear form,
their answers stored and sent to the backend for the matching process.

## Launch & Development
For your local development environment you'll need Node.js. You can download it [here](https://nodejs.org).

All other dependencies including React get installed with:

### `npm install`
**Hint**: _If you are using a modern IDE like Intellij it should automatically suggest `npm install` in a pop-up in the bottom right._

You have to run this command once before starting your application for the first time. Afterwards, start the application with:

### `npm run start`
**Hint**: _In order to have complete access to all features make sure the server is running as well._

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### `npm run build`

This command builds the application for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance:

The build is minified and the filenames include the hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Illustrations

_TODO: INSERT SCREENSHOTS ONCE DEPLOYMENT IS FINISHED_

## Roadmap
Potential improvements or extensions may include:

- Extending the questionnaire to include text questions, more background questions
- Include more sophisticated logic for the matching process
- Instead of having an e-mail service include a direct application service with notifications through the
  application itself rather than e-mail

Using Chakra UI provides a great user experience with clear and pre-defined, highly customizable components. Any
future improvements to the application should work towards an even better usage of the application's features and further
promote the matching process to take place on one platform.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

If you are interested in Chakra UI, check out their [documentation](https://chakra-ui.com/guides/first-steps).

Formik is a great form builder for React, check it out here: [Formik documentation](https://formik.org/docs/overview).

## Authors & Acknowledgement
>M. Guido, V. Herzl, H. Kim, A. A. Sirsikar, J. Meier
## License
Licensed under GNU General Public License v3.0
- See [License](LICENSE)