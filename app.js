// datetime is a child component of Navbar
var DateTime = {
    template:
        /*html*/
        `<p class="nav-date">{{ currentDate}} {{ currentTime }}</p>`,
    data() {
        return {
            currentDate: "",
            currentTime: "",
        }
    },
    methods: {
        getTodayDate() {
            const today = new Date();
            const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
            const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December",];
            const date = weekDays[today.getDay()] + ", " + months[today.getMonth()]
                + " " + today.getDate() + ", " + today.getFullYear();
            const time = " " + this.pad(today.getHours()) + ":" + this.pad(today.getMinutes()) + ":" + this.pad(today.getSeconds());
            this.currentDate = date;
            this.currentTime = time;
        },
        // add leading 0 if we need to
        pad(number) {
            return (number < 10 ? '0' : '') + number;
        }
    },
    // set the interval to continually update the date time
    mounted() {
        setInterval(() => { this.getTodayDate() }, 1000)
    }
}

// local component for navbar and date object
var Navbar = {
    template:
        /*html*/
        `<div class="navbar">
    <div class="container flex">
      <h3>Book-Bag
        <date-time></date-time>
        </h3>
      <nav>
        <ul class="links">
          <li>
            <router-link class="nav-link" to="/"> Home </router-link>
          </li>
          <li>
            <router-link class="nav-link" to="library"> Library </router-link>
          </li>
          <li>
            <router-link class="nav-link" to="contact"> Contact </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>`,
    components: {
        DateTime,
    }
}

// create and mount the root instance
const { createApp } = Vue
// define routes
const app = Vue.createApp({
    components: {
        Navbar,
    },
    data() {
        return {
            // variable declarations and property default values
            title: "",
            author: "",
            status: "Unread",
            library: [],
            weather: [],
            statuses: ["Unread", "Reading", "Read"],
            checked: false,
            isReading: false,
            defaultColor: "yellow",
            statusColor: ["yellow", "orange", "green"],
        }
    },
    // Retrieve JSON files on app mounted
    mounted() {
        if (localStorage.getItem('library')) {
            try {
                this.library = JSON.parse(localStorage.getItem('library'));
            } catch (e) {
                localStorage.removeItem('library');
            }
        }
    },
    computed: {
        getBooksReading() {
            return this.library.filter(book => book.status === "Reading");
        },
        isLibraryEmpty() {
            return this.library.length === 0 ? "Library is empty. Start adding some books." : "";
        },
        bookTotals() {
            let reading = 0, unread = 0, read = 0;
            for (let x = 0; x < this.library.length; x++) {
                if (this.library[x].status === "Reading") {
                    reading++;
                    this.isReading = true;
                }
                else if (this.library[x].status === "Unread") {
                    unread++;
                }
                else {
                    read++;
                }
            }
            return `Reading: ${reading} Unread: ${unread} Read: ${read}`;
        },
    },
    methods: {
        // Sort first by Unread status and then by Read status
        sortLibrary() {
            let x = this.library.sort(book => book.status === "Unread");
            return x.sort(book => book.status === "Read");
        },
        saveLibrary(Footer) {
            // save the counter and library JSON objects
            if (confirm("Save Library Changes?")) {
                this.removeTitle();
                this.sortLibrary();

                // Write to local JSON storage. I was going to use cookies but I feel that with a 
                // large library object it will not store all the data.
                // We could use a cloud database system to store this in a real world appl
                const libraryData = JSON.stringify(this.library);
                window.localStorage.setItem('library', libraryData);

                const bookData = JSON.stringify(this.bookTotals);
                window.localStorage.setItem('bookTotals', bookData);
            }
        },
        addTitle() {
            // push title author to array if length of each > 0
            if (this.title.length === 0 || this.author.length === 0) {
                return;
            }
            this.library.push({ title: this.title, author: this.author, status: this.status, statusColor: this.defaultColor, checked: this.checked });
            this.title = "";
            this.author = "";
        },
        removeTitle() {
            this.library = this.library.filter(book => book.checked === false);
        },
        changeStatus(index) {
            // Variable to the index we want to change
            let newIdx = this.statuses.indexOf(this.library[index].status);
            // Set the status to 0 if the index is outside the range
            if (++newIdx > 2) {
                newIdx = 0;
            }
            // using 2 arrays in parallel here to change the text color based on the status
            this.library[index].status = this.statuses[newIdx];
            this.library[index].statusColor = this.statusColor[newIdx];
        },
    }
})
// routes for Vue router

const routes = [
    { path: '/', component: Home },
    { path: '/library', component: Library, props: true },
    { path: '/contact', component: Contact },
]
// router instance and pass the `routes` object
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes, // short hand syntax for `routes: routes`
})
app.use(router)
app.mount('#app')