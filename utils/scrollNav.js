const buttons = document.querySelectorAll(
   ".button-about-zeus, .button-detail, .button-controls, .button-stakin, .button-bindings"
);

export const scrollNav = buttons.forEach((button) => {
   button.addEventListener("click", function () {
      const containerID = button.dataset.containerId;
      const container = document.getElementById(containerID);

      container.scrollIntoView({ block: "end", behavior: "smooth" });
   });
});
