// Цас орох эффект: хуудсанд <script src="snow.js"></script> нэмэхэд л ажиллана.
(() => {
  const COUNT = 120;         // нийт цасан ширхэг
  const CRYSTAL_RATIO = 0.3; // хэдэн хувь нь ❄ хэлбэртэй байх

  // Хөдөлгөөн багасгахыг хүссэн хэрэглэгчид эффект харуулахгүй
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Canvas-ийг скрипт өөрөө үүсгэнэ
  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none", // товч дарахад саад болохгүй
    zIndex: "9999",
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let width, height;
  const flakes = [];

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  window.addEventListener("resize", resize);
  resize();

  const createFlake = (startOnTop) => {
    const isCrystal = Math.random() < CRYSTAL_RATIO;
    return {
      x: Math.random() * width,
      y: startOnTop ? -20 : Math.random() * height,
      isCrystal,
      r: isCrystal ? Math.random() * 4 + 4 : Math.random() * 2.5 + 0.8,
      speed: Math.random() * 0.6 + 0.4,
      sway: Math.random() * 0.02 + 0.005,
      angle: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.5,
    };
  };

  for (let i = 0; i < COUNT; i++) flakes.push(createFlake(false));

  // ❄ хэлбэр: 6 салаа, салаа бүрт V хэлбэрийн мөчир
  const drawCrystal = (f) => {
    const size = f.r;
    ctx.save();
    ctx.translate(f.x, f.y);
    ctx.rotate(f.rotation);
    ctx.strokeStyle = `rgba(255, 255, 255, ${f.opacity})`;
    ctx.lineWidth = Math.max(1, size / 6);
    ctx.lineCap = "round";

    for (let k = 0; k < 6; k++) {
      const d = size * 0.55;
      const b = size * 0.3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -size);
      ctx.moveTo(0, -d);
      ctx.lineTo(-b, -d - b);
      ctx.moveTo(0, -d);
      ctx.lineTo(b, -d - b);
      ctx.stroke();
      ctx.rotate(Math.PI / 3);
    }
    ctx.restore();
  };

  const drawDot = (f) => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
    ctx.fill();
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    for (const f of flakes) {
      f.y += f.speed * (f.isCrystal ? 1 : f.r / 2);
      f.angle += f.sway;
      f.x += Math.sin(f.angle) * 0.5;
      f.rotation += f.spin;

      if (f.isCrystal) drawCrystal(f);
      else drawDot(f);

      if (f.y > height + 20) Object.assign(f, createFlake(true));
      if (f.x > width + 20) f.x = -20;
      if (f.x < -20) f.x = width + 20;
    }

    requestAnimationFrame(draw);
  };

  draw();
})();
