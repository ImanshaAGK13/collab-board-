# CollabBoard(Team 82)

A collaborative team task board built with React — Assignment 01 (Static Front-End Skeleton).

## About

CollabBoard is a Kanban-style task management platform with a space-station mission control theme. It lets a small team create tasks, move them between columns (To Do / In Progress / Done), manage crew members, schedule events, and track project documents.


## Tech Stack

**Frontend**

* React 18 + Vite
* React Router
* Socket.io Client (real-time updates)
* Lucide React (icons)
* Vitest + React Testing Library (unit tests)

**Backend**

* Node.js + Express (REST API)
* MongoDB + Mongoose (with in-memory fallback if MongoDB isn't running)
* Socket.io (real-time task events)
* JWT + bcrypt (authentication — see Known Limitations)

## Team

| Member | Responsibility |
|---|---|
| Member 1 - SK Kavindi      | Authentication & Access Control (Login, Register & Route Guard) |
| Member 2 - IDRT Sanjeewa   | Kanban Mission Deck (Task Board & Edit Task Modal) |
| Member 3 - WRN Wijesooriya | To-Do List Module & Main Mission Dashboard View |
| Member 4 - PO Karunapala   | Crew Roster & Astronaut Directory Management |
| Member 5 - KDP Udeepa      | Telemetry Analytics & Real-Time System Metrics |
| Member 6 - HMYN Madugalla  | Mission Calendar & Event Scheduler |
| Member 7 - MKI Dewmini     | Document Repository & Mission Archives |
| Member 8 - AGK Imansha     | Cockpit App Layout, Sidebar Navigation, Settings & Global Themes |

## How to Run

**Frontend**

\`\`\`bash
npm install
npm run dev
\`\`\`

Then open the local URL shown in the terminal (usually `http://localhost:3000`).

**Backend**

\`\`\`bash
cd server
npm install
npm run dev
\`\`\`

Then the API runs at `http://localhost:5000` (create a .env file in server/ first — see .env.example).

## Wireframe & Component Tree

### Wireframe
![Wireframe](docs/Wireframe.png)

### Component Tree
![Component Tree](docs/ComponentTree.png)