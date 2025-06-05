// Select all service tabs
const serviceTabs = document.querySelectorAll('[service-tab="true"]');

// Function to enable or disable animation based on screen size
function handleTabAnimations() {
  if (window.innerWidth >= 1024) {
    // Adjust breakpoint as needed
    serviceTabs.forEach((tab) => {
      const cover = tab.querySelector('[service-tab-cover="true"]');
      const content = tab.querySelector('[service-content="true"]');
      const image = content.querySelector('[image-service="true"]');

      function handleMouseEnter() {
        gsap.to(tab, { width: "70%", duration: 0.6, ease: "power2.out" });
        gsap.to(
          [...serviceTabs].filter((t) => t !== tab),
          { width: "30%", duration: 0.6, ease: "power2.out" }
        );
        gsap.to(cover, { opacity: 0, duration: 0.4, ease: "power2.out" });
        gsap.to(content, {
          opacity: 1,
          y: "-3rem",
          delay: 0.3,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(image, {
          scale: 1,
          delay: 0.3,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      function handleMouseLeave() {
        gsap.to(serviceTabs, {
          width: "50%",
          duration: 0.6,
          ease: "power2.out",
        });
        gsap.to(cover, {
          opacity: 1,
          delay: 0.45,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(content, {
          opacity: 0,
          y: "0",
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(image, { scale: 1.3, duration: 0.4, ease: "power2.out" });
      }

      tab.addEventListener("mouseenter", handleMouseEnter);
      tab.addEventListener("mouseleave", handleMouseLeave);

      // Store event handlers for later removal if needed
      tab._mouseenterHandler = handleMouseEnter;
      tab._mouseleaveHandler = handleMouseLeave;
    });
  } else {
    // Remove event listeners on smaller screens
    serviceTabs.forEach((tab) => {
      tab.removeEventListener("mouseenter", tab._mouseenterHandler);
      tab.removeEventListener("mouseleave", tab._mouseleaveHandler);
    });
  }
}

// Run on initial load
handleTabAnimations();

// Run on window resize
window.addEventListener("resize", handleTabAnimations);
