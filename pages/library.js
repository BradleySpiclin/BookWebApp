var LibraryFooter = {
  template:
    /*html*/
    `  <div class="container">
  <div class="card">
    <div class="library">
      <p>Save or clear Library changes</p>
      <button type="button" class="main-btn" @click="$root.saveLibrary()">Save Changes</button>
    <button type="button" class="main-btn" @click="clearInput()">Clear Changes</button>
</div>
</div>
</div >`,
  methods: {
    clearInput() {
      // clear input for button click event
      window.location.reload();
    },
  }
}

var LibraryHeader = {
  template: /*html*/
    `<div class="container">
  <div class="card">
    <h2>Add Title and Author</h2>
    <div class="library">
      <input type="text" v-model.trim="$root.title" placeholder="Title" @keypress.enter="$root.addTitle"/>
      <input type="text" v-model.trim="$root.author" placeholder="Author" @keypress.enter="$root.addTitle"/>
    </div>
    <button type="button" class="main-btn" @click="$root.addTitle">Add to Library</button>
  </div>
</div>`,
}

var LibraryTable = {
  template: /*html*/
    `<div class="container scroller">
  <div class="card">
    <h2>Your Library</h2>
    <span class="totals">{{ $root.bookTotals }}</span>
<table class="styled-table">
<thead>
    <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Status</th>
        <th>Delete</th>     
    </tr>
</thead>
  <tbody v-for="(book, index) in $root.library" :key="book">
    <tr>
      <td>{{ book.title }}</td>
      <td>{{ book.author }}</td>
      <td :style="{ color: book.statusColor }" @click="$root.changeStatus(index);" class="btn">{{ book.status }}</td>
      <td><input type="checkbox" class="checkbox" v-model="book.checked"></td> 
    </tr>
  </tbody>
</table> 
<p>{{$root.isLibraryEmpty}}</p>
</div>

</div>`
}

var Library = {
  name: 'Library',
  template:
    /*html*/
    `<section>
      <library-header></library-header>  
      <library-table></library-table>
      <library-footer></library-footer>
    </section>`,
  // 
  components: {
    LibraryFooter,
    LibraryHeader,
    LibraryTable,
  },
}
