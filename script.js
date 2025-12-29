class Calendar {
      constructor() {
        // THIS IS WHERE CURRENT DATE IS DECLARED
        this.currentDate = new Date(); // Sets to today's date
        this.render();
        this.setupEventListeners();
      }

      setupEventListeners() {
        document.getElementById('prev').addEventListener('click', () => this.prevMonth());
        document.getElementById('next').addEventListener('click', () => this.nextMonth());
      }

      render() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update month/year display
        document.getElementById('month-year').textContent = 
          this.currentDate.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          });
        
        // Get first day and total days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const totalDays = lastDay.getDate();
        const startingDay = firstDay.getDay();
        
        // Render days
        const grid = document.getElementById('calendar-grid');
        grid.innerHTML = '';
        
        // 1. Empty cells for days before the 1st
        for (let i = 0; i < startingDay; i++) {
          const emptyCell = document.createElement('div');
          emptyCell.className = 'day empty';
          grid.appendChild(emptyCell);
        }
        
        // 2. Current month's days
        const today = new Date();
        for (let day = 1; day <= totalDays; day++) {
          const dayEl = document.createElement('div');
          dayEl.className = 'day current-month';
          dayEl.textContent = day;
          
          // Add data attribute for easy access
          dayEl.dataset.date = `${year}-${month + 1}-${day}`;
          
          // Highlight today
          if (year === today.getFullYear() && 
              month === today.getMonth() && 
              day === today.getDate()) {
            dayEl.classList.add('today');
          }
          
          // Add click event
          dayEl.addEventListener('click', () => this.selectDay(day));
          grid.appendChild(dayEl);
        }
        
      }

      nextMonth() {
        // Modify the existing currentDate property
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.render();
      }

      prevMonth() {
        // Modify the existing currentDate property
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render();
      }

      selectDay(day) {
        const selectedDate = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          day
        );
        console.log('Selected Date:', selectedDate.toDateString());
        
        // Visual feedback
        document.querySelectorAll('.day.current-month').forEach(d => {
          d.classList.remove('selected');
        });
        
        // Find and highlight the clicked day
        const clickedDay = Array.from(document.querySelectorAll('.day.current-month'))
          .find(d => parseInt(d.textContent) === day);
        if (clickedDay) {
          clickedDay.classList.add('selected');
        }
      }

      // Optional: Method to go to specific date
      goToDate(year, month, day = 1) {
        this.currentDate = new Date(year, month, day);
        this.render();
      }

      // Optional: Reset to today
      goToToday() {
        this.currentDate = new Date();
        this.render();
      }
    }

    // Initialize calendar when page loads
    document.addEventListener('DOMContentLoaded', () => {
      const calendar = new Calendar();
      
      // Add keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') calendar.prevMonth();
        if (e.key === 'ArrowRight') calendar.nextMonth();
        if (e.key === 't' || e.key === 'T') calendar.goToToday();
      });
    });