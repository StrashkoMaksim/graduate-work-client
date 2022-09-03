## Description

As part of the final qualifying work, it was required to develop a client-server web application for the CNC Solutions online store with an integrated CRM system and an admin panel. The client part of the application is developed based on the NextJS framework, which allows you to create hybrid web applications.

- The application has several access levels (public and administrator level).
- The content on the site is dynamic, managed through the admin panel.
- Applications from potential customers are received in a single section of the admin panel, called the CRM system.

This project is of high relevance, since the final web application will be used by Far East Special Protection Company LLC to attract potential customers, sell their products and conveniently keep track of customer interactions. One of the activities of the company is the sale, maintenance and repair of machine tools with numerical control (CNC).

Website layout designed in Figma is available at [this link](https://www.figma.com/file/bpt60t9k005eA7wemUNbKW/MakerCNC?node-id=0%3A1).  
An explanatory note describing the application development process is available at [this link](https://drive.google.com/file/d/1NJHFJe3mjHo94c1XeerLUbT2EtALkWLJ/view?usp=sharing).

## Installation

1. Install dependencies:
```bash
$ npm install
```
2. Copy the .env file, change the environment variables and rename the file to ".env.local".

## Running the app

```bash
# development watch mode
$ npm run dev

# build
$ npm run build

# production mode
$ npm run start
```
