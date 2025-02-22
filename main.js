async function updateSchedule() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    data.data.session.forEach((session) => {
      const day = session.day.toLowerCase();
      const time = session.time;
      const student = session.student;
      const bgColor = session.bgColor;

      const id = `${day}-${time.replace(/ /g, "-").toLowerCase()}`;
      const div = document.getElementById(id);

      if (div) {
        div.style.backgroundColor = bgColor;
        div.style.color = "white";
        div.style.border = "none";
        div.textContent = student;

        if (time.includes("-")) {
          const [startTime, endTime] = time.split("-");
          const start = startTime.trim();
          const end = endTime.trim();

          if (start !== end) {
            const nextId = `${day}-${end.replace(/ /g, "-").toLowerCase()}`;
            const nextDiv = document.getElementById(nextId);

            if (nextDiv) {
              nextDiv.style.backgroundColor = bgColor;
              nextDiv.style.color = "white";
              nextDiv.textContent = student;
            }
          }
        }
      }
    });
  } catch (error) {
    console.error("Error fetching or processing JSON data:", error);
  }
}

updateSchedule();
