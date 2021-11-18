// use fetch to get
const Datastore = require('nedb');
const database = new Datastore('database.db');
async function getData() {
    // const response = await fetch('/api');
    // const data = await response.json();
    data = {}
    database.loadDatabase();
    database.find({}, (err, data) => {
        if (err) {
            // response.end();
            return;
        };
        // server sends back all the data in the database to client
        data = data
    });
    for (item of data) {
        const root = document.createElement('p');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');

        mood.textContent = `Mood: ${item.mood}`;
        geo.textContent = `Where: ${item.lat.toFixed(2)}°, ${item.lon.toFixed(2)}°`;
        // convert timestamp string into local time
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = `When: ${dateString}`;
        // show image which is encoded by base64
        image.src = item.image64;

        root.append(mood, geo, date, image);
        // document.body.append(root);
        document.getElementById('container').append(root);
    };
    console.log(data);
};
getData();

const button = document.getElementById('clear');
button.addEventListener('click', async event => {
    database.loadDatabase();
    database.remove({}, { multi: true }, function (err, numRemoved) {
        database.loadDatabase(function (err) {
            // allow database to reload: done! 
        });
        // response.json({status: "success"});
    });
    // const options = {
    //     method: "DELETE",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // };
    // const response = await fetch('/api/clear', options);
    // const json = await response.json();
    // console.log(json);
    location.reload(); //once all deleted, refresh page automatically
});
