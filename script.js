<script>
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Store all app data
    const appData = {
        // Time calculations
        timeData: {
            availableHours: 74,
            workPercentage: 40,
            workHours: 29.6,
            lifeHours: 44.4,
            adjustedWorkHours: 23.7,
            adjustedLifeHours: 35.5
        },
        // Tasks
        workTasks: [],
        lifeTasks: []
    };
    
    // All screens
    const welcomeScreen = document.getElementById('welcome-screen');
    const timeCalculatorScreen = document.getElementById('time-calculator-screen');
    const workTasksScreen = document.getElementById('work-tasks-screen');
    const lifeTasksScreen = document.getElementById('life-tasks-screen');
    const resultsScreen = document.getElementById('results-screen');
    
    // Time calculator elements
    const sleepHoursSlider = document.getElementById('sleep-hours');
    const sleepHoursValue = document.getElementById('sleep-hours-value');
    const sleepHoursWeekly = document.getElementById('sleep-hours-weekly');
    
    const selfCareHoursSlider = document.getElementById('self-care-hours');
    const selfCareHoursValue = document.getElementById('self-care-hours-value');
    const selfCareHoursWeekly = document.getElementById('self-care-hours-weekly');
    
    const commuteHoursSlider = document.getElementById('commute-hours');
    const commuteHoursValue = document.getElementById('commute-hours-value');
    const commuteHoursWeekly = document.getElementById('commute-hours-weekly');
    
    const otherHoursSlider = document.getElementById('other-hours');
    const otherHoursValue = document.getElementById('other-hours-value');
    
    const totalCommittedHours = document.getElementById('total-committed-hours');
    const availableHours = document.getElementById('available-hours');
    
    const workPercentageSlider = document.getElementById('work-percentage');
    const workPercentageValue = document.getElementById('work-percentage-value');
    const workHours = document.getElementById('work-hours');
    const lifeHours = document.getElementById('life-hours');
    
    const bufferHours = document.getElementById('buffer-hours');
    const adjustedWorkHours = document.getElementById('adjusted-work-hours');
    const adjustedLifeHours = document.getElementById('adjusted-life-hours');
    
    // Work task elements
    const workTaskName = document.getElementById('work-task-name');
    const workValueNowInputs = document.querySelectorAll('.work-value-now');
    const workValueFutureInputs = document.querySelectorAll('.work-value-future');
    const workValueNowScore = document.getElementById('work-value-now-score');
    const workValueFutureScore = document.getElementById('work-value-future-score');
    const workTaskTotalScore = document.getElementById('work-task-total-score');
    const workTasksTable = document.getElementById('work-tasks-table');
    const addWorkTaskBtn = document.getElementById('add-work-task-btn');
    
    // Life task elements
    const lifeTaskName = document.getElementById('life-task-name');
    const lifeValueNowInputs = document.querySelectorAll('.life-value-now');
    const lifeValueFutureInputs = document.querySelectorAll('.life-value-future');
    const lifeValueNowScore = document.getElementById('life-value-now-score');
    const lifeValueFutureScore = document.getElementById('life-value-future-score');
    const lifeTaskTotalScore = document.getElementById('life-task-total-score');
    const lifeTasksTable = document.getElementById('life-tasks-table');
    const addLifeTaskBtn = document.getElementById('add-life-task-btn');
    
    // Results screen elements
    const allTasksBtn = document.getElementById('all-tasks-btn');
    const workTasksBtn = document.getElementById('work-tasks-btn');
    const lifeTasksBtn = document.getElementById('life-tasks-btn');
    const matrixBubbles = document.getElementById('matrix-bubbles');
    const taskDetails = document.getElementById('task-details');
    const detailTaskName = document.getElementById('detail-task-name');
    const detailTaskCategory = document.getElementById('detail-task-category');
    const detailValueNow = document.getElementById('detail-value-now');
    const detailValueFuture = document.getElementById('detail-value-future');
    const detailTotalScore = document.getElementById('detail-total-score');
    const detailQuadrant = document.getElementById('detail-quadrant');
    const detailPercentage = document.getElementById('detail-percentage');
    const detailHours = document.getElementById('detail-hours');
    const resultsWorkTasks = document.getElementById('results-work-tasks');
    const resultsLifeTasks = document.getElementById('results-life-tasks');
    
    // Navigation buttons
    const getStartedBtn = document.getElementById('get-started-btn');
    const continueToTasksBtn = document.getElementById('continue-to-tasks-btn');
    const backToCalculatorBtn = document.getElementById('back-to-calculator-btn');
    const continueToLifeTasksBtn = document.getElementById('continue-to-life-tasks-btn');
    const backToWorkTasksBtn = document.getElementById('back-to-work-tasks-btn');
    const continueToResultsBtn = document.getElementById('continue-to-results-btn');
    const backToLifeTasksBtn = document.getElementById('back-to-life-tasks-btn');
    const startOverBtn = document.getElementById('start-over-btn');
    
    // Navigation between screens
    getStartedBtn.addEventListener('click', function() {
        welcomeScreen.classList.add('hidden');
        timeCalculatorScreen.classList.remove('hidden');
    });
    
    continueToTasksBtn.addEventListener('click', function() {
        // Save time data
        appData.timeData = {
            availableHours: parseFloat(availableHours.textContent),
            workPercentage: parseFloat(workPercentageValue.textContent),
            workHours: parseFloat(workHours.textContent),
            lifeHours: parseFloat(lifeHours.textContent),
            adjustedWorkHours: parseFloat(adjustedWorkHours.textContent),
            adjustedLifeHours: parseFloat(adjustedLifeHours.textContent)
        };
        
        timeCalculatorScreen.classList.add('hidden');
        workTasksScreen.classList.remove('hidden');
    });
    
    backToCalculatorBtn.addEventListener('click', function() {
        workTasksScreen.classList.add('hidden');
        timeCalculatorScreen.classList.remove('hidden');
    });
    
    continueToLifeTasksBtn.addEventListener('click', function() {
        workTasksScreen.classList.add('hidden');
        lifeTasksScreen.classList.remove('hidden');
    });
    
    backToWorkTasksBtn.addEventListener('click', function() {
        lifeTasksScreen.classList.add('hidden');
        workTasksScreen.classList.remove('hidden');
    });
    
    continueToResultsBtn.addEventListener('click', function() {
        lifeTasksScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        renderMatrix();
        updateResultsTables();
    });
    
    backToLifeTasksBtn.addEventListener('click', function() {
        resultsScreen.classList.add('hidden');
        lifeTasksScreen.classList.remove('hidden');
    });
    
    startOverBtn.addEventListener('click', function() {
        // Reset all data
        appData.workTasks = [];
        appData.lifeTasks = [];
        
        // Reset all form inputs
        resetWorkTaskForm();
        resetLifeTaskForm();
        
        // Go back to welcome screen
        resultsScreen.classList.add('hidden');
        welcomeScreen.classList.remove('hidden');
    });
    
    // Time calculator functionality
    function updateCalculations() {
        // Get values from sliders
        const sleepHours = parseFloat(sleepHoursSlider.value);
        const selfCareHours = parseFloat(selfCareHoursSlider.value);
        const commuteHours = parseFloat(commuteHoursSlider.value);
        const otherHours = parseFloat(otherHoursSlider.value);
        const workPercentage = parseFloat(workPercentageSlider.value);
        
        // Calculate weekly hours
        const sleepWeekly = sleepHours * 7;
        const selfCareWeekly = selfCareHours * 7;
        const commuteWeekly = commuteHours * 7;
        
        // Update display values
        sleepHoursValue.textContent = sleepHours;
        sleepHoursWeekly.textContent = sleepWeekly;
        
        selfCareHoursValue.textContent = selfCareHours;
        selfCareHoursWeekly.textContent = selfCareWeekly;
        
        commuteHoursValue.textContent = commuteHours;
        commuteHoursWeekly.textContent = commuteWeekly;
        
        otherHoursValue.textContent = otherHours;
        
        // Calculate total committed and available hours
        const committed = sleepWeekly + selfCareWeekly + commuteWeekly + otherHours;
        const available = 168 - committed;
        
        totalCommittedHours.textContent = committed.toFixed(1);
        availableHours.textContent = available.toFixed(1);
        
        // Calculate work/life balance
        const workHoursValue = (available * workPercentage / 100).toFixed(1);
        const lifeHoursValue = (available * (100 - workPercentage) / 100).toFixed(1);
        
        workPercentageValue.textContent = workPercentage;
        workHours.textContent = workHoursValue;
        lifeHours.textContent = lifeHoursValue;
        
        // Calculate buffer and adjusted hours
        const bufferValue = (available * 0.2).toFixed(1);
        const adjustedWorkValue = (workHoursValue * 0.8).toFixed(1);
        const adjustedLifeValue = (lifeHoursValue * 0.8).toFixed(1);
        
        bufferHours.textContent = bufferValue;
        adjustedWorkHours.textContent = adjustedWorkValue;
        adjustedLifeHours.textContent = adjustedLifeValue;
    }
    
    // Add event listeners to all sliders
    sleepHoursSlider.addEventListener('input', updateCalculations);
    selfCareHoursSlider.addEventListener('input', updateCalculations);
    commuteHoursSlider.addEventListener('input', updateCalculations);
    otherHoursSlider.addEventListener('input', updateCalculations);
    workPercentageSlider.addEventListener('input', updateCalculations);
    
    // Work task assessment functionality
    function updateWorkTaskScores() {
        let valueNowCount = 0;
        let valueFutureCount = 0;
        
        // Count checked values
        workValueNowInputs.forEach(input => {
            if (input.checked) {
                valueNowCount++;
            }
        });
        
        workValueFutureInputs.forEach(input => {
            if (input.checked) {
                valueFutureCount++;
            }
        });
        
        // Update score displays
        workValueNowScore.textContent = valueNowCount;
        workValueFutureScore.textContent = valueFutureCount;
        workTaskTotalScore.textContent = valueNowCount * valueFutureCount;
    }
    
    // Add event listeners to work task checkboxes
    workValueNowInputs.forEach(input => {
        input.addEventListener('change', updateWorkTaskScores);
    });
    
    workValueFutureInputs.forEach(input => {
        input.addEventListener('change', updateWorkTaskScores);
    });
    
    // Add work task button
    addWorkTaskBtn.addEventListener('click', function() {
        const name = workTaskName.value.trim();
        const valueNow = parseInt(workValueNowScore.textContent);
        const valueFuture = parseInt(workValueFutureScore.textContent);
        const score = valueNow * valueFuture;
        
        if (name === '') {
            alert('Please enter a task name');
            return;
        }
        
        // Create new task object
        const task = {
            id: Date.now(), // Use timestamp as unique ID
            name: name,
            valueNow: valueNow,
            valueFuture: valueFuture,
            score: score,
            category: 'work'
        };
        
        // Add to tasks array
        appData.workTasks.push(task);
        
        // Add to table
        addWorkTaskToTable(task);
        
        // Reset form
        resetWorkTaskForm();
    });
    
    // Function to add work task to table
    function addWorkTaskToTable(task) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-2">${task.name}</td>
            <td class="px-4 py-2 text-center">${task.valueNow}</td>
            <td class="px-4 py-2 text-center">${task.valueFuture}</td>
            <td class="px-4 py-2 text-center">${task.score}</td>
            <td class="px-4 py-2 text-center">
                <button class="delete-work-task text-red-500 hover:text-red-700" data-id="${task.id}">
                    Delete
                </button>
            </td>
        `;
        
        workTasksTable.appendChild(row);
        
        // Add event listener to delete button
        row.querySelector('.delete-work-task').addEventListener('click', function() {
            const taskId = parseInt(this.getAttribute('data-id'));
            deleteWorkTask(taskId, row);
        });
    }
    
    // Function to delete work task
    function deleteWorkTask(taskId, row) {
        // Remove from array
        appData.workTasks = appData.workTasks.filter(task => task.id !== taskId);
        
        // Remove from table
        row.remove();
    }
    
    // Function to reset work task form
    function resetWorkTaskForm() {
        workTaskName.value = '';
        
        workValueNowInputs.forEach(input => {
            input.checked = false;
        });
        
        workValueFutureInputs.forEach(input => {
            input.checked = false;
        });
        
        updateWorkTaskScores();
    }
    
    // Life task assessment functionality
    function updateLifeTaskScores() {
        let valueNowCount = 0;
        let valueFutureCount = 0;
        
        // Count checked values
        lifeValueNowInputs.forEach(input => {
            if (input.checked) {
                valueNowCount++;
            }
        });
        
        lifeValueFutureInputs.forEach(input => {
            if (input.checked) {
                valueFutureCount++;
            }
        });
        
        // Update score displays
        lifeValueNowScore.textContent = valueNowCount;
        lifeValueFutureScore.textContent = valueFutureCount;
        lifeTaskTotalScore.textContent = valueNowCount * valueFutureCount;
    }
    
    // Add event listeners to life task checkboxes
    lifeValueNowInputs.forEach(input => {
        input.addEventListener('change', updateLifeTaskScores);
    });
    
    lifeValueFutureInputs.forEach(input => {
        input.addEventListener('change', updateLifeTaskScores);
    });
    
    // Add life task button
    addLifeTaskBtn.addEventListener('click', function() {
        const name = lifeTaskName.value.trim();
        const valueNow = parseInt(lifeValueNowScore.textContent);
        const valueFuture = parseInt(lifeValueFutureScore.textContent);
        const score = valueNow * valueFuture;
        
        if (name === '') {
            alert('Please enter an activity name');
            return;
        }
        
        // Create new task object
        const task = {
            id: Date.now(), // Use timestamp as unique ID
            name: name,
            valueNow: valueNow,
            valueFuture: valueFuture,
            score: score,
            category: 'life'
        };
        
        // Add to tasks array
        appData.lifeTasks.push(task);
        
        // Add to table
        addLifeTaskToTable(task);
        
        // Reset form
        resetLifeTaskForm();
    });
    
    // Function to add life task to table
    function addLifeTaskToTable(task) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-2">${task.name}</td>
            <td class="px-4 py-2 text-center">${task.valueNow}</td>
            <td class="px-4 py-2 text-center">${task.valueFuture}</td>
            <td class="px-4 py-2 text-center">${task.score}</td>
            <td class="px-4 py-2 text-center">
                <button class="delete-life-task text-red-500 hover:text-red-700" data-id="${task.id}">
                    Delete
                </button>
            </td>
        `;
        
        lifeTasksTable.appendChild(row);
        
        // Add event listener to delete button
        row.querySelector('.delete-life-task').addEventListener('click', function() {
            const taskId = parseInt(this.getAttribute('data-id'));
            deleteLifeTask(taskId, row);
        });
    }
    
    // Function to delete life task
    function deleteLifeTask(taskId, row) {
        // Remove from array
        appData.lifeTasks = appData.lifeTasks.filter(task => task.id !== taskId);
        
        // Remove from table
        row.remove();
    }
    
    // Function to reset life task form
    function resetLifeTaskForm() {
        lifeTaskName.value = '';
        
        lifeValueNowInputs.forEach(input => {
            input.checked = false;
        });
        
        lifeValueFutureInputs.forEach(input => {
            input.checked = false;
        });
        
        updateLifeTaskScores();
    }
    
    // Matrix visualization functionality
    let currentFilter = 'all';
    
    // Filter buttons
    allTasksBtn.addEventListener('click', function() {
        currentFilter = 'all';
        allTasksBtn.classList.add('bg-gray-800', 'text-white');
        allTasksBtn.classList.remove('bg-gray-100', 'text-gray-800');
        
        workTasksBtn.classList.remove('bg-blue-600', 'text-white');
        workTasksBtn.classList.add('bg-blue-100', 'text-blue-800');
        
        lifeTasksBtn.classList.remove('bg-green-600', 'text-white');
        lifeTasksBtn.classList.add('bg-green-100', 'text-green-800');
        
        renderMatrix();
    });
    
    workTasksBtn.addEventListener('click', function() {
        currentFilter = 'work';
        workTasksBtn.classList.add('bg-blue-600', 'text-white');
        workTasksBtn.classList.remove('bg-blue-100', 'text-blue-800');
        
        allTasksBtn.classList.remove('bg-gray-800', 'text-white');
        allTasksBtn.classList.add('bg-gray-100', 'text-gray-800');
        
        lifeTasksBtn.classList.remove('bg-green-600', 'text-white');
        lifeTasksBtn.classList.add('bg-green-100', 'text-green-800');
        
        renderMatrix();
    });
    
    lifeTasksBtn.addEventListener('click', function() {
        currentFilter = 'life';
        lifeTasksBtn.classList.add('bg-green-600', 'text-white');
        lifeTasksBtn.classList.remove('bg-green-100', 'text-green-800');
        
        allTasksBtn.classList.remove('bg-gray-800', 'text-white');
        allTasksBtn.classList.add('bg-gray-100', 'text-gray-800');
        
        workTasksBtn.classList.remove('bg-blue-600', 'text-white');
        workTasksBtn.classList.add('bg-blue-100', 'text-blue-800');
        
        renderMatrix();
    });
    
    // Function to render matrix
    function renderMatrix() {
        // Clear matrix
        matrixBubbles.innerHTML = '';
        
        // Get tasks based on filter
        let tasks;
        if (currentFilter === 'all') {
            tasks = [...appData.workTasks, ...appData.lifeTasks];
        } else if (currentFilter === 'work') {
            tasks = appData.workTasks;
        } else {
            tasks = appData.lifeTasks;
        }
        
        // Add task bubbles to matrix
        tasks.forEach(task => {
            // Calculate bubble size based on score
            const minSize = 24;
            const maxSize = 64;
            const maxScore = 100;
            const size = minSize + (task.score / maxScore) * (maxSize - minSize);
            
            // Position based on value now (x) and value future (y)
            // We need to invert the y-axis for the visualization (10 at top, 1 at bottom)
            const xPos = `${task.valueNow * 10}%`;
            const yPos = `${(10 - task.valueFuture) * 10}%`;
            
            // Create bubble element
            const bubble = document.createElement('div');
            bubble.classList.add('absolute', 'rounded-full', 'flex', 'items-center', 'justify-center', 'cursor-pointer', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'transition-all', 'hover:opacity-90', 'hover:scale-110');
            
            if (task.category === 'work') {
                bubble.classList.add('bg-blue-500', 'text-white', 'font-bold');
            } else {
                bubble.classList.add('bg-green-500', 'text-white', 'font-bold');
            }
            
            bubble.style.left = xPos;
            bubble.style.top = yPos;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.fontSize = `${Math.max(10, size/3)}px`;
            
            bubble.textContent = task.name.slice(0, 2).toUpperCase();
            bubble.title = task.name;
            
            // Add data attributes for task details
            bubble.dataset.task = JSON.stringify(task);
            
            // Add event listener
            bubble.addEventListener('click', function() {
                showTaskDetails(task);
            });
            
            matrixBubbles.appendChild(bubble);
        });
    }
    
    // Function to show task details
    function showTaskDetails(task) {
        // Calculate percentages and hours
        let percentage, hours;
        
        if (task.category === 'work') {
            const totalWorkScore = appData.workTasks.reduce((sum, t) => sum + t.score, 0);
            percentage = ((task.score / totalWorkScore) * 100).toFixed(1);
            hours = ((task.score / totalWorkScore) * appData.timeData.adjustedWorkHours).toFixed(1);
        } else {
            const totalLifeScore = appData.lifeTasks.reduce((sum, t) => sum + t.score, 0);
            percentage = ((task.score / totalLifeScore) * 100).toFixed(1);
            hours = ((task.score / totalLifeScore) * appData.timeData.adjustedLifeHours).toFixed(1);
        }
        
        // Get quadrant
        let quadrant;
        if (task.valueNow >= 5 && task.valueFuture >= 5) {
            quadrant = "Focus (High Now, High Future)";
        } else if (task.valueNow >= 5 && task.valueFuture < 5) {
            quadrant = "Limit (High Now, Low Future)";
        } else if (task.valueNow < 5 && task.valueFuture >= 5) {
            quadrant = "Invest (Low Now, High Future)";
        } else {
            quadrant = "Avoid (Low Now, Low Future)";
        }
        
        // Update detail elements
        detailTaskName.textContent = task.name;
        detailTaskCategory.textContent = task.category === 'work' ? 'Work' : 'Life';
        detailValueNow.textContent = task.valueNow;
        detailValueFuture.textContent = task.valueFuture;
        detailTotalScore.textContent = task.score;
        detailQuadrant.textContent = quadrant;
        detailPercentage.textContent = percentage;
        detailHours.textContent = hours;
        
        // Show detail panel
        taskDetails.classList.remove('hidden');
    }
    
    // Function to update results tables
    function updateResultsTables() {
        // Clear tables
        resultsWorkTasks.innerHTML = '';
        resultsLifeTasks.innerHTML = '';
        
        // Calculate totals
        const totalWorkScore = appData.workTasks.reduce((sum, task) => sum + task.score, 0);
        const totalLifeScore = appData.lifeTasks.reduce((sum, task) => sum + task.score, 0);
        
        // Add work tasks to table
        appData.workTasks.forEach(task => {
            const percentage = ((task.score / totalWorkScore) * 100).toFixed(1);
            const hours = ((task.score / totalWorkScore) * appData.timeData.adjustedWorkHours).toFixed(1);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="py-2">${task.name}</td>
                <td class="py-2 text-center">${task.score}</td>
                <td class="py-2 text-center">${percentage}%</td>
                <td class="py-2 text-right">${hours}</td>
            `;
            
            resultsWorkTasks.appendChild(row);
        });
        
        // Add work tasks total row
        const workTotalRow = document.createElement('tr');
        workTotalRow.classList.add('font-bold');
        workTotalRow.innerHTML = `
            <td class="py-2">Total</td>
            <td class="py-2 text-center">${totalWorkScore}</td>
            <td class="py-2 text-center">100%</td>
            <td class="py-2 text-right">${appData.timeData.adjustedWorkHours}</td>
        `;
        resultsWorkTasks.appendChild(workTotalRow);
        
        // Add life tasks to table
        appData.lifeTasks.forEach(task => {
            const percentage = ((task.score / totalLifeScore) * 100).toFixed(1);
            const hours = ((task.score / totalLifeScore) * appData.timeData.adjustedLifeHours).toFixed(1);
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="py-2">${task.name}</td>
                <td class="py-2 text-center">${task.score}</td>
                <td class="py-2 text-center">${percentage}%</td>
                <td class="py-2 text-right">${hours}</td>
            `;
            
            resultsLifeTasks.appendChild(row);
        });
        
        // Add life tasks total row
        const lifeTotalRow = document.createElement('tr');
        lifeTotalRow.classList.add('font-bold');
        lifeTotalRow.innerHTML = `
            <td class="py-2">Total</td>
            <td class="py-2 text-center">${totalLifeScore}</td>
            <td class="py-2 text-center">100%</td>
            <td class="py-2 text-right">${appData.timeData.adjustedLifeHours}</td>
        `;
        resultsLifeTasks.appendChild(lifeTotalRow);
    }
    
    // Initialize app
    updateCalculations();
    updateWorkTaskScores();
    updateLifeTaskScores();
});
</script>
