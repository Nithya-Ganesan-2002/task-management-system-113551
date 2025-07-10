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

- ...


---

*This document is to be updated with specific bug findings or protocol adjustments as flows are tested.*
