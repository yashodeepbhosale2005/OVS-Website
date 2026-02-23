document.addEventListener("DOMContentLoaded", () => {

  /* ===================================
     COUNTER ANIMATION
  =================================== */
  const counters = document.querySelectorAll(".counter");

  const startCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const updateCount = () => {
      const increment = target / 120;

      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count) + "+";
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCount();
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(counter => {
    observer.observe(counter);
  });

  /* ===================================
     MOBILE MENU
  =================================== */
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  /* ===================================
     STICKY HEADER
  =================================== */
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 50);
    }
  });

  /* ===================================
     WORK FILTER
  =================================== */
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  const workItems = document.querySelectorAll(".work-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {

      const filter = button.getAttribute("data-filter");

      workItems.forEach(item => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

    });
  });

  /* ===================================
     SCROLL REVEAL
  =================================== */
  const revealElements = document.querySelectorAll(".section, .card, .service-card, .stats-card, .client-card, .section-title");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;

      if (boxTop < triggerBottom) {
        el.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  /* ===================================
     FABRIC JS
  =================================== */
  const canvasElement = document.getElementById("designCanvas");

  if (canvasElement && typeof fabric !== "undefined") {
    const canvas = new fabric.Canvas("designCanvas");

    window.addText = function () {
      const text = new fabric.Textbox("Your Text Here", {
        left: 50,
        top: 50,
        fill: "#000",
        fontSize: 24
      });

      canvas.add(text);
    };
  }

  /* ===================================
     CYLINDER ROTATION
  =================================== */
  const cylinder = document.getElementById("cylinder");

  if (cylinder) {

    const panels = document.querySelectorAll(".panel");
    const totalPanels = panels.length;
    const radius = 400;
    const angle = 360 / totalPanels;

    panels.forEach((panel, i) => {
      const panelAngle = angle * i;
      panel.style.transform =
        `rotateY(${panelAngle}deg) translateZ(${radius}px)`;
    });

    let rotation = 0;
    let speed = 0.4;
    let animationFrame;

    function animate() {
      rotation += speed;
      cylinder.style.transform = `rotateY(${rotation}deg)`;
      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    cylinder.addEventListener("mouseenter", () => speed = 0.05);
    cylinder.addEventListener("mouseleave", () => speed = 0.4);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrame);
      } else {
        animate();
      }
    });
  }

  /* ===================================
     CONTACT FORM → EMAIL + WHATSAPP
  =================================== */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function () {

      let name = document.querySelector("input[name='Full Name']").value;
      let email = document.querySelector("input[name='Email']").value;
      let phone = document.querySelector("input[name='Phone']").value;
      let company = document.querySelector("input[name='Company']").value;
      let service = document.querySelector("select[name='Service Required']").value;
      let message = document.querySelector("textarea[name='Message']").value;

      let whatsappMessage = `New Website Inquiry:
Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}
Service: ${service}
Message: ${message}`;

      let encodedMessage = encodeURIComponent(whatsappMessage);

      window.open(`https://wa.me/918007392979?text=${encodedMessage}`, "_blank");

      // Email will send via FormSubmit automatically
    });
  }

});