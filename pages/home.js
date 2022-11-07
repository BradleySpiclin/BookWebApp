// local component to fetch and return famous quotes
var FetchQuote = {
    template:
        /*html*/
        `<div class="container quote">
    <span v-if="ready">
    <p class ="outline">Feel Inspired...</p>
    {{ displayQuote }}
    <br><br>
    <button type="button" class="main-btn" @click="this.setRandomNumber()">I Need More Inspiration</button>
    </span>
    <p v-else>Loading Quote...</p>
    </div>`,
    data() {
        return {
            quotes: {},
            ready: false,
            rand: 0,
            url: "https://type.fit/api/quotes",
        }
    },
    methods: {
        setRandomNumber() {
            this.rand = Math.floor(Math.random() * 1643);
        },
        async fetchQuotes() {
            try {
                const resp = await fetch(this.url);
                const data = await resp.json();
                this.setQuotes(data);
            }
            catch {
                console.log("error getting quote data");
            }
        },
        setQuotes(data) {
            this.quotes = data;
            this.ready = true;
        },
    },
    // get random number on mounted and then fetch quotes API
    mounted() {
        this.setRandomNumber();
        this.fetchQuotes();
    },
    // Computed allows dynamic rendering of quotes object
    computed: {
        displayQuote() {
            return `"${this.quotes[this.rand].text}" 
            ~ ${this.quotes[this.rand].author}`;
        },
    },
}
// local component fetching current geolocation weather data
var WeatherComponent = {
    template:
        /*html*/
        `<div class="weather">
    <p class="location" v-if="fetched">
    {{ this.weather.name }}, {{this.weather.sys.country}}, {{ this.weather.weather[0].description }}
    <p class="temp">Currently : {{Math.round(this.weather.main.temp)}}&deg;
    Feels like : {{ Math.round(this.weather.main.feels_like) }}&deg;
    <p class ="text-small">MAX: {{ Math.round(this.weather.main.temp_max) }}&deg; MIN: {{ Math.round(this.weather.main.temp_min) }}&deg; </p>
    <p class="text-small">WINDSPEED : {{ this.weather.wind.speed }}m/s HUMIDITY : {{ this.weather.main.humidity }}%</p>
    </p> 
    </p> 
    <p v-else>Fetching Weather Data...</p>
    </div>`,
    data() {
        return {
            weather: {},
            // API key can be fouind for free account by visitng https://openweathermap.org/
            api_key: "f0b050b6375ef728889db5471640404e",
            url: "https://api.openweathermap.org/data/2.5/",
            fetched: false,
            lat: 0,
            long: 0,
        }
    },
    methods: {
        // function to fetch geolocation data and retrieve weather API object.
        getWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    // Longitude and Latitude are stored in these variables
                    this.long = position.coords.longitude;
                    this.lat = position.coords.latitude;
                    const url = `${this.url}weather?lat=${this.lat}&lon=${this.long}&appid=${this.api_key}&units=metric`;


                    fetch(url)
                        .then((response) => {
                            return response.json();
                        })
                        .then(this.setWeather);
                })
            }
        },
        // Stores JSON object to local variable weather{} and sets flag for v-directive to true.
        setWeather(data) {
            this.weather = data;
            this.fetched = true;
        },
    },
    created() {
        // Get reference to this weather object and set a timeout to retrieve API response.
        var self = this;
        setTimeout(function () { self.getWeather() }, 2000);
    },
}

// home route shown with Vue router
var Home = {
    components: {
        FetchQuote,
        WeatherComponent
    },
    name: 'Home',
    template:
        /*html*/
        `<div class="widget">
            <div class="container card">
            <!--Weather data displayed here-->
            <weather-component></weather-component>
            </div>
    <div class="card">
        <!-- Quote date displayed here-->
        <fetch-quote></fetch-quote>
    </div>
</div>
      <div class="container scroller">
        <div class="card">
          <h2>Go Grab A Book</h2>
        <!-- Computed method to display book totals -->
          <span class="totals">{{ $root.bookTotals }}</span>
           <!-- using table to display book titles -->
          <table class="styled-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Status</th>
                </tr>
            </thead>    
            <tbody v-for="book in $root.getBooksReading" :key="book">    
                <tr> 
                    <td>{{ book.title }}</td>
                    <td>{{ book.author }}</td>
                    <td :style="{ color: book.statusColor }">{{ book.status }}</td>
                </tr>
            </tbody>     
          </table>     
          <p v-if="!$root.isReading">Looks like you're not reading any books.
            <br>Visit your Library page to start reading.</p>  
        </div>
      </div>`,
}

