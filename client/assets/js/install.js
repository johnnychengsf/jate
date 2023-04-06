window.addEventListener("load", (event) => {
  console.log("load ......");
  const butInstall = document.getElementById('buttonInstall');
  const textHeader = document.getElementById('textHeader');

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    console.log("beforeinstallprompt");

    butInstall.style.visibility = 'visible';
    textHeader.textContent = 'Click the button to install!';

    butInstall.addEventListener('click', () => {
      event.prompt();

      console.log("butInstall clicked");
      butInstall.setAttribute('disabled', true);
      butInstall.textContent = 'Installed!';
    });
  });

  window.addEventListener('appinstalled', (event) => {
    textHeader.textContent = 'Successfully installed!';
    console.log('👍', 'appinstalled', event);
  });
});
