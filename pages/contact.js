var Contact = {
    name: 'Contact',
    data() {
        return {
            message: "",
            name: "",
            email: "",
        }
    },
    template:
        /*html*/
        `<div class="container">
        <div class="card">
            <h1>We value your feedback.</h1> 
            <p>We would love to hear from you on how we 
            improve our web application.</p>
        </div>
    </div>

    <div class="container scroller">
    <div class="card">
        <h2>Contact Us</h2>
        <form action="put formspree hyperlink here" class="totals" method="POST">
          <div class="py-1">
            <input v-model="name" type="text" name="name" placeholder="Name" required>
            <div class="divider"></div>  
            <textarea v-model="message" type="text" name="name" placeholder="Your Message" required></textarea>      
            <div class="divider"></div>  
            <input v-model="email" type="email" name="email" placeholder="Email" required>           
          </div>
          <div>{{ name }}<br>{{ message }}<br>{{ email }}</div>
          <input type="submit" value="Send" class="main-btn">
          <button type="button" class="main-btn" @click="clearInput()">Clear</button>
        </form>
        </div>
      </div>`,
    methods: {
        clearInput() {
            // clear input for button click event
            window.location.reload();
        },
    }


}