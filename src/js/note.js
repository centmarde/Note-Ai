import { doLogout, supabase } from "./main";

const userId = localStorage.getItem("user_id");
document.body.addEventListener("click", function (event) {
  if (event.target.id === "btn_save") {
    form(event);
  }
});

document
  .getElementById("btn_logout")
  .addEventListener("click", function (event) {
    // Prevent the default behavior of the anchor tag
    event.preventDefault();
    doLogout();
  });
getDatas();
const form = async (e) => {
  e.preventDefault();
  const formData = new FormData(form_note);
  const { data, error } = await supabase.from("note").insert([
    {
      title: formData.get("title"),
      description: formData.get("description"),
    },
  ]);
  if (error) {
    console.log(error);
  } else {
    alert("Note Added!");
    window.location.reload();
  }
};

async function getDatas() {
  let { data: notes, error } = await supabase.from("note").select("*");

  let container = "";
  notes.forEach((datas) => {
    container += `<div class=" card w-100 mb-3 shadow">
    <div id="card_color" class="card-body rounded">
      <h5 class="card-title">${datas.title}</h5>
      <p class="card-text">${datas.description}</p>
    </div>
  </div>`;
  });

  document.getElementById("noteContainer").innerHTML = container;
}
