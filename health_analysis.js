    const addPatientButton = document.getElementById("addPatient");
    const report = document.getElementById("report");
    const btnSearch = document.getElementById('btnSearch');
    const patients = [];

// -- Creating the function that adds the patient details --

// Function captures user-entered data from the HTML form elements:
// name, gender, age, and medical condition. 
// It ensures that all fields have valid inputs.
function addPatient() {
    // retrieves patient's details in the form
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    // appends patient's data into array
    if (name && gender && age && condition) {
    patients.push({ name, gender: gender.value, age, condition });
    // reset form fields for the next entry
    resetForm();
    // triggers method to update and display analyis report based on new data
    generateReport();
    }

    // -- Creating a function to reset form values --

    // function clear the values of fields in html form
    // by setting them to empty strings or unchecked buttons (inital state)
    function resetForm() {
        document.getElementById("name").value = "";
        document.querySelector('input[name="gender"]:checked').checked = false;
        document.getElementById("age").value = "";
        document.getElementById("condition").value = "";
    }


    // function calculates and constructs an analysis report based 
    // on collected patient data stored in patients[]
    function generateReport() {

        // Initialization :
            // total number of patients stored in patients[]
        const numPatients = patients.length;

            // object initializing counters for specific medical conditions,
            // initially set to zero
        const conditionsCount = {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
        };
            // nested object with gender-specific condition counters 
            // for each medical condition (also set as 0 for each condition) 
        const genderConditionsCount = {
        Male: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        },
        Female: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        },
        };

        // Data processing loop :
            // iterates throug each patient's data in patients[]
        for (const patient of patients) {
        conditionsCount[patient.condition]++;
        genderConditionsCount[patient.gender][patient.condition]++;
        }

        // HTML update :
            // dinamically updates the html content within the designated report element
        report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
        report.innerHTML += `Conditions Breakdown:<br>`;
            // conditions breakdown:
            // lists the counts for each medical condition in the conditionsCount object 
        for (const condition in conditionsCount) {
        report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
        }

        report.innerHTML += `<br>Gender-Based Conditions:<br>`;

        // Illustrates counts of each condition categorized by gender
        // in the genderConditionsCount object, showing the 
        // distribution of conditions among males and females separately.
        for (const gender in genderConditionsCount) {
        report.innerHTML += `${gender}:<br>`;
        for (const condition in genderConditionsCount[gender]) {
            report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
        }
      }
    }
    // event listener :
        // adds patient details when user clicks the Add Patient button
    addPatientButton.addEventListener("click", addPatient);

}


