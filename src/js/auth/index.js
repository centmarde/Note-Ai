import { supabase } from "../main";

const loginForm = document.getElementById("loginForm");

loginForm.onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);

  //supabase sign-in

  let { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  let session = data.session;
  let user = data.user;
  console.log(user);
  if (session != null) {
    let { data: user_information, error } = await supabase
      .from("user_information")
      .select("*");

    localStorage.setItem("access_token", session.access_token);
    localStorage.setItem("user_id", user.id);

    // alert("Login Successfully");
    window.location.pathname = "/note.html";
  } else {
    alert(`Error: ${error.message}`);
    console.log(error);
  }

  loginForm.reset();
};
