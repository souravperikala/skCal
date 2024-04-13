
const calendar = document.getElementById('calendar');
const navigation = document.createElement('div');
navigation.classList.add('navigation');
calendar.appendChild(navigation);

const months = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

const date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

function generateCalendar(month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  let html = '<table class="calendar">';
  html += '<caption><button class=\"leftBtn\" onclick=\"previousMonth()\">left</button>' + months[month] + ' ' + year + '<button class=\"rightBtn\" onclick=\"nextMonth()\">right</button></caption>';
  html += '<tr>';

  for (let i = 0; i < 7; i++) {
    html += '<th>' + ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i] + '</th>';
  }

  html += '</tr><tr>';

  let day = 1;
  let rowCount = 1;
  for (let i = 0; i < 42; i++) {
    if (i < firstDayOfMonth || day > daysInMonth) {
      html += '<td></td>';
    } else {
      const currentDate = new Date(year, month, day);
      const today = new Date();
      const isCurrentDay = currentDate.toDateString() === today.toDateString();
      html += '<td class="' + (isCurrentDay ? 'today' : '') + '" data-year="' + year + '" data-month="' + month + '" data-day="' + day + '">' + day + '</td>';
      day++;
    }

    if (i % 7 === 6) {
      html += '</tr>';
      if (day <= daysInMonth) {
        html += '<tr>';
        rowCount++;
      }
    }
  }

  for (let i = rowCount; i <= 6; i++) {
    html += '<tr>';
    for (let j = 0; j < 7; j++) {
      html += '<td></td>';
    }
    html += '</tr>';
  }

  html += '</table>';

  calendar.innerHTML = '';
  calendar.appendChild(navigation);
  calendar.innerHTML += html;
}

function updateCalendar() {
  generateCalendar(currentMonth, currentYear);
}

function previousMonth() {
  if (currentMonth == 0) {
    currentMonth = 12;
    currentYear = currentYear - 1;
  }
  currentMonth = currentMonth - 1;
  updateCalendar();
}

function nextMonth() {
  if (currentMonth == 11) {
    currentMonth = -1;
    currentYear = currentYear + 1;
  }
  currentMonth = currentMonth + 1;
  updateCalendar();
}

updateCalendar();

// Add month select
const monthSelect = document.getElementById('selectMonth');
monthSelect.classList.add('select');
monthSelect.addEventListener('change', function (e) {
  currentMonth = parseInt(e.target.value);
  updateCalendar();
});
for (let i = 0; i < 12; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = months[i];
  if (i === currentMonth) {
    option.selected = true;
  }
  monthSelect.appendChild(option);
}


// Add year select
const yearSelect = document.getElementById('selectYear');
yearSelect.addEventListener('change', function (e) {
  currentYear = parseInt(e.target.value);
  updateCalendar();
});
const currentYearOption = document.createElement('option');
currentYearOption.value = currentYear;
currentYearOption.textContent = currentYear;
currentYearOption.selected = true;
yearSelect.appendChild(currentYearOption);
for (let i = currentYear - 10; i <= currentYear + 10; i++) {
  if (i !== currentYear) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }
}

const cells = document.querySelectorAll("#calendar td");
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const year = parseInt(cell.dataset.year);
    const month = parseInt(cell.dataset.month);
    const day = parseInt(cell.dataset.day);
    const reminder = prompt("Enter reminder:");
    if (reminder) {
      this.addReminder(year, month, day, reminder);
    }
  });
});