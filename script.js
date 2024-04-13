function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

var clutter = "";

document
  .querySelector("#page2>h1")
  .textContent.split(" ")
  .forEach(function (dets) {
    clutter += `<span> ${dets} </span>`;
    document.querySelector("#page2>h1").innerHTML = clutter;
  });

gsap.to("#page2>h1>span", {
  scrollTrigger: {
    trigger: `#page2>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 0.5,
  },
  stagger: 0.2,
  color: `#fff`,
});

function canvas1() {
  const canvas = document.querySelector("#page3>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
  ./assets/img/frames00007.png
  ./assets/img/frames00013.png
  ./assets/img/frames00016.png
  ./assets/img/frames00019.png
  ./assets/img/frames00010.png
  ./assets/img/frames00022.png
  ./assets/img/frames00025.png
  ./assets/img/frames00028.png
  ./assets/img/frames00031.png
  ./assets/img/frames00034.png
  ./assets/img/frames00037.png
  ./assets/img/frames00040.png
  ./assets/img/frames00043.png
  ./assets/img/frames00046.png
  ./assets/img/frames00049.png
  ./assets/img/frames00052.png
  ./assets/img/frames00055.png
  ./assets/img/frames00058.png
  ./assets/img/frames00061.png
  ./assets/img/frames00064.png
  ./assets/img/frames00067.png
  ./assets/img/frames00070.png
  ./assets/img/frames00073.png
  ./assets/img/frames00076.png
  ./assets/img/frames00079.png
  ./assets/img/frames00082.png
  ./assets/img/frames00085.png
  ./assets/img/frames00088.png
  ./assets/img/frames00091.png
  ./assets/img/frames00094.png
  ./assets/img/frames00097.png
  ./assets/img/frames00100.png
  ./assets/img/frames00103.png
  ./assets/img/frames00106.png
  ./assets/img/frames00109.png
  ./assets/img/frames00112.png
  ./assets/img/frames00115.png
  ./assets/img/frames00118.png
  ./assets/img/frames00121.png
  ./assets/img/frames00124.png
  ./assets/img/frames00127.png
  ./assets/img/frames00130.png
  ./assets/img/frames00133.png
  ./assets/img/frames00136.png
  ./assets/img/frames00139.png
  ./assets/img/frames00142.png
  ./assets/img/frames00145.png
  ./assets/img/frames00148.png
  ./assets/img/frames00151.png
  ./assets/img/frames00154.png
  ./assets/img/frames00157.png
  ./assets/img/frames00160.png
  ./assets/img/frames00163.png
  ./assets/img/frames00166.png
  ./assets/img/frames00169.png
  ./assets/img/frames00172.png
  ./assets/img/frames00175.png
  ./assets/img/frames00178.png
  ./assets/img/frames00181.png
  ./assets/img/frames00184.png
  ./assets/img/frames00187.png
  ./assets/img/frames00190.png
  ./assets/img/frames00193.png
  ./assets/img/frames00196.png
  ./assets/img/frames00199.png
  ./assets/img/frames00202.png
 `;
    return data.split("\n")[index];
  }

  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.5,
      trigger: `#page3`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: "#page3",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas1();

var clutter = "";

document
  .querySelector("#page4>h1")
  .textContent.split(" ")
  .forEach(function (dets) {
    clutter += `<span> ${dets} </span>`;
    document.querySelector("#page4>h1").innerHTML = clutter;
  });

gsap.to("#page4>h1>span", {
  scrollTrigger: {
    trigger: `#page4>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 0.5,
  },
  stagger: 0.2,
  color: `#fff`,
});

function canvas2() {
  const canvas = document.querySelector("#page5>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
  ./assets/img/bridges00004.png
  ./assets/img/bridges00007.png
  ./assets/img/bridges00010.png
  ./assets/img/bridges00013.png
  ./assets/img/bridges00016.png
  ./assets/img/bridges00019.png
  ./assets/img/bridges00022.png
  ./assets/img/bridges00025.png
  ./assets/img/bridges00028.png
  ./assets/img/bridges00031.png
  ./assets/img/bridges00034.png
  ./assets/img/bridges00037.png
  ./assets/img/bridges00040.png
  ./assets/img/bridges00043.png
  ./assets/img/bridges00046.png
  ./assets/img/bridges00049.png
  ./assets/img/bridges00052.png
  ./assets/img/bridges00055.png
  ./assets/img/bridges00058.png
  ./assets/img/bridges00061.png
  ./assets/img/bridges00064.png
  ./assets/img/bridges00067.png
  ./assets/img/bridges00070.png
  ./assets/img/bridges00073.png
  ./assets/img/bridges00076.png
  ./assets/img/bridges00079.png
  ./assets/img/bridges00082.png
  ./assets/img/bridges00085.png
  ./assets/img/bridges00088.png
  ./assets/img/bridges00091.png
  ./assets/img/bridges00094.png
  ./assets/img/bridges00097.png
  ./assets/img/bridges00100.png
  ./assets/img/bridges00103.png
  ./assets/img/bridges00106.png
  ./assets/img/bridges00109.png
  ./assets/img/bridges00112.png
  ./assets/img/bridges00115.png
  ./assets/img/bridges00118.png
  ./assets/img/bridges00121.png
  ./assets/img/bridges00124.png
  ./assets/img/bridges00127.png
  ./assets/img/bridges00130.png
  ./assets/img/bridges00133.png
  ./assets/img/bridges00136.png
  ./assets/img/bridges00139.png
  ./assets/img/bridges00142.png
  ./assets/img/bridges00145.png
  ./assets/img/bridges00148.png
  ./assets/img/bridges00151.png
  ./assets/img/bridges00154.png
  ./assets/img/bridges00157.png
  ./assets/img/bridges00160.png
  ./assets/img/bridges00163.png
 `;
    return data.split("\n")[index];
  }

  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.5,
      trigger: `#page5`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: "#page5",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas2();

var clutter = "";

document
  .querySelector("#page6>h1")
  .textContent.split(" ")
  .forEach(function (dets) {
    clutter += `<span> ${dets} </span>`;
    document.querySelector("#page6>h1").innerHTML = clutter;
  });

gsap.to("#page6>h1>span", {
  scrollTrigger: {
    trigger: `#page6>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 0.5,
  },
  stagger: 0.2,
  color: `#fff`,
});

function canvas3() {
  const canvas = document.querySelector("#page7>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
./assets/img/1.webp
./assets/img/2.webp
./assets/img/3.webp
./assets/img/4.webp
./assets/img/5.webp
./assets/img/6.webp
./assets/img/7.webp
./assets/img/8.webp
./assets/img/9.webp
./assets/img/10.webp
./assets/img/11.webp
./assets/img/12.webp
./assets/img/13.webp
./assets/img/14.webp
./assets/img/15.webp
./assets/img/16.webp
./assets/img/17.webp
./assets/img/18.webp
./assets/img/19.webp
./assets/img/20.webp
./assets/img/21.webp
./assets/img/22.webp
./assets/img/23.webp
./assets/img/24.webp
./assets/img/25.webp
./assets/img/26.webp
./assets/img/27.webp
./assets/img/28.webp
./assets/img/29.webp
./assets/img/30.webp
./assets/img/31.webp
./assets/img/32.webp
./assets/img/33.webp
./assets/img/34.webp
./assets/img/35.webp
./assets/img/36.webp
./assets/img/37.webp
./assets/img/38.webp
./assets/img/39.webp
./assets/img/40.webp
./assets/img/41.webp
./assets/img/42.webp
./assets/img/43.webp
./assets/img/44.webp
./assets/img/45.webp
./assets/img/46.webp
./assets/img/47.webp
./assets/img/48.webp
./assets/img/49.webp
./assets/img/50.webp
./assets/img/51.webp
./assets/img/52.webp
./assets/img/53.webp
./assets/img/54.webp
./assets/img/55.webp
./assets/img/56.webp
./assets/img/57.webp
./assets/img/58.webp
./assets/img/59.webp
./assets/img/60.webp
./assets/img/61.webp
./assets/img/62.webp
./assets/img/63.webp
./assets/img/64.webp
./assets/img/65.webp
./assets/img/66.webp
./assets/img/67.webp
./assets/img/68.webp
./assets/img/69.webp
./assets/img/70.webp
./assets/img/71.webp
./assets/img/72.webp
./assets/img/73.webp
./assets/img/74.webp
./assets/img/75.webp
./assets/img/76.webp
./assets/img/77.webp
./assets/img/78.webp
./assets/img/79.webp
./assets/img/80.webp
./assets/img/81.webp
./assets/img/82.webp
./assets/img/83.webp
./assets/img/84.webp
./assets/img/85.webp
./assets/img/86.webp
./assets/img/87.webp
./assets/img/88.webp
./assets/img/89.webp
./assets/img/90.webp
./assets/img/91.webp
./assets/img/92.webp
./assets/img/93.webp
./assets/img/94.webp
./assets/img/95.webp
./assets/img/96.webp
./assets/img/97.webp
./assets/img/98.webp
./assets/img/99.webp
./assets/img/100.webp
./assets/img/101.webp
./assets/img/102.webp
./assets/img/103.webp
./assets/img/104.webp
./assets/img/105.webp
./assets/img/106.webp
./assets/img/107.webp
./assets/img/108.webp
./assets/img/109.webp
./assets/img/110.webp
./assets/img/111.webp
./assets/img/112.webp
./assets/img/113.webp
./assets/img/114.webp
./assets/img/115.webp
./assets/img/116.webp
./assets/img/117.webp
./assets/img/118.webp
./assets/img/119.webp
./assets/img/120.webp
./assets/img/121.webp
./assets/img/122.webp
./assets/img/123.webp
./assets/img/124.webp
./assets/img/125.webp
./assets/img/126.webp
./assets/img/127.webp
./assets/img/128.webp
./assets/img/129.webp
./assets/img/130.webp
./assets/img/131.webp
./assets/img/132.webp
./assets/img/133.webp
./assets/img/134.webp
./assets/img/135.webp
./assets/img/136.webp
`;
    return data.split("\n")[index];
  }

  const frameCount = 136;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.5,
      trigger: `#page7`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: "#page7",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas3();


gsap.to(".page7-circle", {
  scrollTrigger: {
    trigger: `.page7-circle`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 0.5,
  },
  scale: 1.5,
});

gsap.to(".page7-inner-circle", {
  scrollTrigger: {
    trigger: `.page7-inner-circle`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: 0.5,
  },
  backgroundColor: `#0a3bce91`,
});

