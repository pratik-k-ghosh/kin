# Kin

Kin is a private-by-default social media app built for genuine connection, intentional sharing, and a quieter online experience.

Instead of broadcasting everything to everyone, Kin is designed around a simple idea:

Share with your people, not the whole internet.

---

## OVERVIEW

Most social platforms are built around public attention:

- public profiles
- algorithmic feeds
- endless scrolling
- pressure to perform
- content from strangers

Kin explores the opposite direction.

It is a privacy-first social app where:

- profiles are not openly public
- content is not visible by default
- discovery is intentional
- connection is required
- posts can be shared with selected people, circles, or groups
- the feed is calm, relevant, and limited to your approved network

This project is being built step by step as both a serious full-stack portfolio project and a learning-by-building journey.

---

## CORE IDEA

1. Private by default
   There are no fully public content streams designed to keep users endlessly engaged.

2. Connection before visibility
   Users can discover profiles through search, but content stays locked until a connection is established.

3. Quiet feed
   The feed is meant to show updates from people you actually care about, not viral noise from strangers.

4. Audience control
   Each post can eventually be shared with:

- all connections
- close friends
- a custom circle
- selected people
- everyone except specific people

This makes privacy a core product feature, not an afterthought.

---

## PROBLEM KIN TRIES TO SOLVE

Traditional social media often creates:

- information overload
- doomscrolling
- performative posting
- weak or noisy connections
- poor control over who sees what

Kin aims to create a more focused and healthy social experience by giving users:

- better privacy
- more intentional relationships
- more control over visibility
- a smaller, calmer feed

---

## CURRENT STATUS

Under active development.

This project is currently in the early MVP stage.

What is being built first:

- basic post creation
- image + caption upload
- feed page
- basic backend structure
- simple frontend for testing the flow

Current approach:
The frontend is intentionally simple for now.
The main focus in the early phase is:

- backend fundamentals
- API design
- database design
- file upload handling
- clean project structure
- core feature flow

UI/UX polish will be improved in later phases.

---

## MVP GOALS

Phase 1 — Post System

- create post
- upload image
- add caption
- fetch posts
- basic feed

Phase 2 — User System

- signup / login
- user profile
- profile editing
- basic authentication

Phase 3 — Connection System

- search users
- send connection requests
- accept / reject requests
- connection-based feed

Phase 4 — Privacy & Audience Control

- close friends
- custom circles
- selected audience for posts
- excluded audience
- post visibility rules

---

## KEY FEATURES

Current / Near-Term Features

- image + caption post creation
- feed page
- backend API for posts
- file upload handling with Multer
- basic React frontend

Planned Features

- authentication and authorization
- private profiles
- user search with limited preview
- connection request system
- custom audience control for posts
- close friends / circles
- selected people visibility
- post likes and comments
- notifications
- block / remove connection
- cleaner feed experience without noisy public discovery

---

## AUDIENCE CONTROL VISION

One of the main ideas behind Kin is to make post visibility more intentional.

Instead of only having a public/private account model, Kin will support post-level audience selection.

A user should eventually be able to choose:

- All Connections
- Close Friends
- Specific Circle
- Specific People
- Everyone Except...

This is inspired by the usefulness of selective sharing in messaging apps, but applied to social media in a more thoughtful way.

---

## TECH STACK

Frontend

- React
- JavaScript
- Axios
- Basic React Hooks (useState, useEffect)

Backend

- Node.js
- Express.js

Database

- MongoDB
- Mongoose

File Upload

- Multer

Future / Possible Additions

- Cloudinary or S3 for media storage
- JWT / cookie-based authentication
- pagination
- caching
- notifications
- real-time features

---

## API OVERVIEW

Current Minimal APIs

Create Post
POST /api/post/create

Form Data

- caption — text caption
- image — uploaded image file
- content — text content

Get Posts
GET /api/post

Returns posts sorted by newest first.

---

## DATA MODEL (INITIAL)

Post
{
\_id,
caption,
img,
content,
createdAt,
updatedAt
}

This model will expand later to support:

- Author details
- visibility settings
- selected audience
- circles
- custom sharing rules
- comments and reactions

Planned data model expansion:

- User
- Profile
- Post
- Comment
- Like
- ConnectionRequest
- Connection
- Circle
- CircleMember
- Notification
- Block

---

## LOCAL DEVELOPMENT SETUP

Prerequisites

