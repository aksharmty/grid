function includeHTML(callback) {

    const elements = document.querySelectorAll("[w3-include-html]");

    let loaded = 0;

    if (elements.length === 0) {
        if (callback) callback();
        return;
    }

    elements.forEach(el => {

        const file = el.getAttribute("w3-include-html");

        if (!file) {
            loaded++;
            return;
        }

        fetch(file)

        .then(response => {

            if (!response.ok)
                throw new Error(response.status);

            return response.text();

        })

        .then(html => {

            el.innerHTML = html;

            // Execute all scripts
            el.querySelectorAll("script").forEach(oldScript => {

                const newScript = document.createElement("script");

                if (oldScript.src) {

                    // Prevent duplicate external scripts
                    if (document.querySelector(`script[src="${oldScript.src}"]`))
                        return;

                    newScript.src = oldScript.src;
                    newScript.async = oldScript.async;
                    newScript.defer = oldScript.defer;
                    document.head.appendChild(newScript);

                } else {

                    newScript.textContent = oldScript.textContent;
                    document.body.appendChild(newScript);

                }

            });

            // Load banners.js only once
            if (
                file.includes("sidebar.html") &&
                !document.getElementById("banner-script")
            ) {

                const banner = document.createElement("script");

                banner.id = "banner-script";

                banner.src = "https://aksharhanumandham.in/data/banners.js?v=" + Date.now();

                document.body.appendChild(banner);

            }

        })

        .catch(() => {

            el.innerHTML = "<p style='color:red'>Unable to load " + file + "</p>";

        })

        .finally(() => {

            loaded++;

            if (loaded === elements.length && callback) {
                callback();
            }

        });

    });

}

document.addEventListener("DOMContentLoaded", function () {

    includeHTML();

}); 
