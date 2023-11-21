function filter() {
  const filterBox = document.getElementById('bottom-container-left');

  // Create a form element
  const filterForm = document.createElement('form');
  filterBox.appendChild(filterForm);

  // Create a text box for job title
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Job Title:';
  filterForm.appendChild(titleLabel);

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  filterForm.appendChild(titleInput);
  filterForm.appendChild(document.createElement('br')); // New line

  // Create a drop-down for hiring department (formerly Company)
  const departmentLabel = document.createElement('label');
  departmentLabel.textContent = 'Hiring Department:';
  filterForm.appendChild(departmentLabel);

  const departmentSelect = document.createElement('select');
  const departmentOptions = ['None', 'Department 1', 'Department 2', 'Department 3'];
  departmentOptions.forEach((option) => {
    const departmentOption = document.createElement('option');
    departmentOption.value = option;
    departmentOption.text = option;
    departmentSelect.appendChild(departmentOption);
  });
  filterForm.appendChild(departmentSelect);
  filterForm.appendChild(document.createElement('br')); // New line

  // Create text boxes for min and max grade
  const gradeLabel = document.createElement('label');
  gradeLabel.textContent = 'Grade:';
  filterForm.appendChild(gradeLabel);

  const minGradeInput = document.createElement('input');
  minGradeInput.type = 'text';
  minGradeInput.placeholder = 'Min';
  filterForm.appendChild(minGradeInput);

  const maxGradeInput = document.createElement('input');
  maxGradeInput.type = 'text';
  maxGradeInput.placeholder = 'Max';
  filterForm.appendChild(maxGradeInput);
  filterForm.appendChild(document.createElement('br')); // New line

  // Create labels and text boxes for min and max salary on the same line
  const salaryLabel = document.createElement('label');
  salaryLabel.textContent = 'Salary:';
  filterForm.appendChild(salaryLabel);

  const minSalaryInput = document.createElement('input');
  minSalaryInput.type = 'text';
  minSalaryInput.placeholder = 'Min';
  minSalaryInput.style.display = 'inline-block'; // Display inline-block
  filterForm.appendChild(minSalaryInput);

  const maxSalaryInput = document.createElement('input');
  maxSalaryInput.type = 'text';
  maxSalaryInput.placeholder = 'Max';
  maxSalaryInput.style.display = 'inline-block'; // Display inline-block
  filterForm.appendChild(maxSalaryInput);
  filterForm.appendChild(document.createElement('br')); // New line

  // Create a drop-down for payscale
  const payscaleLabel = document.createElement('label');
  payscaleLabel.textContent = 'Payscale:';
  filterForm.appendChild(payscaleLabel);

  const payscaleSelect = document.createElement('select');
  const payscaleOptions = ['Payscale 1', 'Payscale 2', 'Payscale 3'];
  payscaleOptions.forEach((option) => {
    const payscaleOption = document.createElement('option');
    payscaleOption.value = option;
    payscaleOption.text = option;
    payscaleSelect.appendChild(payscaleOption);
  });
  filterForm.appendChild(payscaleSelect);
  filterForm.appendChild(document.createElement('br')); // New line

  // Create checkboxes for security clearance, telework, and relocation reimbursement
  const checkboxLabels = ['Security Clearance', 'Telework', 'Relocation Reimbursement'];

  const securityClearanceLabel = document.createElement('label');
  securityClearanceLabel.textContent = "Security";

  const securityClearanceCheckbox = document.createElement('input');
  securityClearanceCheckbox.type = 'checkbox';

  filterForm.appendChild(securityClearanceLabel);
  filterForm.appendChild(securityClearanceCheckbox);
  filterForm.appendChild(document.createElement('br')); // New line

  // Create a row of checkboxes for each day of the week for work schedule
  const workScheduleLabel = document.createElement('label');
  workScheduleLabel.textContent = 'Work Schedule:';
  filterForm.appendChild(workScheduleLabel);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  daysOfWeek.forEach((day) => {
    const dayLabel = document.createElement('label');
    dayLabel.textContent = day;

    const dayCheckbox = document.createElement('input');
    dayCheckbox.type = 'checkbox';

    filterForm.appendChild(dayLabel);
    filterForm.appendChild(dayCheckbox);
  });


  // Add Event Listeners

  function onFilterChange() {
    // Get the selected values from filter elements

    console.log(securityClearanceCheckbox.value)
    const selectedFilters = {
      department: departmentSelect.value,
      security_clearance: securityClearanceCheckbox.value
    };

    // Call the filterJobs function with the selected filters
    filterJobs(selectedFilters);
  }
  console.log(securityClearanceCheckbox.value)
  departmentSelect.addEventListener('change', onFilterChange);
  securityClearanceCheckbox.addEventListener('change', onFilterChange);

}
