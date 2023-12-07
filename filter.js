function filter() {
  const filterBox = document.getElementById('bottom-container-left');

  // Create a form element
  const filterForm = document.createElement('form');
  filterBox.appendChild(filterForm);

  // data = [{"id":"585167300","PositionTitle":"Information and Arts Family",
  // "PositionURI":"https://www.usajobs.gov:443/GetJob/ViewDetails/585167300",
  // "PositionLocationDisplay":"Location Negotiable After Selection, United States",
  // "PositionLocation":[
  //   {"LocationName":"Albuquerque, New Mexico","CountryCode":"United States","CountrySubDivisionCode":"New Mexico","CityName":"Albuquerque, New Mexico","Longitude":-106.649,"Latitude":35.0842},
  //   {"LocationName":"Oklahoma City, Oklahoma","CountryCode":"United States","CountrySubDivisionCode":"Oklahoma","CityName":"Oklahoma City, Oklahoma","Longitude":-97.52033,"Latitude":35.472004},{"LocationName":"Portland, Oregon","CountryCode":"United States","CountrySubDivisionCode":"Oregon","CityName":"Portland, Oregon","Longitude":-122.67563,"Latitude":45.511795},{"LocationName":"Kansas City, Missouri","CountryCode":"United States","CountrySubDivisionCode":"Missouri","CityName":"Kansas City, Missouri","Longitude":-94.58306,"Latitude":39.10296},
  //   {"LocationName":"Chicago, Illinois","CountryCode":"United States","CountrySubDivisionCode":"Illinois","CityName":"Chicago, Illinois","Longitude":-87.63241,"Latitude":41.88415},{"LocationName":"Denver, Colorado","CountryCode":"United States","CountrySubDivisionCode":"Colorado","CityName":"Denver, Colorado","Longitude":-104.992256,"Latitude":39.74001},{"LocationName":"Washington, District of Columbia","CountryCode":"United States","CountrySubDivisionCode":"District of Columbia","CityName":"Washington, District of Columbia","Longitude":-77.032,"Latitude":38.8904},{"LocationName":"Atlanta, Georgia","CountryCode":"United States","CountrySubDivisionCode":"Georgia","CityName":"Atlanta, Georgia","Longitude":-84.39111,"Latitude":33.748314},{"LocationName":"Minneapolis, Minnesota","CountryCode":"United States","CountrySubDivisionCode":"Minnesota","CityName":"Minneapolis, Minnesota","Longitude":-93.26493,"Latitude":44.979034},{"LocationName":"Seattle, Washington","CountryCode":"United States","CountrySubDivisionCode":"Washington","CityName":"Seattle, Washington","Longitude":-122.32945,"Latitude":47.60358},{"LocationName":"Los Angeles, California","CountryCode":"United States","CountrySubDivisionCode":"California","CityName":"Los Angeles, California","Longitude":-118.245,"Latitude":34.0535},{"LocationName":"Phoenix, Arizona","CountryCode":"United States","CountrySubDivisionCode":"Arizona","CityName":"Phoenix, Arizona","Longitude":-112.075775,"Latitude":33.44826},{"LocationName":"Indianapolis, Indiana","CountryCode":"United States","CountrySubDivisionCode":"Indiana","CityName":"Indianapolis, Indiana","Longitude":-86.14996,"Latitude":39.76691},
  //   {"LocationName":"Miami, Florida","CountryCode":"United States","CountrySubDivisionCode":"Florida","CityName":"Miami, Florida","Longitude":-80.23742,"Latitude":25.728985},{"LocationName":"New York, New York","CountryCode":"United States","CountrySubDivisionCode":"New York","CityName":"New York, New York","Longitude":-74.0071,"Latitude":40.7146},{"LocationName":"New Orleans, Louisiana","CountryCode":"United States","CountrySubDivisionCode":"Louisiana","CityName":"New Orleans, Louisiana","Longitude":-90.07771,"Latitude":29.95369},{"LocationName":"Salt Lake City, Utah","CountryCode":"United States","CountrySubDivisionCode":"Utah","CityName":"Salt Lake City, Utah","Longitude":-111.88823,"Latitude":40.75952},{"LocationName":"San Francisco, California","CountryCode":"United States","CountrySubDivisionCode":"California","CityName":"San Francisco, California","Longitude":-122.4196,"Latitude":37.7771},{"LocationName":"Boston, Massachusetts","CountryCode":"United States","CountrySubDivisionCode":"Massachusetts","CityName":"Boston, Massachusetts","Longitude":-71.0567,"Latitude":42.358635},{"LocationName":"Austin, Texas","CountryCode":"United States","CountrySubDivisionCode":"Texas","CityName":"Austin, Texas","Longitude":-97.743,"Latitude":30.2676}
  // ],"PositionSchedule":[{"Name":"Multiple Schedules","Code":"6"}],"OrganizationName":"Department of the Air Force - Agency Wide","DepartmentName":"Department of the Air Force","JobCategory":[{"Name":"General Arts And Information","Code":"1001"},{"Name":"Museum Curator","Code":"1015"},{"Name":"Public Affairs","Code":"1035"},{"Name":"Language Specialist","Code":"1040"},{"Name":"Visual Information","Code":"1084"}],"PositionRemuneration":[{"MinimumRange":"20172.0","MaximumRange":"146757.0","RateIntervalCode":"PA","Description":"Per Year"}],"PositionStartDate":"2022-11-30T00:00:00.0000","PositionEndDate":"2023-11-29T23:59:59.9970","TravelCode":"0","TravelPercentage":"Not required","TeleworkEligible":false,"RemoteIndicator":false,"Relocation":"False","Tokens":["art","language","curator","affair","general","family","museum","specialist","visual","additional","air","public","force","hire","please","opportunity","information","click","direct"]}]

  // console.log(data);

  // console.log(data.filter(item => {
  //   console.log(item.PositionSchedule.some(s => s.Name))
  //   return item.PositionSchedule.some(s => s.Name == "Multiple Schedules");
  // }))

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
  departmentSelect.setAttribute("id", "department")
  const departmentOption = document.createElement('option');
  departmentOption.value = "None";
  departmentOption.text = "None";
  departmentSelect.appendChild(departmentOption);
  db.myDataStore.toArray().then(allData => {
    const uniqueDepartmentNames = new Set(allData.map(item => item.DepartmentName));
    const departmentOptions = Array.from(uniqueDepartmentNames);
    departmentOptions.forEach((option) => {
      console.log(option)
      const departmentOption = document.createElement('option');
      departmentOption.value = option;
      departmentOption.text = option;
      departmentSelect.appendChild(departmentOption);
    });
    departmentLabel.appendChild(departmentSelect);
    departmentLabel.appendChild(document.createElement('br')); // New line
  })
  
  // Location
  const locationLabel = document.createElement('label');
  locationLabel.textContent = 'Location: ';
  filterForm.appendChild(locationLabel);

  const locationSelect = document.createElement('select');
  const locationOptions = ["None","Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware", "District of Columbia", "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana",
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
  scheduleSelect.setAttribute("id", "schedule")
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
    travelSelect.setAttribute("id", "travel")
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
  minSalarySelect.setAttribute("id", "minSalary")
  filterForm.appendChild(minSalarySelect);

  const maxSalarySelect = document.createElement('select');
  maxSalarySelect.setAttribute("id", "maxSalary")
  filterForm.appendChild(maxSalarySelect);

  const minSalary = 0;
  const maxSalary = 450000;
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
  remoteCheckbox.setAttribute("id", "remote")
  remoteCheckbox.indeterminate = true
  remoteCheckbox.addEventListener('click', () => {
    if (remoteCheckbox.indeterminate) {
      remoteCheckbox.checked = true;
    } else if (remoteCheckbox.checked) {
      remoteCheckbox.checked = false;
    } else {
      remoteCheckbox.indeterminate = true;
    }
  });
  filterForm.appendChild(remoteLabel);
  filterForm.appendChild(remoteCheckbox);
  filterForm.appendChild(document.createElement('br')); // New line
  // var securityState = False;


  // Telework
  const teleworkLabel = document.createElement('label');
  teleworkLabel.textContent = "Telework: ";
  const teleworkCheckbox = document.createElement('input');
  teleworkCheckbox.setAttribute("id", "telework")
  teleworkCheckbox.type = 'checkbox';
  teleworkCheckbox.indeterminate = true
  teleworkCheckbox.addEventListener('click', () => {
    if (teleworkCheckbox.indeterminate) {
      teleworkCheckbox.checked = true;
    } else if (teleworkCheckbox.checked) {
      teleworkCheckbox.checked = false;
    } else {
      teleworkCheckbox.indeterminate = true;
    }
  });
  filterForm.appendChild(teleworkLabel);
  filterForm.appendChild(teleworkCheckbox);
  filterForm.appendChild(document.createElement('br')); // New line


  // Relocation Reimbursement
  const relocationReimbursementLabel = document.createElement('label');
  relocationReimbursementLabel.textContent = "Relocation: ";
  const relocationReimbursementCheckbox = document.createElement('input');
  relocationReimbursementCheckbox.type = 'checkbox';
  relocationReimbursementCheckbox.indeterminate = true
  relocationReimbursementCheckbox.addEventListener('click', () => {
    if (relocationReimbursementCheckbox.indeterminate) {
      relocationReimbursementCheckbox.checked = true;
    } else if (relocationReimbursementCheckbox.checked) {
      relocationReimbursementCheckbox.checked = false;
    } else {
      relocationReimbursementCheckbox.indeterminate = true;
    }
  });
  filterForm.appendChild(relocationReimbursementLabel);
  filterForm.appendChild(relocationReimbursementCheckbox);
  filterForm.appendChild(document.createElement('br')); // New line


  this.onFilterChange = function() {
    // console.log()

    const selectedFilters = {
      department: departmentSelect.value,
      position:"adfasdf", 
      location: {"state": locationSelect.value, "city": "None"},
      minSalary: parseInt(minSalarySelect.value, 10),
      maxSalary: parseInt(maxSalarySelect.value, 10),
      schedule: scheduleSelect.value,
      travel: travelSelect.value,
      remote: remoteCheckbox.indeterminate ? null : remoteCheckbox.checked,
      telework: teleworkCheckbox.indeterminate ? null : teleworkCheckbox.checked,
      relocation: relocationReimbursementCheckbox.indeterminate ? null : relocationReimbursementCheckbox.checked,
    };
    // filterJobs(selectedFilters);
    return selectedFilters;
    // applyFilters();
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
  // departmentSelect.addEventListener('change', onFilterChange);
  // locationSelect.addEventListener('change', onFilterChange);
  // minSalarySelect.addEventListener('change', salaryChange);
  // maxSalarySelect.addEventListener('change', salaryChange);
  // remoteCheckbox.addEventListener('change', onFilterChange);
  // teleworkCheckbox.addEventListener('change', onFilterChange);
  // relocationReimbursementCheckbox.addEventListener('change', onFilterChange);

}
