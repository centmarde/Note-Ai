// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
// Show the wrapper after the page has fully loaded

// import { setRouter } from "./router/router";

import { createClient } from "@supabase/supabase-js";

// setRouter();

const supabase = createClient(
  "https://jdrbeyywzehkravlqofg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkcmJleXl3emVoa3Jhdmxxb2ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NDQxNDcsImV4cCI6MjAyODQyMDE0N30.tMjBasfWAavOMjQhhx4gOVIp-Yu6fXu-u2etsXXnZOM"
);

async function doLogout() {
  // Supabase Logout
  let { error } = await supabase.auth.signOut();

  if (error == null) {
    successNotification("Logout Successfully!");

    // Clear local Storage
    localStorage.clear();

    // Redirect to login page
    window.location.pathname = "/index.html";
  } else {
    errorNotification("Logout Failed!", 15);
  }
}

export { supabase, doLogout };
