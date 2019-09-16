function cloneDiv() {
    var elmnt = document.getElementsByClassName("creds-item")[0];
    var cln = elmnt.cloneNode(true);
    document.getElementById("creds-list").appendChild(cln);
  }