
const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 225;

const currentFrame = (index) => `./Animation-Photos/${(index + 1).toString()}.jpg`;
const images = [];
let ball = { frame: 0};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  console.log(currentFrame(i));
  images.push(img);
}

console.log(images)

gsap.to(ball, {
  frame : frameCount - 1, 
  snap: "frame", 
  ease: "none",
  scrollTrigger: {
  scrub: true,
  // makes it so that you stay on frame until animation is over
  pin: "canvas",
  end: "500%",
},
  onUpdate: render,
});

gsap.fromTo(".hi-text", {opacity:1},
  {opacity:1,
  scrollTrigger: {
    // fades the text
    scrub: true,
    start: "0%",
    end: "10%",
  },
  onComplete: () => {
    gsap.to(".hi-text", {opacity:0});
  }
}
);

gsap.to(".navbar", {
  backgroundColor: "#333", // Changes background on scroll
  duration: 1,
  scrollTrigger: {
    trigger: ".navbar",
    start: "200%",
    end: "50%",
    scrub: true
  }
});




document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default anchor behavior

      const targetId = this.getAttribute('href').substring(1); // Get target section ID
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
          let offset = 0; // Adjust this value to fine-tune position
          if (targetId == "about"){
            offset = 55;
          }
          else if (targetId == "projects"){
            offset = 42;
          }
          const targetPosition = targetElement.offsetTop - offset;

          window.scrollTo({
              top: targetPosition,
              behavior: "smooth" // Enables smooth scrolling
          });
      }
  });
});


images[0].onload = render;

function render() {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[ball.frame], 0, 0);
}

