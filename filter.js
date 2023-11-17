function fillFilterBox() {
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
  
    // Create a drop-down for companies
    const companyLabel = document.createElement('label');
    companyLabel.textContent = 'Company:';
    filterForm.appendChild(companyLabel);
  
    const companySelect = document.createElement('select');
    const companyOptions = ['Company A', 'Company B', 'Company C'];
    companyOptions.forEach((option) => {
      const companyOption = document.createElement('option');
      companyOption.value = option;
      companyOption.text = option;
      companySelect.appendChild(companyOption);
    });
    filterForm.appendChild(companySelect);
  
    // Create a drop-down for locations
    const locationLabel = document.createElement('label');
    locationLabel.textContent = 'Location:';
    filterForm.appendChild(locationLabel);
  
    const locationSelect = document.createElement('select');
    const locationOptions = ['Location X', 'Location Y', 'Location Z'];
    locationOptions.forEach((option) => {
      const locationOption = document.createElement('option');
      locationOption.value = option;
      locationOption.text = option;
      locationSelect.appendChild(locationOption);
    });
    filterForm.appendChild(locationSelect);
  
    // Create text boxes for min and max salary
    const salaryLabel = document.createElement('label');
    salaryLabel.textContent = 'Salary:';
    filterForm.appendChild(salaryLabel);
  
    const minSalaryInput = document.createElement('input');
    minSalaryInput.type = 'text';
    minSalaryInput.placeholder = 'Min';
    filterForm.appendChild(minSalaryInput);
  
    const maxSalaryInput = document.createElement('input');
    maxSalaryInput.type = 'text';
    maxSalaryInput.placeholder = 'Max';
    filterForm.appendChild(maxSalaryInput);
  
    // Create checkboxes
    const checkboxLabel = document.createElement('label');
    checkboxLabel.textContent = 'Options:';
    filterForm.appendChild(checkboxLabel);
  
    const checkbox1 = document.createElement('input');
    checkbox1.type = 'checkbox';
    filterForm.appendChild(checkbox1);
    filterForm.appendChild(document.createTextNode('Option 1'));
  
    const checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    filterForm.appendChild(checkbox2);
    filterForm.appendChild(document.createTextNode('Option 2'));
  
    const checkbox3 = document.createElement('input');
    checkbox3.type = 'checkbox';
    filterForm.appendChild(checkbox3);
    filterForm.appendChild(document.createTextNode('Option 3'));
  
    // Create another checkbox
    const additionalCheckboxLabel = document.createElement('label');
    additionalCheckboxLabel.textContent = 'Additional Option:';
    filterForm.appendChild(additionalCheckboxLabel);
  
    const additionalCheckbox = document.createElement('input');
    additionalCheckbox.type = 'checkbox';
    filterForm.appendChild(additionalCheckbox);
    filterForm.appendChild(document.createTextNode('Additional Option'));
  }
  
  fillFilterBox();
  