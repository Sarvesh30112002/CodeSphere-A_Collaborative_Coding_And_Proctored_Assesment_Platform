const form = document.querySelector("form");
chrome.storage.sync.get(
    ["userid", "firstName", "lastName", "email"],
    function (result) {
        document.getElementById("f_name").value = result.firstName;
        document.getElementById("l_name").value = result.lastName;
        document.getElementById("email").value = result.email;
    }
);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstName = document.getElementById("f_name").value;
    const lastName = document.getElementById("l_name").value;
    const email = document.getElementById("email").value;
    const testInvitation = document.getElementById("test_invitation").value;
    const data = JSON.stringify({
        firstName,
        lastName,
        email,
        testInvitation,
    });
    console.log(data);
    if (!formValidation(firstName, lastName, email, testInvitation)) {
        alert("Incorrect Form data");
        return;
    }
    fetch("http://localhost:3000/createUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data,
    })
        .then((response) => response.json())
        .then((data_result) => {
            var payload = {
                firstName: document.getElementById("f_name").value,
                lastName: document.getElementById("l_name").value,
                email: document.getElementById("email").value,
            };
            payload["userid"] = data_result.userid;
            chrome.storage.sync.set(payload, function () {
                window.close();
                //window.open("http://localhost:3001/", "_blank");

            });
        });
});


function formValidation(firstName, lastName, email, testInvitation) {
    if (firstName === "" || lastName === "") {
        return false;
    } else if (
        !/^[a-zA-Z]+$/.test(firstName) ||
        !/^[a-zA-Z]+$/.test(lastName)
    ) {
        //Show error message
        return false;
    } else if (firstName.length > 50 || lastName.length > 50) {
        //Show error message
        return false;
    } else {
        //Validation successful
    }

    if (email === "") {
        return false;
        //Show error message
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        return false;
        //Show error message
    } else {
        //Validation successful
    }

    if (testInvitation === "") {
        return false;
        //Show error message
    } else if (!/^[a-zA-Z0-9]+$/.test(testInvitation)) {
        return false;
        //Show error message
    } else {
        //Validation successful
    }
    return true;
}