- Node.js
- npm
- MongoDB (local or Atlas)

Installation

1. Clone the repository
   git clone https://github.com/pratik-k-ghosh/kin.git
   cd kin

2. Install backend dependencies
   cd Backend
   npm install

3. Install frontend dependencies
   cd ../Frontend
   npm install

Environment Variables
Create a .env file inside the backend folder.

Example:
PORT=3000
MONGO_URI=mongodb://localhost:27017/kin
IMAGEKIT_PRIVATE_KEY=private_imagekit_key_here

You can expand this later with:

- cloud storage keys
- JWT secret
- cookie config
- email service config

Run the project
Start backend:
cd backend
npm run dev

Start frontend:
cd frontend
npm run dev

---

## DEVELOPMENT PHILOSOPHY

1. Build the minimal working version first
   Focus on the core flow before adding complexity.

2. Backend logic first, polish later
   The early priority is:

- correct architecture
- correct data flow
- proper API design
- clean database thinking

3. Improve in iterations
   This is not being treated as a one-shot project.
   It will grow as new concepts are learned and implemented.

---

## WHY THIS PROJECT IS DIFFERENT

Kin is not meant to be just another social media clone.

This project is important because it combines:

- product thinking
- full-stack development
- privacy-first design
- backend architecture
- real-world feature planning

It is also a way to deeply revise and practice:

- CRUD operations
- file uploads
- API design
- React basics
- database modeling
- relationship handling
- access control
- future scalability

---

## SCREENSHOTS

WILL Add screenshots here as the UI evolves.

Planned placeholders:

- Create Post Page
- Feed Page
- User Search
- Connection Request Flow
- Audience Selection UI

---

## ARCHITECTURE / DIAGRAMS

Diagrams will be added later.

upcoming future additions:

- system architecture diagram
- database schema diagram
- audience control logic flow
- post visibility decision tree

---

## ROADMAP

Version 1.0.0

- [x] Project idea finalized
- [x] MVP scope planned
- [x] Create post API
- [x] Fetch posts API
- [x] Basic create post page
- [x] Basic feed page

Version 1.1.0

- [x] Signup / login
- [x] Basic auth flow
- [x] Update Post model
- [x] Link posts to users

Version 1.1.1

- [ ] Profile pages
- [ ] Search users
- [ ] Connection requests
- [ ] Accept / reject requests
- [ ] Connection-only content access

Version 1.1.2

- [ ] Likes
- [ ] Comments
- [ ] Block / remove connection
- [ ] Notifications

Version 0.4

- [ ] Better UI / UX
- [ ] Media storage improvements
- [ ] Deployment
- [ ] Close Friends
- [ ] Circles / groups
- [ ] Post-level audience control
- [ ] Visibility filtering logic

---

## KNOWN LIMITATIONS (CURRENT STAGE)

Since Kin is in the early phase, the current build is expected to have:

- a very basic frontend
- minimal validation
- no production-grade UI yet
- limited feature set
- evolving architecture

This is intentional.
The goal is to build the product in layers and improve quality with each phase.

---

## FUTURE IMPROVEMENTS

- better folder modularity
- stronger validation
- better error handling
- secure auth and protected routes
- cloud media storage
- pagination and feed optimization
- role-based / privacy-based access control
- better frontend design system
- mobile responsiveness
- deployment and monitoring

---

## LEARNING GOALS BEHIND THIS PROJECT

Kin is also a serious learning project.

It is helping practice and improve:

- backend fundamentals
- React basics
- API integration
- MongoDB modeling
- file uploads with Multer
- full-stack flow understanding
- product thinking
- privacy-aware feature design

---

## CONTRIBUTION

This is currently a personal learning and portfolio project.

Suggestions, ideas, and constructive feedback are welcome.

If you want to contribute later, the project can be expanded with:

- better UI improvements
- architecture suggestions
- backend optimization ideas
- test coverage
- feature enhancements

---

## LICENSE

This project is open-source and available under the MIT License.

---

## AUTHOR

Built by Pratik as a long-term full-stack learning project focused on building a meaningful product, not just another clone.

---

## FINAL NOTE

Kin is being built slowly and intentionally.

The goal is not just to finish a project, but to build something that:

- solves a real problem
- grows with improving skills
- reflects strong engineering and product thinking

If you like privacy-first product ideas or thoughtful social experiences, feel free to explore the project and follow its progress.
