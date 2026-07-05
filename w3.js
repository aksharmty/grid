function includeHTML(callback) {
  const elements = document.querySelectorAll("[w3-include-html]");
  let loaded = 0;

  elements.forEach(el => {
    const file = el.getAttribute("w3-include-html");
    if (!file) return;

    fetch(file)
      .then(resp => resp.text())
      .then(data => {
        el.innerHTML = data;
        loaded++;

        // ✅ Run all scripts inside loaded HTML
        el.querySelectorAll("script").forEach(oldScript => {
          const newScript = document.createElement("script");
          if (oldScript.src) {
            newScript.src = oldScript.src;
            newScript.async = oldScript.async;
            newScript.defer = oldScript.defer;
          } else {
            newScript.textContent = oldScript.textContent;
          }
          document.body.appendChild(newScript);
        });

        // ✅ If sidebar.html, load banners.js
        if (file.includes("sidebar.html")) {
          const script = document.createElement("script");
          script.src = "https://aksharhanumandham.in/data/banners.js?v=" + new Date().getTime();
          document.body.appendChild(script);
        }

        if (loaded === elements.length && callback) callback();
      })
      .catch(err => {
        el.innerHTML = "Error loading " + file;
      });
  });
}

document.addEventListener("DOMContentLoaded", () => includeHTML());
document.addEventListener("DOMContentLoaded", () => { includeHTML(initMenu);});
function initMenu(){

    const btn=document.getElementById("menu-btn");

    const menu=document.getElementById("menu");

    if(btn){

        btn.onclick=function(){

            menu.classList.toggle("show");

        };

    }

    document.querySelectorAll(".dropdown > a").forEach(function(item){

        item.onclick=function(e){

            if(window.innerWidth<=768){

                e.preventDefault();

                this.parentElement.classList.toggle("open");

            }

        };

    });

}
