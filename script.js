const scheduleData = {
  "2026-05-17": {
    label: "May 17, 2026",
    sessions: [
      ["9:00 AM - 9:50 AM", "Introduction to Modular Forms - El Guindy"],
      ["9:50 AM - 10:00 AM", "Break"],
      ["10:00 AM - 10:50 AM", "Introduction to Algebraic Number Theory - Craig"],
      ["10:50 AM - 11:00 AM", "Break"],
      ["11:00 AM - 11:50 AM", "L-Series in Number Theory - Hamieh"],
      ["11:50 AM - 1:00 PM", "Lunch Break"],
      ["1:00 PM - 1:50 PM", "Introduction to Siegel Modular Forms - Kohnen"],
    ],
  },
  "2026-05-18": {
    label: "May 18, 2026",
    sessions: [
      ["9:00 AM - 9:50 AM", "Introduction to Modular Forms - El Guindy"],
      ["9:50 AM - 10:00 AM", "Break"],
      ["10:00 AM - 10:50 AM", "Introduction to Algebraic Number Theory - Craig"],
      ["10:50 AM - 11:00 AM", "Break"],
      ["11:00 AM - 11:50 AM", "L-Series in Number Theory - Hamieh"],
      ["11:50 AM - 1:00 PM", "Lunch Break"],
      ["1:00 PM - 1:50 PM", "Introduction to Siegel Modular Forms - Kohnen"],
    ],
  },
  "2026-05-19": {
    label: "May 19, 2026",
    sessions: [
      ["9:00 AM - 9:50 AM", "Introduction to Modular Forms - El Guindy"],
      ["9:50 AM - 10:00 AM", "Break"],
      ["10:00 AM - 10:50 AM", "Introduction to Algebraic Number Theory - Craig"],
      ["10:50 AM - 11:00 AM", "Break"],
      ["11:00 AM - 11:50 AM", "L-Series in Number Theory - Hamieh"],
      ["11:50 AM - 1:00 PM", "Lunch Break"],
      ["1:00 PM - 1:50 PM", "Introduction to Siegel Modular Forms - Kohnen"],
    ],
  },
};

const scheduleBody = document.querySelector("#schedule-body");
const scheduleDate = document.querySelector("#schedule-date");
const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
const revealEls = document.querySelectorAll(".reveal");
const registrationForm = document.querySelector("#registration-form");
const formStatus = document.querySelector("#form-status");

function renderDay(dayKey) {
  const day = scheduleData[dayKey];
  if (!day) return;

  scheduleDate.textContent = day.label;
  scheduleBody.innerHTML = "";

  day.sessions.forEach(([time, session]) => {
    const row = document.createElement("tr");
    const timeCell = document.createElement("td");
    const sessionCell = document.createElement("td");

    timeCell.textContent = time;
    sessionCell.textContent = session;
    row.append(timeCell, sessionCell);
    scheduleBody.append(row);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    renderDay(button.dataset.day);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealEls.forEach((el, idx) => {
  el.style.transitionDelay = `${Math.min(idx * 55, 320)}ms`;
  observer.observe(el);
});

if (registrationForm) {
  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = new FormData(registrationForm);
    const fullName = form.get("full_name")?.toString().trim() || "Applicant";
    const lines = [
      "Summer School Registration Submission",
      "",
      `Full Name: ${fullName}`,
      `Email Address: ${form.get("email") || ""}`,
      `Phone Number: ${form.get("phone") || ""}`,
      `Institution / Organization: ${form.get("institution") || ""}`,
      `Affiliation / Department: ${form.get("affiliation") || ""}`,
      `Academic Level: ${form.get("academic_level") || ""}`,
      `Country of Residence: ${form.get("country") || ""}`,
      `Expected Arrival Date: ${form.get("arrival_date") || "Not provided"}`,
      `Dietary or Accessibility Notes: ${
        form.get("dietary_access") || "None provided"
      }`,
      "",
      "Motivation / Research Interests:",
      `${form.get("motivation") || ""}`,
    ];

    const subject = `Summer School Registration - ${fullName}`;
    const mailto = `mailto:wr07@aub.edu.lb?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    window.location.href = mailto;
    formStatus.textContent =
      "Your email app should now open with the filled registration details.";
  });
}

renderDay("2026-05-17");
