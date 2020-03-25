<template>
  <div>
    <h1>Dashboard</h1>
    <h1 v-if="!user">Getting user info</h1>
    <h1>Hello, {{user.username}}!!</h1>
    <button @click="logout()" class="btn btn-primary">Logout</button>
    <br>
    <br>
    <button @click="showForm = !showForm" class="btn btn-primary">Toggle form</button>
    <form v-if="showForm" @submit.prevent="addNote()">
      <div class="form-group">
        <label for="title">Title: </label>
        <input v-model="newNote.title" type="text" class="form-control" id="title"
          aria-describedby="titlelHelp" placeholder="Enter a title" required>
        <small id="titleHelp" class="form-text text-muted">Enter a descriptive note title</small>
      </div>
      <div class="form-group">
        <label for="note">Example textarea</label>
        <textarea v-model="newNote.note" class="form-control" id="note" rows="3"
          placeholder="Enter your note" required></textarea>
      </div>
      <button type="submit" class="btn btn-success">Add Note</button>
    </form>
    <section class="row mt-3">
      <div class="col-4" v-for="note in notes" :key="note._id">
        <div class="card border-info mb-3">
          <div class="card-header">{{ note.title }}</div>
          <div class="card-body">
            <p class="card-text" v-html="renderMarkdown(note.note)"></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import MDemoji from 'markdown-it-emoji';

const md = new MarkdownIt();
md.use(MDemoji);

const API_URL = 'http://localhost:5000/';

export default {
  data: () => ({
    showForm: false,
    user: {},
    newNote: {
      title: '',
      note: '',
    },
    notes: [],
  }),
  mounted() {
    fetch(API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    }).then((res) => res.json())
      .then((result) => {
        if (result.user) {
          this.user = result.user;
          this.getNotes();
        } else {
          this.logout();
        }
      });
  },
  methods: {
    renderMarkdown(note) {
      return md.render(note);
    },
    getNotes() {
      fetch(`${API_URL}api/v1/notes`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((res) => res.json())
        .then((notes) => {
          this.notes = notes;
        });
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    addNote() {
      fetch(`${API_URL}api/v1/notes`, {
        method: 'POST',
        body: JSON.stringify(this.newNote),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((res) => res.json())
        .then((note) => {
          this.notes.push(note);
          this.newNote = {
            title: '',
            note: '',
          };
          this.showForm = false;
        });
    },
  },
};
</script>

<style>
</style>
