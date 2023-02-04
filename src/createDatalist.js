fetch("http://localhost:3000/locations/cities")
  .then((response) => response.json())
  .then((data) => {
    const locationOptions = data.map(
      (city) => `<option value="${city}"></option>`
    );

    document.getElementById("locations").innerHTML = locationOptions.sort();
  });
