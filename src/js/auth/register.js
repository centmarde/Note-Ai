import { supabase } from "../main";

const form_register = document.getElementById("form_register");

form_register.onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(form_register);
  if (formData.get("password") == formData.get("confirmPassword")) {
    alert("Password matched!");
  }

  //supabase login
  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  let user_id = data?.user?.id;

  if (user_id != null) {
    //getting the info
    const { data, error } = await supabase
      .from("user_information")
      .insert([
        {
          id: user_id,
          password: formData.get("password"),
          full_name: formData.get("full_name"),
          username: formData.get("username"),
          email: formData.get("email"),
          gender: formData.get("gender"),
          phone_number: formData.get("phone_number")
        },
      ])
      .select();

    //if succes registration condition
    if (error == null) {
   
        alert("Register Successfully please verify your email");
       
      console.log(data);
      console.log(error);
    } else {
      alert(`Error: ${error.message}`);
    }

    form_register.reset();
  
  } else {
    alert(`Error: ${error.message}`);
    console.log(data);
    console.log(error);
  }
};
