const App = {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      seen: false,
    };
  },
  mounted() {},
  methods: {
    async loginUser() {
      const data = {
        email: this.email,
        password: this.password,
      };
      console.log(JSON.stringify(data));
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const info = await res.json();

      if (!info.token) {
        this.seen = true;
        return (this.errorMessage = info.message);
      }
      localStorage.setItem("token", info.token);
      localStorage.setItem("userId", info.userId);
      // const id = info.data._id;
      // console.log(id);
      window.location = `/`;
    },
  },
};

Vue.createApp(App).mount("#app");
