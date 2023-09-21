const dataFile = chrome.runtime.getURL('data.json');

// Fetch the data from the file
async function fetchData() {
  const response = await fetch(dataFile);
  const data = await response.json();
  return data;
}

// Once the data is fetched, populate the autofill form with the data
fetchData().then(data => {
  // Get the autofill form elements
  const formElements = document.querySelectorAll('input, select, textarea');

  // For each autofill form element, find the corresponding item in the data
  for (const element of formElements) {
    const elementName = element.name;
    const dataItem = data.find(item => item.name === elementName);

    // If there is a matching item in the data, set the value of the autofill form element
    if (dataItem) {
      element.value = dataItem.value;
    }
  }
});