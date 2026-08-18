# Project Management Dashboard

A full-stack project management dashboard built as a team project using Next.js, TypeScript, MongoDB, and modern React development practices.

## Team Members

* Ebba Wahlström
* Leon Noyan
* Morteza Ahmadianmanzary

## Tech Stack

* **Next.js** – React framework with App Router
* **TypeScript** – Type-safe development
* **MongoDB** – Database and persistent user/project data
* **Tailwind CSS** – Responsive UI styling
* **Chart.js** – Data visualization
* **Better Auth** – Authentication and session management
* **Zod** – Data validation
* **PWA** – Progressive Web App functionality

## Features

### Authentication

* User registration and login
* Session-based authentication
* Protected application routes
* User-specific settings and data

### Dashboard

* Project overview
* Project summaries
* Recent projects
* Quick actions
* Statistics overview

### Project Management

* Create projects
* View project details
* Edit projects
* Delete projects
* Search projects
* Filter projects
* Sort projects
* Project pagination
* Project status and priority management
* Deadline tracking

### User Profile

* User profile management
* Profile information editing
* Avatar upload
* Accessibility settings
* Font size preferences
* Theme selection

### Statistics

* Project status statistics
* Project priority statistics
* Deadline urgency statistics
* Completion rate
* Overdue rate
* Data-driven charts

### PWA

* Progressive Web App support
* Service worker
* Offline page
* Installable application experience

## Architecture

The project follows a component-based architecture using Next.js App Router.

Main areas of the application include:

```text
app/
├── (private)/
│   ├── dashboard/
│   ├── profile/
│   ├── projects/
│   └── statistics/
├── api/
│   ├── auth/
│   ├── avatar/
│   ├── profile/
│   ├── projects/
│   └── settings/
├── login/
├── register/
└── offline/

components/
├── dashboard/
├── layout/
├── profile/
├── projects/
├── statistics/
└── ui/

hooks/
├── usePagination.ts
├── useProjects.ts
└── useSettings.ts

lib/
├── auth.ts
├── mongodb.ts
├── statistics.ts
├── user-settings.ts
└── settings-storage.ts

models/
├── Project.ts
└── User.ts
```

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Environment Variables

Create a `.env.local` file and configure the required environment variables for the application, including the MongoDB connection and authentication configuration.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name
BETTER_AUTH_SECRET=your_secret
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

Do not commit `.env.local` or any other file containing secrets.

## Project Status

The project has been completed as a full-stack team project and includes authentication, project management, user settings, statistics, responsive UI, and PWA functionality.
