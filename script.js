/* ==========================================
   LENIS + GSAP
========================================== */

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        menuBtn.classList.toggle("active");

    });

}


/* ==========================================
   SMOOTH NAVIGATION
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

        navLinks.classList.remove("show");

    });

});


/* ==========================================
   NAVBAR SCROLL EFFECT
========================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    }

    else {

        header.classList.remove("scrolled");

    }

});
/* ==========================================
   SEARCH SYSTEM
========================================== */

const navbarSearch = document.getElementById("searchInput");
const menuSearch = document.getElementById("menuSearch");

/* Search Function */

function searchMenu(searchText) {

    const keyword = searchText.toLowerCase().trim();
    const cards = document.querySelectorAll(".menu-card");

    cards.forEach(card => {

        const title =
            card.querySelector("h3").textContent.toLowerCase();

        const category =
            (card.dataset.category || "").toLowerCase();

        const type =
            (card.dataset.type || "").toLowerCase();

        const tags =
            card.textContent.toLowerCase();

        const match = title.includes(keyword) ||
            category.includes(keyword) ||
            type.includes(keyword) ||
            tags.includes(keyword);

        if (match) {
            card.style.display = "";
            card.style.opacity = "1";
            card.style.visibility = "visible";
            card.style.transform = "none";
        } else {
            card.style.display = "none";
        }

    });

}


/* Navbar Search */

if (navbarSearch) {

    navbarSearch.addEventListener("input", (e) => {
        if (menuSearch) menuSearch.value = e.target.value;
        applyFilters();

    });

}


/* Menu Search */

if (menuSearch) {

    menuSearch.addEventListener("input", (e) => {
        if (navbarSearch) navbarSearch.value = e.target.value;
        applyFilters();

    });

}
/* ==========================================
   MENU FILTERS
========================================== */

let currentCategory = "";
let currentPrice = "";
let currentType = "";
let currentSpice = "";

const categoryBtns = document.querySelectorAll("[data-filter]");
const priceBtns = document.querySelectorAll("[data-price]");
const typeBtns = document.querySelectorAll("[data-type]");
const spiceBtns = document.querySelectorAll("[data-spice]");

const clearBtn = document.querySelector(".clear-filter");

function applyFilters() {

    const keyword =
        (
            (menuSearch && menuSearch.value) ||
            (navbarSearch && navbarSearch.value) ||
            ""
        ).toLowerCase().trim();

    const cards = document.querySelectorAll(".menu-card");
    let visibleCount = 0;

    cards.forEach(card => {

        const title =
            card.querySelector("h3").textContent.toLowerCase();

        const category = card.dataset.category || "";

        const type = card.dataset.type || "";

        const spice = card.dataset.spice || "";

        const price = Number(card.dataset.price);

        const cardText = card.textContent.toLowerCase();

        let show = true;

        /* SEARCH */

        if (
            keyword &&
            !title.includes(keyword) &&
            !category.toLowerCase().includes(keyword) &&
            !type.toLowerCase().includes(keyword) &&
            !cardText.includes(keyword)
        ) {
            show = false;
        }

        /* CATEGORY */

        if (
            currentCategory &&
            category !== currentCategory
        ) {
            show = false;
        }

        /* TYPE */

        if (
            currentType &&
            type !== currentType
        ) {
            show = false;
        }

        /* SPICE */

        if (
            currentSpice &&
            spice !== currentSpice
        ) {
            show = false;
        }

        /* PRICE */

        if (
            currentPrice === "199" &&
            price > 199
        ) {
            show = false;
        }

        if (
            currentPrice === "299" &&
            (price < 200 || price > 299)
        ) {
            show = false;
        }

        if (
            currentPrice === "999" &&
            price < 300
        ) {
            show = false;
        }

        if (show) {
            card.style.display = "";
            card.style.opacity = "1";
            card.style.visibility = "visible";
            card.style.transform = "none";
            visibleCount++;
        } else {
            card.style.display = "none";
        }

    });

    const itemCountEl = document.getElementById("itemCount");
    if (itemCountEl) {
        itemCountEl.textContent = visibleCount;
    }

}


/* CATEGORY */

categoryBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        categoryBtns.forEach(b => b.classList.remove("active"));

        if (currentCategory === btn.dataset.filter) {

            currentCategory = "";

        } else {

            currentCategory = btn.dataset.filter;

            btn.classList.add("active");

        }

        applyFilters();

    });

});


