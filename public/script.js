document.addEventListener('DOMContentLoaded', () => {
    fetch('/vehicles')
        .then(response => response.json())
        .then(data => {
            const vehicleOptions = document.getElementById('vehicle-options');
            Object.keys(data).forEach(vehicle => {
                const option = document.createElement('div');
                option.classList.add('vehicle-option');
                option.innerHTML = `
                    <input type="radio" id="${vehicle}" name="vehicle" value="${vehicle}">
                    <label for="${vehicle}">${vehicle}</label>
                `;
                vehicleOptions.appendChild(option);
            });
        });

    document.getElementById('calculate-button').addEventListener('click', () => {
        const distance = document.getElementById('distance').value;
        const vehicleType = document.querySelector('input[name="vehicle"]:checked').value;

        if (!distance || !vehicleType) {
            alert('Please enter a distance and select a vehicle');
            return;
        }

        fetch('/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ vehicleType, distance })
        })
            .then(response => response.json())
            .then(data => {
                let resultHtml = `<p>Time to travel: ${data.time.toFixed(2)} hours</p>`;
                resultHtml += `<p>Fuel consumption: ${data.fuelConsumption.toFixed(2)} liters</p>`;
                if (data.outOfRange) {
                    resultHtml += `<p style="color: red;">The distance is out of range for the selected vehicle!</p>`;
                }
                document.getElementById('result').innerHTML = resultHtml;

                fetch('/vehicles')
                    .then(response => response.json())
                    .then(vehicles => {
                        let comparisonHtml = '<ul>';
                        Object.keys(vehicles).forEach(vehicle => {
                            if (vehicle !== vehicleType) {
                                const vehicleData = vehicles[vehicle];
                                const time = distance / vehicleData.topSpeed;
                                const fuelConsumption = distance / vehicleData.fuelEfficiency;
                                comparisonHtml += `<li>${vehicle}: ${time.toFixed(2)} hours, ${fuelConsumption.toFixed(2)} liters</li>`;
                            }
                        });
                        comparisonHtml += '</ul>';
                        document.getElementById('comparison').innerHTML = comparisonHtml;
                    });
            });
    });
});
