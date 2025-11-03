// assets/events.js
const CAL_ID = "37244765f0d940dea56cc046410af977cb35a1401b661d1f53971bf28d9904b0@group.calendar.google.com";
const API_KEY = "YOUR_GOOGLE_API_KEY"; // replace with your restricted key

async function fetchNextEvents(maxResults = 3) {
  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CAL_ID)}/events`);
  url.searchParams.set("key", API_KEY);
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("timeMin", new Date().toISOString());
  url.searchParams.set("maxResults", String(maxResults));
  const res = await fetch(url.toString());
  if(!res.ok) throw new Error("Calendar fetch failed");
  return res.json();
}

function fmtDate(ev) {
  const start = ev.start.dateTime ? new Date(ev.start.dateTime) : new Date(ev.start.date);
  return ev.start.dateTime
    ? start.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
    : start.toLocaleDateString();
}

function renderEvents(data) {
  const items = (data.items || []).filter(e => e.status !== "cancelled");
  const nextEl = document.getElementById("nextEvent");
  const listEl = document.getElementById("nextThree");
  if (items.length === 0) {
    if(nextEl) nextEl.textContent = "No upcoming events found.";
    if(listEl) listEl.innerHTML = "";
    return;
  }
  const first = items[0];
  if(nextEl) nextEl.textContent = `${first.summary} — ${fmtDate(first)}${first.location ? " • " + first.location : ""}`;

  if(listEl) {
    listEl.innerHTML = items.map(ev => `
      <li>
        <strong>${ev.summary}</strong><br>
        <small>${fmtDate(ev)}${ev.location ? " • " + ev.location : ""}</small>
      </li>
    `).join("\\n");
  }
}

async function initEvents(){
  try {
    const data = await fetchNextEvents(3);
    renderEvents(data);
  } catch(e){
    console.warn(e);
    const nextEl = document.getElementById("nextEvent");
    if(nextEl) nextEl.textContent = "Unable to load upcoming event.";
  }
}

document.addEventListener("DOMContentLoaded", initEvents);
