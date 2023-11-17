function fillTable() {
    const tableContainer = document.getElementById('bottom-container');
  
    const table = document.createElement('table');
    tableContainer.appendChild(table);
  
    const tableHeader = table.createTHead();
    const headerRow = tableHeader.insertRow();
    const headers = ['Job Title', 'Employer', 'Location', 'Min Salary', 'Max Salary', 'Telework', 'Reimbursement', 'Schedule', 'URL'];
  
    headers.forEach((headerText) => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
  
    const tableBody = table.createTBody();
  
    // Dummy data for the table
    const data = [
      ['Software Engineer', 'ABC Inc.', 'City A', '$80,000', '$120,000', 'Yes', 'Yes', 'Full-time', 'https://example.com/job1'],
      ['Data Analyst', 'XYZ Corp.', 'City B', '$60,000', '$90,000', 'No', 'No', 'Part-time', 'https://example.com/job2'],
      ['UX Designer', '123 Company', 'City C', '$70,000', '$110,000', 'Yes', 'Yes', 'Flexible', 'https://example.com/job3'],
      ['Project Manager', 'LMN Ltd.', 'City D', '$90,000', '$130,000', 'No', 'Yes', 'Full-time', 'https://example.com/job4'],
      ['Sales Representative', 'EFG Co.', 'City E', '$50,000', '$80,000', 'Yes', 'No', 'Commission-based', 'https://example.com/job5'],
      ['Software Engineer', 'ABC Inc.', 'City A', '$80,000', '$120,000', 'Yes', 'Yes', 'Full-time', 'https://example.com/job1'],
      ['Data Analyst', 'XYZ Corp.', 'City B', '$60,000', '$90,000', 'No', 'No', 'Part-time', 'https://example.com/job2'],
      ['UX Designer', '123 Company', 'City C', '$70,000', '$110,000', 'Yes', 'Yes', 'Flexible', 'https://example.com/job3'],
      ['Project Manager', 'LMN Ltd.', 'City D', '$90,000', '$130,000', 'No', 'Yes', 'Full-time', 'https://example.com/job4'],
      ['Sales Representative', 'EFG Co.', 'City E', '$50,000', '$80,000', 'Yes', 'No', 'Commission-based', 'https://example.com/job5'],
    ];
  
    data.forEach((rowData) => {
      const row = tableBody.insertRow();
      rowData.forEach((cellData) => {
        const cell = row.insertCell();
        cell.textContent = cellData;
      });
    });
  }
  
  fillTable();