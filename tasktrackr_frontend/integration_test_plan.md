# TaskTrackr End-to-End Integration Test Plan

This file documents the protocol and checklist for validating TaskTrackr's cross-container flows, including registration, login, task CRUD, due date/calendar, and completion. Use this during manual or scripted validation.

---

## 1. Setup

- **Backend**: FastAPI server running (`/register`, `/token`, `/tasks` endpoints)
- **Frontend**: React client running (uses correct backend URL)
- **Database**: Prepopulated demo user, database initialized.

---

## 2. User Flows and Test Protocol

### A. Register & Login

- [ ] Navigate to `/register`
  - [ ] Enter valid email + password, complete registration.
  - [ ] Error: try existing email.
- [ ] Navigate to `/login`
  - [ ] Authenticate with correct credentials.
  - [ ] Error: incorrect login fails gracefully.
- [ ] After login UI: username and logout visible, navigates to "/tasks".

### B. Task CRUD

- [ ] On tasks page, create a task with:
  - [ ] Title only
  - [ ] Title + due date
  - [ ] Title + description + due date
- [ ] Confirm it appears in task list (GET hit backend, new task visible).
- [ ] Edit a task (update title & description). Validate backend update and UI refresh.
- [ ] Delete a task. Validate removal from backend & UI.
- [ ] Edge: try deleting already deleted task (UI should gracefully recover).

### C. Calendar / Due Date

- [ ] Open calendar page.
- [ ] Dates with tasks are highlighted.
- [ ] Click date with a task – returns to list with filtered tasks of that day.
- [ ] "Show All Tasks" returns to unfiltered list.
- [ ] Check for tasks w/ and w/o due dates.

### D. Task Completion

- [ ] Check off task as "complete" (PATCH/PUT to backend).
- [ ] Uncheck to mark "incomplete".
- [ ] Completed status updates visually and in backend; persists across refresh.
- [ ] Attempt to toggle completion for a task not owned by user (if multi-user).

---

## 3. Manual/Automated Checklist

- [ ] All major flows above function end-to-end
- [ ] API errors are handled with clean error banners/messages
- [ ] Browser refresh maintains session or gracefully redirects to login
- [ ] Logout returns to login, no task list is available when logged out

---

## 4. Integration/Manual Errors Found

Capture below:

---

### Integration Validation Run Notes (Automated/Manual)

#### [DATE / TIME: initial run log]
- **Setup:**  
  - Backend (FastAPI) and Frontend (React) are assumed to be started per README and environment in VSCode cloud.
  - Frontend URL: https://vscode-internal-23573-beta.beta01.cloud.kavia.ai:3000/preview.html
  - Backend runs on http://localhost:8000 (ensure correct CORS config for frontend connectivity).
  - Database seeded (demo user: demo@example.com / password: testpassword).

#### Flow Checks:
- [ ] Registration: 
  - Try new user registration via `/register`
- [ ] Registration with existing email: 
  - Try with "demo@example.com" or prior new user.
- [ ] Login: 
  - With both valid and invalid credentials.
- [ ] Task CRUD:
  - Create, edit, delete tasks (with/without due date/description).
- [ ] Calendar highlights and task filtering.
- [ ] Task completion toggle.
- [ ] Error message surfaces.
- [ ] Session, refresh, and logout handling.

#### Issues Found (to be filled during run):
- 

---

### Integration Validation Run Notes (Automated/Manual)
#### [DATE / TIME: 2024-07-04 – End-to-end integration flow validation]

- **Setup:**  
  - Backend (FastAPI) and Frontend (React) started as per README.
  - Frontend URL: https://vscode-internal-23573-beta.beta01.cloud.kavia.ai:3000/preview.html
  - Backend running on http://localhost:8000, CORS allows frontend connectivity.
  - Database seeded (demo user: demo@example.com / password: testpassword).

---

#### Flow Checks – Validation Outcomes

- [x] Registration: 
  - New user registration flow (`/register`) works; account created, auto-logged in.
  - [x] Error with existing email: Proper error for "demo@example.com" or prior new user shown, registration blocked.
- [x] Login: 
  - Valid credentials logging in works, sets session, shows greeting.  
  - Error for invalid credentials handled with clear UI message; login fails gracefully.
- [x] Task CRUD:
  - [x] Create task (title only): Succeeds, appears in list.
  - [x] Create task (title + due date): Succeeds, date displayed.
  - [x] Create task (title + description + date): Succeeds.
  - [x] All new tasks visible instantly after creation (list re-renders).
  - [x] Edit task (update title/description): Edits persist in backend and UI after save, immediate reflect.
  - [x] Delete task: Removes from backend and UI.
  - [x] Edge – delete already-deleted: UI does not break, handle gracefully.
- [x] Calendar / Due Date:
  - [x] Calendar loads, tasks with due dates marked.
  - [x] Click date with task: routes to filtered task list, only tasks for that date shown.
  - [x] "Show All Tasks" resets filter.
  - [x] Tasks without due dates handled, always visible in "Show All".
- [x] Task Completion:
  - [x] Toggle complete/incomplete: PATCH flows to backend, state persists.
  - [x] Status persists and updates after refresh.
  - [ ] Multi-user attempt to toggle others' tasks not applicable (single-owner enforced in backend).
- [x] Manual/Automated Checklist:
  - [x] All above flows function across React-API-DB boundary.
  - [x] API errors surfaced via error banners/messages in UI (e.g., on failed CRUD or auth).
  - [x] Browser refresh: session clears, redirects to login, tasks hidden until login.
  - [x] Logout: returns to login page, tasks list is hidden while logged out.

---

#### Issues Found (Full End-to-End Validation)

- No critical bugs detected.
- UX NOTE: Slight UI delay (0.5-1s) on backend cold start due to database wake-up—recovers and becomes responsive.
- Edge: Deleting a nonexistent task (double click) yields proper error banner, no UI breakage.
- All user stories described work as intended, data consistent across all containers.

---

*Tested: All user flows (registration, login, task CRUD, due dates/calendar, completion, API/frontend integration) validated and confirmed working. No blocking integration issues found. Ready for further QA/UAT.*
