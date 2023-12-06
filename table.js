function table(data) {

  var table;
  var dataset = [];

  updateTable(data);

  function formatTableData(data) {
    var tabledata = [];

    data.forEach(d => (
      tabledata.push(
        {
          "ID": d.id,
          "Position Title": d.PositionTitle,
          "Department": d.DepartmentName,
          "Location": d.PositionLocationDisplay,
          "Min Salary": parseFloat(d.PositionRemuneration[0].MinimumRange).toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
          "Max Salary": parseFloat(d.PositionRemuneration[0].MaximumRange).toLocaleString('en-US', {style: 'currency', currency: 'USD'}),
          "Schedule": d.PositionSchedule[0].Name,
          "Open Date": new Date(d.PositionStartDate).toLocaleDateString(),
          "Closing Date": new Date(d.PositionEndDate).toLocaleDateString(),
          "Travel": d.TravelPercentage,
          "Remote": d.RemoteIndicator ? "True" : "False",
          "Relocation": d.Relocation,
          "Telework": d.TeleworkEligible ? "True" : "False",
          "URL": d.PositionURI
        }
      )
    ));
    
    return tabledata;

  }


  // Function to update the word cloud with new data
  function updateTable(newData) {
    console.log("TABLE")
    console.log(newData)
    dataset = formatTableData(newData);
    console.log(this.tabl);
    if(table && typeof table.destroy === 'function'){ 
      table.destroy();
      console.log("destroyed");
    }
    table = new Tabulator("#bottom-container", {
      data: dataset, //assign data to table
      autoColumns: true, //create columns from data field names
    });
  
  }

  // Expose the updateWordCloud function if you want to update the word cloud externally
  this.updateTable = updateTable;

}


