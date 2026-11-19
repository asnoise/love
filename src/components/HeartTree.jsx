import React, { useEffect, useMemo, useRef } from 'react';

function mulberry32(seed) {
  let a = seed;
  return function next() {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeOutCubic(t) {
  const clamped = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - clamped, 3);
}

function easeInOutQuad(t) {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped < 0.5
    ? 2 * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 2) / 2;
}

function evalCubicPoint(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;
  return {
    x:
      mt2 * mt * p0.x +
      3 * mt2 * t * p1.x +
      3 * mt * t2 * p2.x +
      t2 * t * p3.x,
    y:
      mt2 * mt * p0.y +
      3 * mt2 * t * p1.y +
      3 * mt * t2 * p2.y +
      t2 * t * p3.y,
  };
}

function drawHeartShape(ctx, x, y, size, rotation, color, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;

  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(0, topCurveHeight);
  ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
  ctx.bezierCurveTo(
    -size / 2,
    (size + topCurveHeight) / 2,
    0,
    (size + topCurveHeight) / 1.32,
    0,
    size
  );
  ctx.bezierCurveTo(
    0,
    (size + topCurveHeight) / 1.32,
    size / 2,
    (size + topCurveHeight) / 2,
    size / 2,
    topCurveHeight
  );
  ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export default function HeartTree({ caption, onAnimationComplete }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const completedRef = useRef(false);

  // Pre-compute organic tree branches and 340 heart-canopy leaves deterministically
  const sceneData = useMemo(() => {
    const rand = mulberry32(20260214);

    const branches = [
      // Main trunk
      {
        p0: { x: 0.5, y: 0.9 },
        p1: { x: 0.49, y: 0.78 },
        p2: { x: 0.515, y: 0.67 },
        p3: { x: 0.5, y: 0.54 },
        w0: 15,
        w1: 7.5,
        start: 0.0,
        end: 0.28,
      },
      // Left primary branch
      {
        p0: { x: 0.5, y: 0.61 },
        p1: { x: 0.44, y: 0.54 },
        p2: { x: 0.39, y: 0.49 },
        p3: { x: 0.35, y: 0.42 },
        w0: 7.5,
        w1: 3.2,
        start: 0.17,
        end: 0.39,
      },
      // Right primary branch
      {
        p0: { x: 0.5, y: 0.59 },
        p1: { x: 0.56, y: 0.53 },
        p2: { x: 0.61, y: 0.48 },
        p3: { x: 0.65, y: 0.41 },
        w0: 7.5,
        w1: 3.2,
        start: 0.19,
        end: 0.41,
      },
      // Center-top branch
      {
        p0: { x: 0.5, y: 0.55 },
        p1: { x: 0.49, y: 0.47 },
        p2: { x: 0.51, y: 0.41 },
        p3: { x: 0.5, y: 0.33 },
        w0: 6.5,
        w1: 2.2,
        start: 0.23,
        end: 0.44,
      },
      // Left upper twig
      {
        p0: { x: 0.41, y: 0.5 },
        p1: { x: 0.36, y: 0.43 },
        p2: { x: 0.32, y: 0.38 },
        p3: { x: 0.29, y: 0.31 },
        w0: 3.8,
        w1: 1.4,
        start: 0.28,
        end: 0.47,
      },
      // Left outer twig
      {
        p0: { x: 0.38, y: 0.46 },
        p1: { x: 0.32, y: 0.46 },
        p2: { x: 0.28, y: 0.45 },
        p3: { x: 0.25, y: 0.41 },
        w0: 3.2,
        w1: 1.3,
        start: 0.31,
        end: 0.49,
      },
      // Right upper twig
      {
        p0: { x: 0.59, y: 0.49 },
        p1: { x: 0.64, y: 0.42 },
        p2: { x: 0.68, y: 0.37 },
        p3: { x: 0.71, y: 0.31 },
        w0: 3.8,
        w1: 1.4,
        start: 0.29,
        end: 0.48,
      },
      // Right outer twig
      {
        p0: { x: 0.62, y: 0.45 },
        p1: { x: 0.68, y: 0.45 },
        p2: { x: 0.72, y: 0.44 },
        p3: { x: 0.75, y: 0.4 },
        w0: 3.2,
        w1: 1.3,
        start: 0.32,
        end: 0.5,
      },
      // Center-left inner twig
      {
        p0: { x: 0.5, y: 0.44 },
        p1: { x: 0.46, y: 0.38 },
        p2: { x: 0.43, y: 0.33 },
        p3: { x: 0.41, y: 0.27 },
        w0: 3.2,
        w1: 1.3,
        start: 0.33,
        end: 0.51,
      },
      // Center-right inner twig
      {
        p0: { x: 0.5, y: 0.43 },
        p1: { x: 0.54, y: 0.37 },
        p2: { x: 0.57, y: 0.32 },
        p3: { x: 0.59, y: 0.27 },
        w0: 3.2,
        w1: 1.3,
        start: 0.34,
        end: 0.52,
      },
    ];

    const palette = [
      '#e11d48',
      '#ff4d6d',
      '#ff6b8b',
      '#ff8fa3',
      '#ffb3c1',
      '#fb7185',
      '#f43f5e',
      '#fda4af',
    ];

    // Generate leaves distributed inside a parametric heart silhouette
    const leaves = Array.from({ length: 340 }, (_, i) => {
      const t = rand() * Math.PI * 2;
      // Bias slightly outward so the heart canopy outline looks crisp and lush
      const radial = Math.pow(rand(), 0.52);

      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      );

      // Normalized heart canopy center (0.50, 0.36)
      const scaleNorm = 0.0175;
      const tx = 0.5 + hx * radial * scaleNorm;
      const ty = 0.36 + hy * radial * scaleNorm;

      // Some leaves fall from above; inner ones gently blossom along branches
      const isFallingFromAbove = i % 5 !== 0;
      const sx = isFallingFromAbove
        ? tx + (rand() - 0.5) * 0.28
        : lerp(0.5, tx, 0.45);
      const sy = isFallingFromAbove
        ? -0.06 - rand() * 0.24
        : lerp(0.52, ty, 0.45);

      const start = 0.3 + rand() * 0.45;
      const duration = 0.16 + rand() * 0.16;

      return {
        tx,
        ty,
        sx,
        sy,
        size: 8.5 + rand() * 9.5,
        rotation: (rand() - 0.5) * 0.65,
        color: palette[Math.floor(rand() * palette.length)],
        start,
        duration,
        swayPhase: rand() * Math.PI * 2,
        swayAmp: 0.008 + rand() * 0.016,
      };
    });

    // Gentle ambient hearts drifting around the tree
    const ambientHearts = Array.from({ length: 18 }, () => ({
      x: 0.12 + rand() * 0.76,
      yOffset: rand(),
      speed: 0.035 + rand() * 0.045,
      size: 6 + rand() * 7,
      phase: rand() * Math.PI * 2,
      color: palette[Math.floor(rand() * palette.length)],
      alpha: 0.28 + rand() * 0.35,
    }));

    return { branches, leaves, ambientHearts };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let width = 520;
    let height = 470;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(280, rect.width);
      height = Math.max(260, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', updateSize);
    }

    const totalIntroMs = 5400;
    const startTime = performance.now();
    let rafId = 0;

    const render = (now) => {
      const elapsedMs = now - startTime;
      const progress = Math.min(1, elapsedMs / totalIntroMs);
      const sec = elapsedMs / 1000;

      if (progress >= 0.94 && !completedRef.current) {
        completedRef.current = true;
        if (onAnimationComplete) onAnimationComplete();
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Subtle ground line & shadow under the trunk
      const groundAlpha = easeOutCubic(Math.min(1, progress / 0.18));
      const groundY = height * 0.9;
      ctx.save();
      ctx.globalAlpha = groundAlpha;

      const groundGrad = ctx.createLinearGradient(
        width * 0.14,
        groundY,
        width * 0.86,
        groundY
      );
      groundGrad.addColorStop(0, 'rgba(138, 86, 102, 0)');
      groundGrad.addColorStop(0.5, 'rgba(138, 86, 102, 0.55)');
      groundGrad.addColorStop(1, 'rgba(138, 86, 102, 0)');

      ctx.strokeStyle = groundGrad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width * 0.14, groundY);
      ctx.lineTo(width * 0.86, groundY);
      ctx.stroke();

      // Soft ground shadow ellipse
      ctx.fillStyle = 'rgba(219, 112, 147, 0.14)';
      ctx.beginPath();
      ctx.ellipse(width * 0.5, groundY + 3, width * 0.14, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Tree trunk & branches growing progressively
      const scaleFactor = Math.min(width, height) / 480;
      sceneData.branches.forEach((b) => {
        if (progress < b.start) return;
        const localP = easeOutCubic(
          (progress - b.start) / (b.end - b.start)
        );
        const steps = 16;

        const p0 = { x: b.p0.x * width, y: b.p0.y * height };
        const p1 = { x: b.p1.x * width, y: b.p1.y * height };
        const p2 = { x: b.p2.x * width, y: b.p2.y * height };
        const p3 = { x: b.p3.x * width, y: b.p3.y * height };

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        let prevPt = evalCubicPoint(p0, p1, p2, p3, 0);
        for (let s = 1; s <= steps; s += 1) {
          const t = (s / steps) * localP;
          const pt = evalCubicPoint(p0, p1, p2, p3, t);
          const strokeW = lerp(b.w0, b.w1, t) * scaleFactor;

          ctx.strokeStyle = '#7e4e5d';
          ctx.lineWidth = Math.max(1, strokeW);
          ctx.beginPath();
          ctx.moveTo(prevPt.x, prevPt.y);
          ctx.lineTo(pt.x, pt.y);
          ctx.stroke();

          prevPt = pt;
        }
        ctx.restore();
      });

      // 3. Soft glow behind the heart canopy once leaves form
      if (progress > 0.45) {
        const glowAlpha =
          easeOutCubic((progress - 0.45) / 0.55) *
          (0.24 + 0.05 * Math.sin(sec * 1.6));
        const glowGrad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.38,
          10,
          width * 0.5,
          height * 0.38,
          Math.min(width, height) * 0.36
        );
        glowGrad.addColorStop(0, `rgba(255, 107, 139, ${glowAlpha})`);
        glowGrad.addColorStop(1, 'rgba(255, 107, 139, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(
          width * 0.5,
          height * 0.38,
          Math.min(width, height) * 0.36,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // 4. Heart-shaped leaves falling from above & attaching to form a Heart Tree
      sceneData.leaves.forEach((leaf) => {
        if (progress < leaf.start) return;
        const fallT = easeInOutQuad(
          Math.min(1, (progress - leaf.start) / leaf.duration)
        );

        const sway =
          fallT < 1
            ? Math.sin(fallT * Math.PI * 2 + leaf.swayPhase) * leaf.swayAmp
            : Math.sin(sec * 1.4 + leaf.swayPhase) * 0.0035;

        const currX = (lerp(leaf.sx, leaf.tx, fallT) + sway) * width;
        const currY = lerp(leaf.sy, leaf.ty, fallT) * height;
        const leafScale =
          fallT < 1 ? 0.55 + 0.45 * fallT : 1 + 0.05 * Math.sin(sec * 2 + leaf.swayPhase);
        const leafAlpha = Math.min(0.95, 0.25 + fallT * 0.75);

        drawHeartShape(
          ctx,
          currX,
          currY,
          leaf.size * scaleFactor * leafScale,
          leaf.rotation + sway * 5,
          leaf.color,
          leafAlpha
        );
      });

      // 5. Gentle ambient floating hearts around the tree
      if (progress > 0.35) {
        const ambientFade = easeOutCubic((progress - 0.35) / 0.35);
        sceneData.ambientHearts.forEach((ah) => {
          const cycle = (ah.yOffset + sec * ah.speed) % 1;
          const ax =
            (ah.x + Math.sin(sec * 1.1 + ah.phase) * 0.025) * width;
          const ay = (0.9 - cycle * 0.85) * height;
          const edgeFade = Math.sin(cycle * Math.PI);

          drawHeartShape(
            ctx,
            ax,
            ay,
            ah.size * scaleFactor,
            Math.sin(sec + ah.phase) * 0.25,
            ah.color,
            ah.alpha * edgeFade * ambientFade
          );
        });
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', updateSize);
    };
  }, [sceneData, onAnimationComplete]);

  return (
    <section className="tree-section" aria-label="Animated Heart Tree">
      <div className="tree-canvas-wrapper" ref={containerRef}>
        <canvas
          ref={canvasRef}
          className="tree-canvas"
          aria-label="An animated tree growing branches and blooming with colorful heart-shaped leaves"
        />
      </div>
      <p className="tree-caption">{caption}</p>
    </section>
  );
}
