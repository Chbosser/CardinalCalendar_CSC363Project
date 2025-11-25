// When the user clicks on div, open the popup
  function getWeeklySchedule(){
    return [
        { className: "CSC 363", start: "20250825T090000Z", end: "20251213T103000Z" }
    ]; /* example */
  }

  function showPopup() {
    document.getElementById("myPopup").classList.toggle("show");
  }

  function downloadICS() {
    const classSchedule = getWeeklySchedule();
  

  let icsFileContent = 
    `BEGIN:VCALENDAR
        VERSION: 2.0
        PRODID:-//CardinalCalendar`;


  classSchedule.forEach(course => {
    const dtstamp = new Date().toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
    const uid = Date.now() + "-" + "@CardinalCalendar";


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

    const blob = new Blob([icsFileContent], {type: "text/calendar; charset=utf-8"});
    const link = document.createElement("a"); 
    link.href = URL.createObjectURL(blob);
    link.download = "weekly_schedule.ics"; 
    link.click();

 }
