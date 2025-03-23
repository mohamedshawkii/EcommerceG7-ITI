const xhr = new XMLHttpRequest();
xhr.open("GET", "data.json", true); // true = asynchronous request

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText); // Parse JSON
    console.log(data);
    data.map((item) => {
      document.getElementsByClassName("div1")[0].innerHTML += `
                        <img src="${item.images}" width="150" height="auto">
                        <p>${item.title}</p>
                        <p>$${item.price}</p>
                        <p>${item.description}</p>
                    `;
    });
  }
};

xhr.send(); // Send request
