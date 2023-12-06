function filter() {
  const filterBox = document.getElementById('bottom-container-left');

  // Create a form element
  const filterForm = document.createElement('form');
  filterBox.appendChild(filterForm);


  // // Job Title
  // const titleLabel = document.createElement('label');
  // titleLabel.textContent = 'Job Title:';
  // filterForm.appendChild(titleLabel);

  // const titleInput = document.createElement('input');
  // titleInput.type = 'text';
  // filterForm.appendChild(titleInput);
  // filterForm.appendChild(document.createElement('br')); // New line


  // Department
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


  // // Grade
  // const gradeLabel = document.createElement('label');
  // gradeLabel.textContent = 'Grade:';
  // filterForm.appendChild(gradeLabel);

  // const minGradeInput = document.createElement('input');
  // minGradeInput.type = 'text';
  // minGradeInput.placeholder = 'Min';
  // filterForm.appendChild(minGradeInput);

  // const maxGradeInput = document.createElement('input');
  // maxGradeInput.type = 'text';
  // maxGradeInput.placeholder = 'Max';
  // filterForm.appendChild(maxGradeInput);
  // filterForm.appendChild(document.createElement('br')); // New line


  // Salary
  const salaryLabel = document.createElement('label');
  salaryLabel.textContent = 'Salary:';
  filterForm.appendChild(salaryLabel);

  const minSalarySelect = document.createElement('select');
  filterForm.appendChild(minSalarySelect);

  const maxSalarySelect = document.createElement('select');
  filterForm.appendChild(maxSalarySelect);

  const minSalary = 60000;
  const maxSalary = 120000;
  const increment = 5000;

  for (let salary = minSalary; salary <= maxSalary; salary += increment) {
    const option = document.createElement('option');
    option.value = salary;
    option.textContent = `$${salary.toLocaleString()}`;
    minSalarySelect.appendChild(option);
  }

  for (let salary = maxSalary; salary >= minSalary; salary -= increment) {
    const option = document.createElement('option');
    option.value = salary;
    option.textContent = `$${salary.toLocaleString()}`;
    maxSalarySelect.appendChild(option);
  }

  filterForm.appendChild(document.createElement('br')); // New line

  // Security Clearance
  const securityClearanceLabel = document.createElement('label');
  securityClearanceLabel.textContent = "Security";
  const securityClearanceCheckbox = document.createElement('input');
  securityClearanceCheckbox.type = 'checkbox';
  filterForm.appendChild(securityClearanceLabel);
  filterForm.appendChild(securityClearanceCheckbox);
  filterForm.appendChild(document.createElement('br')); // New line
  // var securityState = False;


  // Telework
  const teleworkLabel = document.createElement('label');
  teleworkLabel.textContent = "Telework";
  const teleworkCheckbox = document.createElement('input');
  teleworkCheckbox.type = 'checkbox';
  filterForm.appendChild(teleworkLabel);
  filterForm.appendChild(teleworkCheckbox);
  filterForm.appendChild(document.createElement('br')); // New line


  // Relocation Reimbursement
  const relocationReimbursementLabel = document.createElement('label');
  relocationReimbursementLabel.textContent = "Relocation";
  const relocationReimbursementCheckbox = document.createElement('input');
  relocationReimbursementCheckbox.type = 'checkbox';
  filterForm.appendChild(relocationReimbursementLabel);
  filterForm.appendChild(relocationReimbursementCheckbox);
  filterForm.appendChild(document.createElement('br')); // New line


  var myButton = document.createElement("button");
  myButton.id = "mybutton";
  myButton.textContent = "Click me!";
  myButton.addEventListener("click", function() {
    // Your code to be executed when the button is clicked
    alert("Button Clicked!");
  });
  filterForm.appendChild(myButton);



  // // Schedule
  // const workScheduleLabel = document.createElement('label');
  // workScheduleLabel.textContent = 'Work Schedule:';
  // filterForm.appendChild(workScheduleLabel);
  // const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // daysOfWeek.forEach((day) => {
  //   const dayLabel = document.createElement('label');
  //   dayLabel.textContent = day;

  //   const dayCheckbox = document.createElement('input');
  //   dayCheckbox.type = 'checkbox';

  //   filterForm.appendChild(dayLabel);
  //   filterForm.appendChild(dayCheckbox);
  // });


  function onFilterChange() {
    // console.log()

    const selectedFilters = {
      department: departmentSelect.value,
      minSalary: parseInt(minSalarySelect.value, 10),
      maxSalary: parseInt(maxSalarySelect.value, 10),
      securityClearance: securityClearanceCheckbox.checked,
      telework: teleworkCheckbox.checked,
      relocationReimbursement: relocationReimbursementCheckbox.checked,
    };
    filterJobs(selectedFilters);
    applyFilters();
  }

  function salaryChange() {
    // Get the selected values from dropdowns
    const selectedMinSalary = parseInt(minSalarySelect.value, 10);
    const selectedMaxSalary = parseInt(maxSalarySelect.value, 10);

    // Ensure min salary is not larger than max salary and vice versa
    if (selectedMinSalary > selectedMaxSalary) {
      alert('Min salary cannot be larger than max salary.');
      return;
    } else {
      onFilterChange();
    }
  }

  // Add Event Listeners to the Filters
  departmentSelect.addEventListener('change', onFilterChange);
  minSalarySelect.addEventListener('change', salaryChange);
  maxSalarySelect.addEventListener('change', salaryChange);
  securityClearanceCheckbox.addEventListener('change', onFilterChange);
  teleworkCheckbox.addEventListener('change', onFilterChange);
  relocationReimbursementCheckbox.addEventListener('change', onFilterChange);

}
