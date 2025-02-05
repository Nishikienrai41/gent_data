const url="https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=20";
const parkingDiv = document.getElementById("parking-data");

async function getData() {
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`hhtp error: ${response.status}`);
        }
        const data = await response.json();
        const parkings = data.results;
        console.log(parkings);
        displayData(parkings);
    } catch (error) {
        console.error("er ging iets fout met het verkrijgen van de data", error);
        document.getElementById("parking-data").innerHTML=`<p style = "color:red;">oeps... het werkt even niet. Kom later terug</p>`;
    } finally {
        console.log("getData finished");
    }
};



function displayData(parkings) {
    console.log("parkings in display functie: ", parkings);
    parkings.forEach(parking => {
      //  const bezetting = parking.occupation;
      // const capaciteit = parking.totalcapacity;
      //  const naam = parking.name;
      //  const isopen = parking.isopennow;

        const { occupation, totalcapacity, name, isopennow} = parking;
        let status = isopennow ? "parking open" : "parking gesloten";
       // if (isopennow === 1) {
       //     status = "parking open";
       //  } else {
       //     status = "parking gesloten";
       // };

       
       console.log(`bezetting: ${occupation} | capaciteit: ${totalcapacity} | naam: ${name} | open: ${status}`);
       const parkingCard = document.createElement("div"); // Maak een nieuw <div>-element
       parkingCard.className = "parking";
       parkingCard.innerHTML = `
            <h2>${name}</h2>
            <p>bezetting: ${occupation}</p>
            <p>capaciteit: ${totalcapacity}</p>
            <p class="status">${status}</p>
       `;
       parkingDiv.appendChild(parkingCard); // Voeg het toe aan de body (of een andere bestaande container)
       const pElements = parkingCard.getElementsByClassName("status");
       Array.from(pElements).forEach(pElement => {
        pElement.classList.add(isopennow ? "open" : "gesloten");
       });
    });
};


getData();