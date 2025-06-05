<scirpt>
// Keep track of window width for responsive re-initialization
let windowWidth = window.outerWidth;

$(".heading-1, .heading-2").each(function () {
  let myText = $(this);
  let mySplitText;

  function createSplits() {
    $(myText)
      .find("span")
      .each(function () {
        let originalStyle = this.getAttribute("style") || "";
        let words = $(this).text().split(" ");

        let newHtml = words
          .map(
            (word) =>
              `<span style="${originalStyle}" class="text-span">${word}</span>`
          )
          .join(" ");

        $(this).replaceWith(newHtml);
      });

    mySplitText = new SplitText(myText, {
      type: "words,lines",
      wordsClass: "split-words",
      linesClass: "split-lines",
    });

    $(mySplitText.lines).each(function () {
      let lineWrapper = $('<div class="line-wrapper"></div>');
      $(this).wrap(lineWrapper);
    });

    // ✅ Maskierung bleibt
    $(".line-wrapper").css({
      display: "block",
      overflow: "hidden",
    });

    // ✅ Feste line-heights für heading-1 und heading-2 + Masken-Abstände
    $(".heading-1 .split-lines").css({
      lineHeight: "1.3",
      paddingBlock: "1em",
      marginBlock: "-1em",
      transformOrigin: "top center",
      transform: "translateZ(0)",
    });

    $(".heading-2 .split-lines").css({
      lineHeight: "1.4",
      paddingBlock: "1em",
      marginBlock: "-1em",
      transformOrigin: "top center",
      transform: "translateZ(0)",
    });

    return mySplitText;
  }

  mySplitText = createSplits();

  $(window).resize(function () {
    if (window.outerWidth !== windowWidth) {
      mySplitText.revert();
      location.reload();
    }
    windowWidth = window.outerWidth;
  });
});

gsap.registerPlugin(ScrollTrigger);

function createTextAnimations() {
  const heroItems = $(".hero-item");

  $(".line-animation").each(function () {
    const triggerElement = $(this);
    const heading = triggerElement.find(".heading-1, .heading-2");
    const spans = heading.find("span.text-span");

    heading.each(function () {
      const startPosition = "top 90%";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: startPosition,
          end: "bottom top",
          toggleActions: "restart none none none",
        },
        delay: 0.5,
      });

      tl.from($(this).find(".split-lines"), {
        duration: 0.7,
        y: "100%",
        opacity: 0,
        rotateX: -90,
        ease: "power4.out",
        stagger: {
          amount: 0.1,
          from: "0",
        },
      });

      tl.to(
        spans,
        {
          duration: 0.2,
          opacity: 1,
          ease: "power1.out",
        },
        "-=0.5"
      );

      tl.from(
        heroItems,
        {
          duration: 0.7,
          y: 60,
          opacity: 0,
          ease: "power4.out",
          stagger: 0.2,
        },
        "-=0.5"
      );
    });
  });
}

createTextAnimations();

</scirpt>
