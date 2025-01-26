const App = {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      errorMessage: "",
      seen: false,
    };
  },
  methods: {
    async registerUser() {
      const data = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      console.log(JSON.stringify(data));
      const res = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const info = await res.json();
      console.log(info);
      if (!info.userId) {
        console.log(info.err);
        this.seen = true;
        return (this.errorMessage = info.message);
      }
      // const id = info.data._id;
      // console.log(id);
      window.location = `/login`;
    },
  },
};

Vue.createApp(App).mount("#app");
