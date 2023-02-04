document
  .getElementById("location-choice")
  .addEventListener("change", function (event) {
    const { value } = event.currentTarget;

    if (value.length > 3) {
      fetch(`http://localhost:3000/search/${value}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          if (data.length === 0) return;

          const results = data.map(
            (item) => `
            <fieldset>
            <legend>Projekt</legend>
            <h2>${item.name}</h2>
            Distanz in KM: ${item.dist}
          </fieldset>`
          );

          document.getElementById("results").innerHTML = results;
        });
    }
  });
