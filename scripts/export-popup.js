// covert date & time into ICS timestamps
const {start,end} = getICSDateTime(day, course.class_time);

// Push courses to schedule to export
    schedule.push({
        className: course.crs_code,
        instructor: course.class_instructor,
        day: day,
        time: course.class_time,
        start: start,
        end: end
    });

// Get user's schedule
  function getWeeklySchedule(){
    return schedule; 
}

//When you click on the export button, the pop up should appear
function togglePopup(popupId) {
    let popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.toggle("show");
    }
}

// Convert course day & time to ICS format
function getICSDateTime(day, time) {
    const daysOfWeek = {Mon: 1, Tues: 2, Wed: 3, Thurs: 4, Fri: 5}; // convert days  to numbers
    const today = new Date(); 
    const dayNum = daysOfWeek[day];
    const dayDiff = (dayNum + 7 - today.getDay()) % 7; // find the upcoming day (e.g. next Mon)
    const classDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayDiff);

    const [startTime, endTime] = course.class_time.split('-'); // Splitting start & end time
    const start = parseTime(startTime);
    const end = parseTime(endTime);

    // time stamps for start & end time
    const dtStart = new Date(classDate);
    dtStart.setHours(start.hour, start.minute, 0, 0);

    const dtEnd = new Date(classDate);
    dtEnd.setHours(end.hour, end.minute, 0, 0);
    // converting to ICS format (they don't allow '-' , ':' , and miliseconds, and you need a Z at the end)
    function formatICS(dte) {
        return dte.toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
    }

// Convert time: 12 hour -> 24 hour
    function parseTime(time) {
        let[hour, minute] = time.match(/\d+/g).map(Number);
        if(time.includes('PM') && hour !== 12)
            hour += 12; 
        if(time.includes('AM') && hour === 12)
            hour = 0;
        return {hour, minute};
    }

    return {start: formatICS(dtStart), end:formatICS(dtEnd) };
}

// Get user schedule
function collectUserSchedule(){
    const blocks = document.querySelectorAll('.class-div');
}

// Download the calendar as an .ics file
  function downloadICS() {
    const schedule = getWeeklySchedule();
  
// ICS Format (DTSTAMP = current date & UID = unique identifier)
let icsFileContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CardinalCalendar`;

// Loop through each class
  schedule.forEach(course => {
    const now = new Date(); 
    const dtstamp = now.toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z'; //Have to remove '-' and ':' because of ICS format ('YYYYMMDDTHHMMSSZ')
    const uid = Date.now() + "@CardinalCalendar";

  // For each class, it adds a class block to the ICS file
icsFileContent +=
`BEGIN:VEVENT
DTSTAMP:${dtstamp}
UID:${uid}
DTSTART:${startTime}
DTEND:${endTime}
SUMMARY:${course.crs_code}
DESCRIPTION:${course.class_instructor}
LOCATION:${classLocation}
FREQ=WEEKLY
INTERVAL:${numClassPerWeek}
UNTIL:${semesterEnd}
END:VEVENT`;
});


      icsFileContent += "END:VCALENDAR"; 
    
    // actually creates the downloadable file 
    const blob = new Blob([icsFileContent], {type: "text/calendar; charset=utf-8"});
    const link = document.createElement("a"); 
    link.href = URL.createObjectURL(blob);
    
    // make file name = user's calendar name
    let fileName = localStorage.getItem("calendarName");
    link.download = fileName + ".ics"; 
    link.click();
}; 
