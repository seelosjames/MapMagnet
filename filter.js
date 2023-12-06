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
  departmentLabel.textContent = 'Department: ';
  filterForm.appendChild(departmentLabel);

  const departmentSelect = document.createElement('select');
  const departmentOptions = ['None', 'Court Services and Offender Supervision Agency for DC', 'Department of Agriculture', 'Department of Commerce', 'Department of Defense', 'Department of Energy', 'Department of Health and Human Services', 'Department of Homeland Security'
  , 'Department of Housing and Urban Development', 'Department of Justice', 'Department of Labor', 'Department of State', 'Department of Air Force', 'Department of Army', 'Department of Interior', 'Department of Navy', 'Department of Treasury', 'Department of Transportation', 'Department of Veterans Affairs'
  , 'General Services Administration', 'Judicial Branch', 'Legislative Branch', 'NASA', 'National Foundation on the Arts and the Humanities', 'Other Agencies and Independent Organizations'];
  departmentOptions.forEach((option) => {
    const departmentOption = document.createElement('option');
    departmentOption.value = option;
    departmentOption.text = option;
    departmentSelect.appendChild(departmentOption);
  });
  filterForm.appendChild(departmentSelect);
  filterForm.appendChild(document.createElement('br')); // New line


  // Location
  const locationLabel = document.createElement('label');
  locationLabel.textContent = 'Location: ';
  filterForm.appendChild(locationLabel);

  const locationSelect = document.createElement('select');
  const locationOptions = ["None","Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana",
    "Iowa","Kansas","Kentucky","Louisiana", "Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
    "New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
    "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"
  ];
  locationOptions.forEach((option) => {
    const locationOption = document.createElement('option');
    locationOption.value = option;
    locationOption.text = option;
    locationSelect.appendChild(locationOption);
  });
  filterForm.appendChild(locationSelect);
  filterForm.appendChild(document.createElement('br')); // New line


  // Schedule
  const scheduleLabel = document.createElement('label');
  scheduleLabel.textContent = 'Schedule: ';
  filterForm.appendChild(scheduleLabel);

  const scheduleSelect = document.createElement('select');
  const scheduleOptions = ["None", "Full-time", "Part-time", "Shift work", "Intermittent", "Job sharing", "Multiple schedules"];
  scheduleOptions.forEach((option) => {
    const scheduleOption = document.createElement('option');
    scheduleOption.value = option;
    scheduleOption.text = option;
    scheduleSelect.appendChild(scheduleOption);
  });
  filterForm.appendChild(scheduleSelect);
  filterForm.appendChild(document.createElement('br')); // New line


    // Travel
    const travelLabel = document.createElement('label');
    travelLabel.textContent = 'Travel: ';
    filterForm.appendChild(travelLabel);
  
    const travelSelect = document.createElement('select');
    const travelOptions = ["None", "Not required", "Occasional travel", "25% or less", "50% or less", "75% or less", "76% or greater"];
    travelOptions.forEach((option) => {
      const travelOption = document.createElement('option');
      travelOption.value = option;
      travelOption.text = option;
      travelSelect.appendChild(travelOption);
    });
    filterForm.appendChild(travelSelect);
    filterForm.appendChild(document.createElement('br')); // New line


  // Salary
  const salaryLabel = document.createElement('label');
  salaryLabel.textContent = 'Salary: ';
  filterForm.appendChild(salaryLabel);

  const minSalarySelect = document.createElement('select');
  filterForm.appendChild(minSalarySelect);

  const maxSalarySelect = document.createElement('select');
  filterForm.appendChild(maxSalarySelect);

  const minSalary = 0;
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
  const remoteLabel = document.createElement('label');
  remoteLabel.textContent = "Remote: ";
  const remoteCheckbox = document.createElement('input');
  remoteCheckbox.type = 'checkbox';
  filterForm.appendChild(remoteLabel);
  filterForm.appendChild(remoteCheckbox);
  filterForm.appendChild(document.createElement('br')); // New line
  // var securityState = False;


  // Telework
  const teleworkLabel = document.createElement('label');
  teleworkLabel.textContent = "Telework: ";
  const teleworkCheckbox = document.createElement('input');
  teleworkCheckbox.type = 'checkbox';
  filterForm.appendChild(teleworkLabel);
  filterForm.appendChild(teleworkCheckbox);
  filterForm.appendChild(document.createElement('br')); // New line


  // Relocation Reimbursement
  const relocationReimbursementLabel = document.createElement('label');
  relocationReimbursementLabel.textContent = "Relocation: ";
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





  function onFilterChange() {
    // console.log()

    const selectedFilters = {
      department: departmentSelect.value,
      location: locationSelect.value,
      minSalary: parseInt(minSalarySelect.value, 10),
      maxSalary: parseInt(maxSalarySelect.value, 10),
      remote: remoteCheckbox.checked,
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
  locationSelect.addEventListener('change', onFilterChange);
  minSalarySelect.addEventListener('change', salaryChange);
  maxSalarySelect.addEventListener('change', salaryChange);
  remoteCheckbox.addEventListener('change', onFilterChange);
  teleworkCheckbox.addEventListener('change', onFilterChange);
  relocationReimbursementCheckbox.addEventListener('change', onFilterChange);

}
