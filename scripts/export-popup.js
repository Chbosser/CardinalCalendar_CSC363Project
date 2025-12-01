// When the user clicks on div, open the popup
  function getWeeklySchedule(){
    return [
        { className: "CSC 363", start: "20250825T090000Z", end: "20251213T103000Z" }
    ]; /* this is an example of how it should be formatted */
  }

//When you click on the export button, the pop up should appear
  function showPopup() {
    document.getElementById("myPopup").classList.toggle("show");
  }

// Download the calendar as an .ics file
  function downloadICS() {
    const classSchedule = getWeeklySchedule();
  

  let icsFileContent = 
    `BEGIN:VCALENDAR
        VERSION: 2.0
        PRODID:-//CardinalCalendar`;

  // dtstamp = current date & uid = unique identifier
  classSchedule.forEach(course => {
    const now = new Date(); 
    const dtstamp = now.toISOString().replace(/[-:]/g,''); //Have to remove '-' and ':' because of ICS format ('YYYYMMDDTHHMMSSZ')
    const uid = Date.now() + "@CardinalCalendar";

  // For each class, it adds a class block to the ICS file
    icsFileContent += 
    `BEGIN:VEVENT
      UID:${uid}
      DTSTAMP:${dtstamp} 
      DTSTART:${course.start}
      DTEND:${course.end}
      SUMMARY:${course.className}
      END:VEVENT`;
      });

      icsFileContent += "END:VCALENDAR"; 
    
    // actually creates the downloadable file 
    const blob = new Blob([icsFileContent], {type: "text/calendar; charset=utf-8"});
    const link = document.createElement("a"); 
    link.href = URL.createObjectURL(blob);
    link.download = "weekly_schedule.ics"; 
    link.click();

 }
