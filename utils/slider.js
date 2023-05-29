//! Выбираю селекторы
const slides = document.querySelectorAll(".slide-item");
const controls = document.querySelectorAll(".slider-control");

//! Задаю текущий индекс
let currentIndex = 0;

//! Функция для отображения текущего слайда (#1)
function showSlide(index) {
   // Add a transition effect to the slides
   slides.forEach((slide) => {
      slide.style.transition = "opacity 0.7s ease-in-out";
      slide.classList.remove("active");
      slides[index].classList.add("active");
   });

   currentIndex = index;
}
showSlide(0);

//! Прохожусь циклом по нодлисту, после чего вешаю слушатель событий на каждую из кнопок
export const arrowControls = controls.forEach((control) => {
   control.addEventListener("click", function () {
      //* Выбираю датасет из html
      const index = parseInt(control.dataset.index);
      //* Устанавливаю новый индекс исходя из датаСета
      const newIndex = currentIndex + index;

      //* Проверка для качественного отображения
      if (newIndex < 0) {
         showSlide(slides.length - 1);
      }
      if (newIndex >= slides.length) {
         showSlide(0);
      } else {
         showSlide(newIndex);
      }
   });
});