/* PRICE */

priceBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        priceBtns.forEach(b => b.classList.remove("active"));

        if (currentPrice === btn.dataset.price) {

            currentPrice = "";

        } else {

            currentPrice = btn.dataset.price;

            btn.classList.add("active");

        }

        applyFilters();

    });

});


/* TYPE */

typeBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        typeBtns.forEach(b => b.classList.remove("active"));

        if (currentType === btn.dataset.type) {

            currentType = "";

        } else {

            currentType = btn.dataset.type;

            btn.classList.add("active");

        }

        applyFilters();

    });

});


/* SPICE */

spiceBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        spiceBtns.forEach(b => b.classList.remove("active"));

        if (currentSpice === btn.dataset.spice) {

            currentSpice = "";

        } else {

            currentSpice = btn.dataset.spice;

            btn.classList.add("active");

        }

        applyFilters();

    });

});
/* ==========================================
   CLEAR FILTERS
========================================== */

if (clearBtn) {

    clearBtn.addEventListener("click", () => {

        currentCategory = "";
        currentPrice = "";
        currentType = "";
        currentSpice = "";

        if (menuSearch) menuSearch.value = "";
        if (navbarSearch) navbarSearch.value = "";

        document.querySelectorAll(".active").forEach(btn => {

            if (
                btn.hasAttribute("data-filter") ||
                btn.hasAttribute("data-price") ||
                btn.hasAttribute("data-type") ||
                btn.hasAttribute("data-spice")
            ) {

                btn.classList.remove("active");

            }

        });

        applyFilters();

    });

}


/* ==========================================
   HERO LOAD ANIMATION
========================================== */

window.addEventListener("load", () => {
    if (typeof gsap !== "undefined") {
        gsap.from(".hero-content", {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            clearProps: "opacity,transform"
        });

        gsap.from(".Night", {
            y: -80,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
            clearProps: "opacity,transform"
        });

        gsap.from(".coffee", {
            x: 80,
            opacity: 0,
            duration: 1.5,
            delay: .3,
            ease: "power3.out",
            clearProps: "opacity,transform"
        });
    }
});


/* ==========================================
   SCROLL REVEAL
========================================== */

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {

    gsap.utils.toArray("section").forEach(section => {

        gsap.from(section, {

            scrollTrigger: {
                trigger: section,
                start: "top 95%",
                toggleActions: "play none none none"
            },

            opacity: 0,

            y: 40,

            duration: 0.8,

            ease: "power3.out",

            clearProps: "opacity,transform"

        });

    });


    /* ==========================================
       CARD STAGGER
    ========================================== */

    gsap.from(".menu-card", {

        scrollTrigger: {

            trigger: ".menu-grid",

            start: "top 95%",

            toggleActions: "play none none none"

        },

        y: 40,

        opacity: 0,

        duration: 0.6,

        stagger: 0.08,

        ease: "power3.out",

        clearProps: "opacity,transform",

        onComplete: () => {
            applyFilters();
        }

    });


    /* ==========================================
       TESTIMONIAL REVEAL
    ========================================== */

    gsap.from(".tm-card", {

        scrollTrigger: {

            trigger: ".tm-section",

            start: "top 95%",

            toggleActions: "play none none none"

        },

        y: 40,

        opacity: 0,

        duration: 0.6,

        stagger: 0.1,

        ease: "power3.out",

        clearProps: "opacity,transform"

    });

}

/* ==========================================
   ACTIVE NAVBAR LINK
========================================== */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* ==========================================
   FLOATING DECORATIONS
========================================== */

gsap.to(".floating-bean", {

    y: -15,

    duration: 2,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});

gsap.to(".floating-star", {

    y: -12,

    duration: 3,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});

gsap.to(".floating-Night", {

    y: -18,

    duration: 4,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});


/* ==========================================
   BUTTON HOVER
========================================== */

document.querySelectorAll(".btn,.order-btn").forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        gsap.to(btn, {

            scale: 1.05,

            duration: .25

        });

    });

    btn.addEventListener("mouseleave", () => {

        gsap.to(btn, {

            scale: 1,

            duration: .25

        });

    });

});


/* ==========================================
   INITIALIZE FILTERS
========================================== */

if (typeof applyFilters === "function") {

    applyFilters();

}