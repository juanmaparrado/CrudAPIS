const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '291c7b04a9mshd3dfc1e428c6153p15274bjsnb2b4d6fd47de',
		'X-RapidAPI-Host': 'world-population3.p.rapidapi.com'
	}
};

const countries = ['FRA', 'ITA', 'ESP','POL','UKR'];

const requests = countries.map(country => fetch(`https://world-population3.p.rapidapi.com/${country}`, options));

Promise.all(requests)
	.then(responses => Promise.all(responses.map(response => response.json())))
	.then(data => {
		data.forEach(({ Country, '1970 Population':Population1970, '2022 Population': Population2022, 'Area (km²)':Area }, index) => {
			console.log(`País ${index + 1}: ${Country}`);
			console.log(`2022 Population: ${Population2022}`);
			console.log(`1970 Population: ${Population1970}`);
			console.log(`Area (km²): ${Area}`);
			console.log('--------------');
		});
	})
	.catch(err => console.error(err));



  