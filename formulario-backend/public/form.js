console.log("Form script loaded");

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('contactoForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            telephone: e.target.telephone.value,
            message: e.target.message.value
        };

        const res = await fetch("/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        alert(data.message);
        e.target.reset();
    });
});
