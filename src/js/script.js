"use strict";

function selectElement(el) {
    return document.querySelector(el);
}

function selectElements(el) {
    return document.querySelectorAll(el);
}

let portfolioNav = selectElement(".choose-category");
let categories = selectElements(".choose-category li");

//Portfolio choose category

portfolioNav.addEventListener("click", elem => {
    if (event.target.tagName != "LI") return false;
    let elements = selectElements(".portfolio-element");
    let category = event.target.dataset.category;

    //Sorting of catogories
    elements.forEach(item => {
        item.classList.remove("hide");
        item.classList.remove("hide2");
        if (!item.classList.contains(category) && category != "all") {
            item.classList.add("hide");
            setTimeout(() => item.classList.add("hide2"), 1100);
        }
    });

});

//Toggle active in category buttons

categories.forEach(item => {
    item.onclick = function () {
        categories.forEach(category => {
            category.classList.remove("active");
        });
        this.classList.add("active");
    }
});

//Burger menu

selectElement(".nav-toggler").onclick = function () {
    selectElement(".nav-container").classList.toggle("active");
    this.classList.toggle("active");
    document.body.classList.toggle("active");
}