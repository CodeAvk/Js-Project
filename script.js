var data = [
  {
    id: 10,
    name: "PARCEL1",
    sequence: 1,
    group: "Mumbai",
  },
  {
    id: 11,
    name: "PARCEL2",
    sequence: 2,
    group: "Mumbai",
  },
  {
    id: 13,
    name: "PARCEL3",
    sequence: 3,
    group: "Mumbai",
  },
  {
    id: 19,
    name: "PARCEL4",
    sequence: 4,
    group: "Delhi",
  },
  {
    id: 18,
    name: "PARCEL5",
    sequence: 5,
    group: "Delhi",
  },
  {
    id: 21,
    name: "PARCEL6",
    sequence: 6,
    group: "Kolkata",
  },
  {
    id: 12,
    name: "PARCEL7",
    sequence: 7,
    group: "Kolkata",
  },
  {
    id: 22,
    name: "PARCEL8",
    sequence: 8,
    group: "Kolkata",
  },
  {
    id: 23,
    name: "PARCEL9",
    sequence: 9,
    group: "Kolkata",
  },
  {
    id: 24,
    name: "PARCEL10",
    sequence: 10,
    group: "Mumbai",
  },
  {
    id: 25,
    name: "PARCEL11",
    sequence: 11,
    group: "Mumbai",
  },
  {
    id: 31,
    name: "PARCEL12",
    sequence: 12,
    group: "Mumbai",
  },
  {
    id: 34,
    name: "PARCEL13",
    sequence: 13,
    group: "Mumbai",
  },
  {
    id: 35,
    name: "PARCEL14",
    sequence: 14,
    group: "Delhi",
  },
  {
    id: 41,
    name: "PARCEL15",
    sequence: 15,
    group: "Delhi",
  },
  {
    id: 42,
    name: "PARCEL16",
    sequence: 16,
    group: "Delhi",
  },
  {
    id: 43,
    name: "PARCEL17",
    sequence: 17,
    group: "Delhi",
  },
  {
    id: 44,
    name: "PARCEL18",
    sequence: 18,
    group: "Kolkata",
  },
  {
    id: 53,
    name: "PARCEL19",
    sequence: 19,
    group: "Kolkata",
  },
  {
    id: 57,
    name: "PARCEL2",
    sequence: 20,
    group: "Kolkata",
  },
];

var parcelsContainer = document.getElementById("parcels-container");
var selectedParcelElement = document.getElementById("selected-parcel");
var nameInput = document.getElementById("name-input");
var groupSelect = document.getElementById("group-select");
var addAfterBtn = document.getElementById("add-after-btn");
var addBeforeBtn = document.getElementById("add-before-btn");
var replaceBtn = document.getElementById("replace-btn");
var deleteBtn = document.getElementById("delete-btn");
var refreshBtn = document.getElementById("refresh-btn");
var showFinalBtn = document.getElementById("show-final-btn");

var selectedParcel = null;

function renderParcels() {
  parcelsContainer.innerHTML = "";

  data.sort(function (a, b) {
    return a.sequence - b.sequence;
  });

  var parcelsGroup = document.createElement("div");
  parcelsGroup.className = "parcels-group";

  data.forEach(function (parcel) {
    var groupName = parcel.group.toLowerCase();
    var parcelElement = document.createElement("div");
    parcelElement.className = "parcel " + groupName;
    parcelElement.textContent = parcel.name + " (" + parcel.sequence + ")";
    parcelsGroup.appendChild(parcelElement);
  });

  parcelsContainer.appendChild(parcelsGroup);
  updateSelectedParcelDisplay();
}

function updateSelectedParcelDisplay() {
  selectedParcelElement.textContent =
    "Selected parcel: " + (selectedParcel ? selectedParcel.name : "");
}

function handleParcelSelection(parcel) {
  if (selectedParcel === parcel) {
    selectedParcel = null;
  } else {
    selectedParcel = parcel;
  }

  updateSelectedParcelDisplay();
  populateSelectedParcelFields();
}

function populateSelectedParcelFields() {
  if (selectedParcel) {
    nameInput.value = selectedParcel.name;
    groupSelect.value = selectedParcel.group;
  } else {
    clearInputFields();
  }
}

function addParcelAfter() {
  var name = nameInput.value.trim();
  var group = groupSelect.value;

  if (!name || !group) {
    alert("Please enter parcel name and select group");
    return;
  }

  var newParcel = {
    id: Date.now(),
    name: name,
    sequence: selectedParcel ? selectedParcel.sequence + 1 : 1,
    group: group,
  };

  if (selectedParcel) {
    var index = data.findIndex(function (parcel) {
      return parcel.id === selectedParcel.id;
    });

    data.splice(index + 1, 0, newParcel);
  } else {
    data.push(newParcel);
  }

  renderParcels();
  clearInputFields();
}

function addParcelBefore() {
  var name = nameInput.value.trim();
  var group = groupSelect.value;

  if (!name || !group) {
    alert("Please enter parcel name and select group");
    return;
  }

  var newParcel = {
    id: Date.now(),
    name: name,
    sequence: selectedParcel ? selectedParcel.sequence : 1,
    group: group,
  };

  if (selectedParcel) {
    var index = data.findIndex(function (parcel) {
      return parcel.id === selectedParcel.id;
    });

    data.splice(index, 0, newParcel);
  } else {
    data.unshift(newParcel);
  }

  renderParcels();
  clearInputFields();
}

function replaceParcel() {
  var name = nameInput.value.trim();
  var group = groupSelect.value;

  if (!selectedParcel || !name || !group) {
    alert("Please select a parcel and enter parcel name and select group");
    return;
  }

  var updatedParcel = {
    id: selectedParcel.id,
    name: name,
    sequence: selectedParcel.sequence,
    group: group,
  };

  var index = data.findIndex(function (parcel) {
    return parcel.id === selectedParcel.id;
  });

  if (index !== -1) {
    data[index] = updatedParcel;
  }

  renderParcels();
  clearInputFields();
}

function deleteParcel() {
  if (!selectedParcel) {
    alert("Please select a parcel to delete");
    return;
  }

  var index = data.findIndex(function (parcel) {
    return parcel.id === selectedParcel.id;
  });

  if (index !== -1) {
    data.splice(index, 1);
  }

  renderParcels();
  clearInputFields();
}

function refreshParcels() {
  selectedParcel = null; // Clear the selected parcel
  renderParcels();
  clearInputFields();
}

function showFinalData() {
  console.log(data);
}

function clearInputFields() {
  nameInput.value = "";
  groupSelect.value = "";
}

parcelsContainer.addEventListener("click", function (event) {
  var clickedElement = event.target;

  if (clickedElement.classList.contains("parcel")) {
    var parcelElement = clickedElement;
    while (!parcelElement.classList.contains("parcels-group")) {
      parcelElement = parcelElement.parentElement;
    }

    var parcelIndex = Array.from(parcelElement.children).indexOf(
      clickedElement
    );
    var parcel = data[parcelIndex];
    handleParcelSelection(parcel);
  }
});

addAfterBtn.addEventListener("click", addParcelAfter);
addBeforeBtn.addEventListener("click", addParcelBefore);
replaceBtn.addEventListener("click", replaceParcel);
deleteBtn.addEventListener("click", deleteParcel);
refreshBtn.addEventListener("click", refreshParcels);
showFinalBtn.addEventListener("click", showFinalData);

renderParcels();
