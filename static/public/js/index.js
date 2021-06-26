let plainCode = "";

function copy2clipboard() {
  navigator.clipboard.writeText(plainCode)
    .then(() => {
      console.log("clipboard works");
    })
    .catch(error => {
      alert("💩 Looks like your browser doesn't support this feature, try to copy by yourself");
      console.log(error);
    });
}

async function sendBadgeRequest() {
  const checked = document.querySelector("input[name=badge]:checked");
  if (!checked) {
    alert("Select desired badge!");
    return;
  }

  const badgeName = checked.value;

  const response = await fetch(`/${badgeName}`);
  const value = await response.json();

  if (value.success) {
    const { html, code } = value;
    plainCode = code;
    document.querySelector("code").innerHTML = html;
  }
  else {
    alert(value.message);
  }
}