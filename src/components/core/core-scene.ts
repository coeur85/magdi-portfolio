// The 3D database core that follows the scroll story.
// Plain three.js, loaded lazily by <DatabaseCore />. Every frame it reads where the
// viewport is among the [data-scene] sections and blends between the poses below.

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { SceneId } from '@/lib/portfolio';

const ACCENT = new THREE.Color('#2997ff');
const PULSE = new THREE.Color('#d6ebff');
const ALERT = new THREE.Color('#ffb020');

// Disk dimensions
const R = 1.55;
const H = 0.6;
const GAP = 0.14;
const CORNER = 0.09;
const SPREAD = 0.95;

const NODE_COUNT = 6;
const TRAIL = 56;
const REPLICA_OFFSET = new THREE.Vector3(2.1, 0.35, -2.6);
const STEP_COUNT = 16;
const ISSUE_WINDOW = 2.4; // seconds the pulse spends on each problem marker
const STREAKS = 36;

type PulseMode = 'orbit' | 'helix' | 'route' | 'shuttle' | 'scan' | 'weave' | 'neural' | 'climb' | 'visit' | 'beacon';

type Pose = {
  x: number; // fraction of half the viewport width
  y: number; // fraction of half the viewport height
  z: number;
  scale: number;
  rx: number; // tilt toward the camera
  ry: number; // scroll-linked spin
  spread: number; // exploded view, 0..1
  replica: number; // replica slide-out, 0..1
  network: number; // routes drawn out to nodes, 0..1
  ai: number; // neural network above the core, 0..1
  scan: number; // scanning ring, 0..1
  float: number; // disks levitate apart and bob, 0..1
  steps: number; // spiral staircase around the stack, 0..1
  issues: number; // four problem markers, 0..1
  speed: number; // light streaks and fast-spinning disks, 0..1
  orbitals: number; // tilted orbits carrying tool chips, 0..1
  broadcast: number; // signal rings from a beacon above the stack, 0..1
  flow: number; // data band speed
  glow: number;
  pulse: PulseMode;
};

const NUMERIC = [
  'x', 'y', 'z', 'scale', 'rx', 'ry', 'spread', 'replica', 'network', 'ai', 'scan',
  'float', 'steps', 'issues', 'speed', 'orbitals', 'broadcast', 'flow', 'glow',
] as const;

const BASE: Pose = {
  x: 0, y: 0, z: 0, scale: 1, rx: 0.32, ry: 0, spread: 0, replica: 0,
  network: 0, ai: 0, scan: 0, float: 0, steps: 0, issues: 0, speed: 0, orbitals: 0, broadcast: 0,
  flow: 0.4, glow: 1, pulse: 'orbit',
};

const POSES: Record<SceneId, Pose> = {
  intro: { ...BASE, x: 0.42, y: -0.04, ry: 0.5, float: 1 },
  about: { ...BASE, x: 0.44, scale: 0.8, rx: 0.4, ry: 1.3, steps: 1, glow: 0.95, pulse: 'climb' },
  cases: { ...BASE, x: -0.42, scale: 0.78, rx: 0.35, ry: 2, issues: 1, pulse: 'visit' },
  performance: { ...BASE, x: 0.44, rx: 0.22, ry: 2.8, flow: 2.4, glow: 1.3, speed: 1, pulse: 'helix' },
  cloud: { ...BASE, x: -0.42, scale: 0.78, rx: 0.42, ry: 3.6, network: 1, pulse: 'route' },
  resilience: { ...BASE, x: 0.3, scale: 0.78, ry: 4.4, replica: 1, pulse: 'shuttle' },
  observability: { ...BASE, x: -0.44, rx: 0.26, ry: 5.2, scan: 1, glow: 1.1, pulse: 'scan' },
  data: { ...BASE, x: 0.44, scale: 0.86, rx: 0.5, ry: 5.9, spread: 1, pulse: 'weave' },
  architecture: { ...BASE, x: -0.42, y: -0.14, scale: 0.72, rx: 0.3, ry: 6.7, ai: 1, glow: 1.1, pulse: 'neural' },
  skills: { ...BASE, x: 0.52, y: 0.08, z: -1, scale: 0.7, rx: 0.4, ry: 7.6, glow: 0.9, orbitals: 1 },
  contact: { ...BASE, y: -0.3, scale: 0.56, rx: 0.3, ry: 8.6, glow: 1.2, broadcast: 1, pulse: 'beacon' },
};

// On portrait screens the core stays centred above the text instead of beside it.
function adapt(pose: Pose, id: SceneId, portrait: boolean): Pose {
  if (!portrait) return pose;
  const y = id === 'contact' ? -0.03 : id === 'intro' ? 0.5 : id === 'architecture' ? 0.06 : 0.22;
  const scale = id === 'contact' ? 0.55 : id === 'intro' ? 0.5 : 0.6;
  return { ...pose, x: -0.3 * pose.replica, y, scale: pose.scale * scale };
}

type Section = { id: SceneId; top: number; bottom: number };

// Continuous scene coordinate: i while the viewport centre is inside section i,
// easing to i + 0.5 at the boundary with the next section.
function sceneCoordinate(sections: Section[], centre: number, vh: number) {
  if (!sections.length) return 0;
  const h = vh * 0.35;
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i];
    if (centre < s.top || centre >= s.bottom) continue;
    let v = i;
    if (i < sections.length - 1) v += THREE.MathUtils.clamp((centre - (s.bottom - h)) / (2 * h), 0, 0.5);
    if (i > 0) v -= THREE.MathUtils.clamp((s.top + h - centre) / (2 * h), 0, 0.5);
    return v;
  }
  return centre < sections[0].top ? 0 : sections.length - 1;
}

const smoothstep = (t: number) => t * t * (3 - 2 * t);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  draw(canvas.getContext('2d')!);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function glowTexture() {
  return canvasTexture(256, 256, (g) => {
    const gradient = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.25, 'rgba(255,255,255,0.35)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gradient;
    g.fillRect(0, 0, 256, 256);
  });
}

// Dashes that stream around the side of each disk.
function bandTexture(seed: number) {
  const random = mulberry32(seed);
  const texture = canvasTexture(1024, 8, (g) => {
    let x = 0;
    while (x < 1024) {
      const w = 4 + random() * 40;
      g.fillStyle = `rgba(255,255,255,${0.3 + random() * 0.7})`;
      g.fillRect(x, 0, w, 8);
      x += w + 8 + random() * 34;
    }
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.set(2, 1);
  return texture;
}

// Platter-like grooves on the top of each disk.
function capTexture() {
  const random = mulberry32(7);
  return canvasTexture(512, 512, (g) => {
    for (let r = 40; r < 250; r += 5 + random() * 6) {
      g.strokeStyle = `rgba(255,255,255,${0.04 + random() * 0.1})`;
      g.lineWidth = 1 + random();
      g.beginPath();
      g.arc(256, 256, r, 0, Math.PI * 2);
      g.stroke();
    }
    g.strokeStyle = 'rgba(255,255,255,0.5)';
    g.lineWidth = 2;
    g.beginPath();
    g.arc(256, 256, 252, 0, Math.PI * 2);
    g.stroke();
  });
}

// A disk with rounded edges, turned on a lathe.
function diskGeometry() {
  const points = [new THREE.Vector2(0, -H / 2), new THREE.Vector2(R - CORNER, -H / 2)];
  for (let i = 1; i <= 8; i++) {
    const a = -Math.PI / 2 + (i / 8) * (Math.PI / 2);
    points.push(new THREE.Vector2(R - CORNER + Math.cos(a) * CORNER, -H / 2 + CORNER + Math.sin(a) * CORNER));
  }
  points.push(new THREE.Vector2(R, H / 2 - CORNER));
  for (let i = 1; i <= 8; i++) {
    const a = (i / 8) * (Math.PI / 2);
    points.push(new THREE.Vector2(R - CORNER + Math.cos(a) * CORNER, H / 2 - CORNER + Math.sin(a) * CORNER));
  }
  points.push(new THREE.Vector2(0, H / 2));
  return new THREE.LatheGeometry(points, 128);
}

type Shared = {
  disk: THREE.BufferGeometry;
  rim: THREE.BufferGeometry;
  band: THREE.BufferGeometry;
  cap: THREE.BufferGeometry;
  capMap: THREE.Texture;
};

function additive(color: THREE.Color, map?: THREE.Texture) {
  const material = new THREE.MeshBasicMaterial({
    color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
  });
  if (map) material.map = map;
  return material;
}

function createStack(shared: Shared, seed: number, transparent: boolean) {
  const group = new THREE.Group();
  const body = new THREE.MeshStandardMaterial({
    color: 0x07090e, metalness: 0.85, roughness: 0.4, envMapIntensity: 0.25, transparent,
  });
  const rim = additive(new THREE.Color());
  const rimLow = additive(new THREE.Color());
  const cap = additive(new THREE.Color(), shared.capMap);
  const bands: THREE.MeshBasicMaterial[] = [];
  const disks: THREE.Group[] = [];

  for (let i = 0; i < 3; i++) {
    const disk = new THREE.Group();
    disk.add(new THREE.Mesh(shared.disk, body));

    const top = new THREE.Mesh(shared.rim, rim);
    top.rotation.x = Math.PI / 2;
    top.position.y = H / 2 - CORNER;
    const bottom = new THREE.Mesh(shared.rim, rimLow);
    bottom.rotation.x = Math.PI / 2;
    bottom.position.y = -H / 2 + CORNER;

    const band = additive(new THREE.Color(), bandTexture(seed + i));
    bands.push(band);
    const capMesh = new THREE.Mesh(shared.cap, cap);
    capMesh.rotation.x = -Math.PI / 2;
    capMesh.position.y = H / 2 + 0.002;

    disk.add(top, bottom, new THREE.Mesh(shared.band, band), capMesh);
    disks.push(disk);
    group.add(disk);
  }

  return {
    group,
    disks,
    bands,
    setLook(glow: number, opacity = 1) {
      body.opacity = opacity;
      rim.color.copy(ACCENT).multiplyScalar(2.6 * glow * opacity);
      rimLow.color.copy(ACCENT).multiplyScalar(0.7 * glow * opacity);
      cap.color.copy(ACCENT).multiplyScalar(0.9 * glow * opacity);
      for (const band of bands) band.color.copy(ACCENT).multiplyScalar(2.4 * glow * opacity);
    },
    setSpread(spread: number) {
      disks.forEach((disk, i) => {
        disk.position.y = (i - 1) * (H + GAP + spread * SPREAD);
        disk.rotation.y = (i - 1) * spread * 0.5;
      });
    },
    flow(dt: number, speed: number) {
      bands.forEach((band, i) => {
        if (band.map) band.map.offset.x += dt * (0.03 + speed * 0.08) * (i % 2 ? -1 : 1);
      });
    },
  };
}

export function createCoreScene(canvas: HTMLCanvasElement): () => void {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  } catch {
    return () => {};
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Rendering is pixel-bound (bloom makes several full-screen passes), so cap the pixels drawn
  // per frame. The frame-rate monitor in tick() lowers `quality` further on slower GPUs.
  const PIXEL_BUDGET = 2.2e6;
  let quality = 1;
  let bloomOn = true;
  const pixelRatio = () => {
    const cap = Math.min(window.devicePixelRatio, 1.5, Math.sqrt(PIXEL_BUDGET / (window.innerWidth * window.innerHeight)));
    return Math.max(0.5, cap * quality);
  };
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 12);

  const key = new THREE.DirectionalLight(0xffffff, 0.9);
  key.position.set(4, 6, 8);
  const rimLight = new THREE.DirectionalLight(ACCENT, 3);
  rimLight.position.set(-5, 2, -6);
  const fill = new THREE.DirectionalLight(ACCENT, 0.5);
  fill.position.set(0, -6, 3);
  scene.add(key, rimLight, fill);

  const glowMap = glowTexture();
  const shared: Shared = {
    disk: diskGeometry(),
    rim: new THREE.TorusGeometry(R + 0.004, 0.009, 6, 200),
    band: new THREE.CylinderGeometry(R + 0.006, R + 0.006, 0.05, 128, 1, true),
    cap: new THREE.CircleGeometry(R - CORNER * 0.6, 96),
    capMap: capTexture(),
  };

  // root: where the core sits on screen. spinner: its own spin and tilt.
  const root = new THREE.Group();
  const spinner = new THREE.Group();
  root.add(spinner);
  scene.add(root);

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: glowMap, color: ACCENT, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  halo.scale.setScalar(7.5);
  halo.position.z = -2.5;
  root.add(halo);

  const core = createStack(shared, 11, false);
  spinner.add(core.group);

  const replica = createStack(shared, 23, true);
  root.add(replica.group);

  // Network routes from the core out to surrounding nodes.
  const layout = Array.from({ length: NODE_COUNT }, (_, i) => {
    const a = (i / NODE_COUNT) * Math.PI * 2 + 0.3;
    return new THREE.Vector3(Math.cos(a) * 3.5, i % 2 ? 0.7 : -0.5, Math.sin(a) * 3.5);
  });
  const network = new THREE.Group();
  spinner.add(network);
  const nodeMaterial = new THREE.MeshBasicMaterial({ color: ACCENT.clone().multiplyScalar(4), toneMapped: false });
  const nodeGeometry = new THREE.SphereGeometry(0.07, 16, 16);
  const nodes = layout.map((position) => {
    const node = new THREE.Group();
    node.add(new THREE.Mesh(nodeGeometry, nodeMaterial));
    const nodeHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: glowMap, color: ACCENT, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    nodeHalo.scale.setScalar(0.8);
    node.add(nodeHalo);
    const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: ACCENT.clone().multiplyScalar(2.2), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
    });
    const line = new THREE.Line(geometry, lineMaterial);
    network.add(node, line);
    return { node, line, target: position };
  });

  // Scanning ring for the observability chapter.
  const scan = new THREE.Group();
  const scanRingMaterial = additive(new THREE.Color());
  const scanDiscMaterial = additive(new THREE.Color());
  scanDiscMaterial.side = THREE.DoubleSide;
  const scanRing = new THREE.Mesh(new THREE.TorusGeometry(R + 0.34, 0.012, 6, 200), scanRingMaterial);
  scanRing.rotation.x = Math.PI / 2;
  const scanDisc = new THREE.Mesh(new THREE.RingGeometry(R + 0.02, R + 0.34, 128), scanDiscMaterial);
  scanDisc.rotation.x = -Math.PI / 2;
  scan.add(scanRing, scanDisc);
  spinner.add(scan);

  // Neural network for the AI chapter: rings of nodes above the core, wired layer to
  // layer and then into the top of the stack, with signals firing down through it.
  const neural = new THREE.Group();
  spinner.add(neural);
  const neuralRandom = mulberry32(5);
  const coreInput = new THREE.Vector3(0, H + GAP + H / 2 + 0.02, 0);
  const neurons: { position: THREE.Vector3; layer: number; next: number[] }[] = [];
  [
    { count: 11, radius: 2.7, y: 3.5 },
    { count: 8, radius: 2.05, y: 2.75 },
    { count: 6, radius: 1.35, y: 2.0 },
  ].forEach(({ count, radius, y }, layer) => {
    for (let k = 0; k < count; k++) {
      const angle = (k / count) * Math.PI * 2 + layer * 0.37;
      neurons.push({
        position: new THREE.Vector3(Math.cos(angle) * radius, y + (k % 2 ? 0.08 : -0.08), Math.sin(angle) * radius),
        layer,
        next: [],
      });
    }
  });
  // Each neuron feeds the two nearest neurons (by angle) in the layer below; the last layer feeds the core.
  const angleBetween = (p: THREE.Vector3, q: THREE.Vector3) => {
    const d = Math.abs(Math.atan2(p.z, p.x) - Math.atan2(q.z, q.x)) % (Math.PI * 2);
    return Math.min(d, Math.PI * 2 - d);
  };
  for (const neuron of neurons) {
    const below = neurons.map((n, i) => ({ n, i })).filter(({ n }) => n.layer === neuron.layer + 1);
    neuron.next = below.length
      ? below.sort((p, q) => angleBetween(p.n.position, neuron.position) - angleBetween(q.n.position, neuron.position)).slice(0, 2).map(({ i }) => i)
      : [-1];
  }
  const neuralTarget = (index: number) => (index < 0 ? coreInput : neurons[index].position);
  const edgePositions: number[] = [];
  for (const neuron of neurons) {
    for (const j of neuron.next) edgePositions.push(...neuron.position.toArray(), ...neuralTarget(j).toArray());
  }
  const edgeGeometry = new THREE.BufferGeometry();
  edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
  });
  neural.add(new THREE.LineSegments(edgeGeometry, edgeMaterial));

  const neuronColors = new Float32Array(neurons.length * 3);
  const neuronFlash = new Float32Array(neurons.length);
  const neuronGeometry = new THREE.BufferGeometry().setFromPoints(neurons.map((n) => n.position));
  neuronGeometry.setAttribute('color', new THREE.BufferAttribute(neuronColors, 3));
  const neuronPoints = new THREE.Points(
    neuronGeometry,
    new THREE.PointsMaterial({
      size: 0.34, map: glowMap, vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
    }),
  );
  neuronPoints.frustumCulled = false;
  neural.add(neuronPoints);

  const inputCount = neurons.filter((n) => n.layer === 0).length;
  const pick = (options: number[]) => options[Math.floor(neuralRandom() * options.length)];
  const signals = Array.from({ length: 14 }, () => {
    const from = Math.floor(neuralRandom() * neurons.length);
    return { from, to: pick(neurons[from].next), t: neuralRandom(), speed: 0.9 + neuralRandom() * 0.6 };
  });
  const signalPositions = new Float32Array(signals.length * 3);
  const signalGeometry = new THREE.BufferGeometry();
  signalGeometry.setAttribute('position', new THREE.BufferAttribute(signalPositions, 3));
  const signalMaterial = new THREE.PointsMaterial({
    size: 0.2, map: glowMap, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
  });
  const signalPoints = new THREE.Points(signalGeometry, signalMaterial);
  signalPoints.frustumCulled = false;
  neural.add(signalPoints);
  let coreFlash = 0;

  // About: a spiral staircase of glowing steps that the pulse climbs.
  const stairTurn = Math.PI * 3.2;
  const stairPoint = (u: number, out: THREE.Vector3) =>
    out.set(Math.cos(u * stairTurn) * (R + 0.55), THREE.MathUtils.lerp(-1.25, 1.45, u), Math.sin(u * stairTurn) * (R + 0.55));
  const stairs = new THREE.Group();
  spinner.add(stairs);
  const stepGeometry = new THREE.BoxGeometry(0.46, 0.05, 0.22);
  const steps = Array.from({ length: STEP_COUNT }, (_, k) => {
    const u = k / (STEP_COUNT - 1);
    const step = new THREE.Mesh(stepGeometry, additive(new THREE.Color()));
    stairPoint(u, step.position);
    step.rotation.y = -u * stairTurn; // radial, like the treads of a spiral staircase
    stairs.add(step);
    return { u, material: step.material as THREE.MeshBasicMaterial };
  });

  // Case studies: four problem markers; the pulse visits each and it turns from amber to blue.
  const issues = new THREE.Group();
  spinner.add(issues);
  const issueGeometry = new THREE.OctahedronGeometry(0.13);
  const issueMarkers = [0, 1, 2, 3].map((k) => {
    const angle = Math.PI / 4 + (k * Math.PI) / 2;
    const position = new THREE.Vector3(Math.cos(angle) * (R + 1), k % 2 ? 0.45 : -0.35, Math.sin(angle) * (R + 1));
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(), transparent: true, toneMapped: false });
    const mesh = new THREE.Mesh(issueGeometry, material);
    mesh.position.copy(position);
    const haloMaterial = new THREE.SpriteMaterial({
      map: glowMap, color: new THREE.Color(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const halo = new THREE.Sprite(haloMaterial);
    halo.scale.setScalar(0.9);
    halo.position.copy(position);
    issues.add(mesh, halo);
    return { position, mesh, material, haloMaterial };
  });

  // Performance: light streaks rushing past the core.
  const streakRandom = mulberry32(9);
  const streakData = Array.from({ length: STREAKS }, () => ({
    x: (streakRandom() - 0.5) * 5.6,
    y: (streakRandom() - 0.5) * 3.6,
    z: (streakRandom() - 0.5) * 3,
    length: 0.6 + streakRandom() * 1.4,
    speed: 7 + streakRandom() * 7,
  }));
  const streakPositions = new Float32Array(STREAKS * 6);
  const streakColors = new Float32Array(STREAKS * 6);
  const streakGeometry = new THREE.BufferGeometry();
  streakGeometry.setAttribute('position', new THREE.BufferAttribute(streakPositions, 3));
  streakGeometry.setAttribute('color', new THREE.BufferAttribute(streakColors, 3));
  const streakMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color(), vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
  });
  const streaks = new THREE.LineSegments(streakGeometry, streakMaterial);
  streaks.frustumCulled = false;
  root.add(streaks);
  const spinOffsets = [0, 0, 0];

  // Skills: four tilted orbits, one per skill group, each carrying small tool chips.
  const orbitals = new THREE.Group();
  root.add(orbitals);
  const chipGeometry = new THREE.BoxGeometry(0.14, 0.14, 0.14);
  const orbitRingMaterial = additive(new THREE.Color());
  const chipMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(), transparent: true, toneMapped: false });
  const orbits = [
    { radius: 2.0, tilt: new THREE.Euler(1.25, 0, 0.25), chips: 4, speed: 0.5 },
    { radius: 2.3, tilt: new THREE.Euler(1.0, 0.5, -0.5), chips: 3, speed: -0.38 },
    { radius: 2.6, tilt: new THREE.Euler(1.7, -0.4, 0.6), chips: 5, speed: 0.3 },
    { radius: 2.9, tilt: new THREE.Euler(1.45, 0.9, -0.15), chips: 3, speed: -0.24 },
  ].map(({ radius, tilt, chips, speed }) => {
    const plane = new THREE.Group();
    plane.rotation.copy(tilt);
    plane.add(new THREE.Mesh(new THREE.TorusGeometry(radius, 0.006, 4, 220), orbitRingMaterial));
    const chipMeshes = Array.from({ length: chips }, () => {
      const chip = new THREE.Mesh(chipGeometry, chipMaterial);
      plane.add(chip);
      return chip;
    });
    orbitals.add(plane);
    return { radius, chips: chipMeshes, speed };
  });

  // Contact: the pulse becomes a beacon above the stack, sending out signal rings.
  const beaconTop = new THREE.Vector3(0, H + GAP + H / 2 + 0.5, 0);
  const beaconRoot = new THREE.Vector3();
  const tint = new THREE.Color();
  const signalRings = [0, 1, 2].map(() => {
    const material = additive(new THREE.Color());
    material.side = THREE.DoubleSide;
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.96, 1, 128), material);
    root.add(ring);
    return { ring, material };
  });

  // The data pulse: the second object travelling with the core.
  const pulse = new THREE.Group();
  pulse.add(new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 20), new THREE.MeshBasicMaterial({ color: PULSE.clone().multiplyScalar(4), toneMapped: false })));
  const pulseHalo = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: glowMap, color: ACCENT, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  pulseHalo.scale.setScalar(1.1);
  pulse.add(pulseHalo);
  root.add(pulse);

  const trailPositions = new Float32Array(TRAIL * 3);
  const trailColors = new Float32Array(TRAIL * 3);
  const trailGeometry = new THREE.BufferGeometry();
  trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
  trailGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));
  for (let i = 0; i < TRAIL; i++) {
    const fade = Math.pow(1 - i / TRAIL, 1.6) * 2;
    trailColors.set([ACCENT.r * fade, ACCENT.g * fade, ACCENT.b * fade], i * 3);
  }
  const trail = new THREE.Points(
    trailGeometry,
    new THREE.PointsMaterial({
      size: 0.11, map: glowMap, vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
    }),
  );
  trail.frustumCulled = false;
  scene.add(trail);

  // Dust that drifts past as the page scrolls, for depth.
  const random = mulberry32(3);
  const dustPositions = new Float32Array(420 * 3);
  for (let i = 0; i < 420; i++) dustPositions.set([(random() - 0.5) * 26, -17 + random() * 26, -3 - random() * 12], i * 3);
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dust = new THREE.Points(
    dustGeometry,
    new THREE.PointsMaterial({ size: 0.035, color: 0x8fb8e8, transparent: true, opacity: 0.32, depthWrite: false }),
  );
  scene.add(dust);

  const target = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 2 });
  const composer = new EffectComposer(renderer, target);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.85, 0.55, 0.6);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  let sections: Section[] = [];
  const measure = () => {
    sections = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]')).map((el) => {
      const rect = el.getBoundingClientRect();
      return { id: el.dataset.scene as SceneId, top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY };
    });
  };

  let portrait = false;
  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const ratio = pixelRatio();
    renderer.setPixelRatio(ratio);
    renderer.setSize(w, h, false);
    composer.setPixelRatio(ratio);
    composer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    portrait = w / h < 0.85;
    measure();
  };
  resize();
  window.addEventListener('resize', resize);
  const observer = new ResizeObserver(measure);
  observer.observe(document.body);

  const pointer = new THREE.Vector2();
  const parallax = new THREE.Vector2();
  const onPointer = (e: PointerEvent) => {
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
  };
  if (!reducedMotion) window.addEventListener('pointermove', onPointer, { passive: true });

  const poseAt = (index: number): Pose => {
    const section = sections[Math.max(0, Math.min(index, sections.length - 1))];
    const id = section?.id ?? 'intro';
    return adapt(POSES[id] ?? BASE, id, portrait);
  };

  const pose = { ...BASE };
  const v = new THREE.Vector3();
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const worldPulse = new THREE.Vector3();
  const lastPulse = new THREE.Vector3();
  let trailReady = false;

  // Where the pulse is for a given mode, in root space.
  const pulsePoint = (mode: PulseMode, t: number, stackHalf: number, out: THREE.Vector3) => {
    switch (mode) {
      case 'orbit': {
        const angle = t * 0.9;
        out.set(Math.cos(angle) * 2.5, Math.sin(angle * 0.7) * 0.5, Math.sin(angle) * 2.5);
        break;
      }
      case 'helix': {
        const angle = t * 4.2;
        out.set(Math.cos(angle) * (R + 0.25), Math.sin(t * 1.5) * stackHalf * 1.1, Math.sin(angle) * (R + 0.25));
        break;
      }
      case 'route': {
        const k = Math.floor(t * 0.55) % NODE_COUNT;
        const u = Math.sin(((t * 0.55) % 1) * Math.PI);
        out.copy(nodes[k].target).multiplyScalar(u);
        break;
      }
      case 'shuttle': {
        const u = 0.5 - 0.5 * Math.cos(t * 1.6);
        out.copy(replica.group.position).multiplyScalar(u);
        out.y += Math.sin(u * Math.PI) * 1.1;
        return out; // already in root space
      }
      case 'scan': {
        const angle = t * 2.4;
        out.set(Math.cos(angle) * (R + 0.34), scan.position.y, Math.sin(angle) * (R + 0.34));
        break;
      }
      case 'weave': {
        const angle = t * 1.6;
        out.set(Math.cos(angle) * (R + 0.35), Math.sin(angle * 0.5) * stackHalf, Math.sin(angle) * (R + 0.35));
        break;
      }
      case 'climb': {
        // Up the staircase and back down, riding just above the treads.
        stairPoint(0.5 - 0.5 * Math.cos(t * 0.6), out).y += 0.12;
        break;
      }
      case 'visit': {
        // Marker to marker around the core, circling each one while it is fixed.
        const cycle = t / ISSUE_WINDOW;
        const k = Math.floor(cycle) % issueMarkers.length;
        const phase = cycle - Math.floor(cycle);
        const travel = smoothstep(Math.min(phase / 0.5, 1));
        out.lerpVectors(issueMarkers[(k + 3) % 4].position, issueMarkers[k].position, travel);
        const radial = Math.hypot(out.x, out.z) || 1;
        const bulge = Math.sin(travel * Math.PI) * 0.6;
        out.x += (out.x / radial) * bulge;
        out.z += (out.z / radial) * bulge;
        if (phase > 0.5) {
          const angle = (phase - 0.5) * 14;
          const size = Math.sin(((phase - 0.5) / 0.5) * Math.PI) * 0.22;
          out.x += Math.cos(angle) * size;
          out.z += Math.sin(angle) * size;
        }
        break;
      }
      case 'beacon': {
        out.copy(beaconTop);
        out.y += Math.sin(t * 2) * 0.06;
        break;
      }
      case 'neural': {
        // Spirals down through the neural layers into the core and back up.
        const u = 0.5 - 0.5 * Math.cos(t * 0.8);
        const radius = THREE.MathUtils.lerp(2.7, 0.25, u);
        const angle = t * 1.4;
        out.set(Math.cos(angle) * radius, THREE.MathUtils.lerp(3.5, coreInput.y, u), Math.sin(angle) * radius);
        break;
      }
    }
    return out.applyQuaternion(spinner.quaternion);
  };

  // Steps quality down while frames run slow, then turns bloom off as a last resort,
  // and steps back up when there is headroom. The first seconds are skipped (shader compiles).
  let warmup = 2.5;
  let sampleTime = 0;
  let sampleFrames = 0;
  const adjustQuality = (fps: number) => {
    if (fps < 45 && quality > 0.55) {
      quality = Math.max(0.55, quality - 0.15);
      resize();
    } else if (fps < 30 && bloomOn) {
      bloomOn = false;
    } else if (fps > 57 && bloomOn && quality < 1) {
      quality = Math.min(1, quality + 0.1);
      resize();
    }
  };

  let frame = 0;
  let last = performance.now();
  const start = last;
  let elapsed = 0;
  let coordinate = -1;

  const tick = (now: number) => {
    frame = requestAnimationFrame(tick);
    // The first frame's timestamp can predate setup, so never let time run backwards.
    const frameTime = (now - last) / 1000;
    const dt = THREE.MathUtils.clamp(frameTime, 0, 0.1);
    last = now;
    // Real frame time, not the clamped dt, so very slow machines adapt quickly too.
    // Gaps over 2s (a background tab) are ignored.
    if (warmup > 0) {
      warmup -= Math.max(frameTime, 0);
    } else if (frameTime > 0 && frameTime < 2) {
      sampleTime += frameTime;
      sampleFrames++;
      if (sampleTime > 1.5) {
        adjustQuality(sampleFrames / sampleTime);
        sampleTime = 0;
        sampleFrames = 0;
      }
    }
    elapsed += dt * (reducedMotion ? 0.3 : 1);
    const appear = easeOutCubic(Math.min((now - start) / 1800, 1));

    // Scroll -> scene coordinate, damped so the core glides between poses.
    const vh = window.innerHeight;
    const targetCoordinate = sceneCoordinate(sections, window.scrollY + vh / 2, vh);
    coordinate = coordinate < 0 ? targetCoordinate : coordinate + (targetCoordinate - coordinate) * (1 - Math.exp(-dt * 4.5));
    const i0 = Math.floor(coordinate);
    const blend = smoothstep(coordinate - i0);
    const from = poseAt(i0);
    const to = poseAt(i0 + 1);
    for (const key of NUMERIC) pose[key] = THREE.MathUtils.lerp(from[key], to[key], blend);

    const halfH = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const halfW = halfH * camera.aspect;
    root.position.set(pose.x * halfW, pose.y * halfH - (1 - appear) * 0.6, pose.z);
    root.scale.setScalar(pose.scale * (0.75 + 0.25 * appear));
    parallax.lerp(pointer, 1 - Math.exp(-dt * 3));
    root.rotation.set(parallax.y * 0.08, parallax.x * 0.12, 0);
    spinner.rotation.set(pose.rx, pose.ry + elapsed * 0.15, 0);

    const glow = pose.glow * appear;

    // Signals hop neuron to neuron down the layers; each one reaching the core makes it flare.
    const ai = pose.ai;
    neural.visible = ai > 0.005;
    coreFlash *= Math.exp(-dt * 3);
    if (neural.visible) {
      neural.position.y = (1 - ai) * -0.6;
      edgeMaterial.color.copy(ACCENT).multiplyScalar(0.55 * ai);
      signalMaterial.color.copy(PULSE).multiplyScalar(2.4 * ai);
      signals.forEach((signal, i) => {
        signal.t += dt * signal.speed * (reducedMotion ? 0.3 : 1);
        if (signal.t >= 1) {
          if (signal.to < 0) {
            coreFlash = 1;
            signal.from = Math.floor(neuralRandom() * inputCount);
          } else {
            neuronFlash[signal.to] = 1;
            signal.from = signal.to;
          }
          signal.to = pick(neurons[signal.from].next);
          signal.t = 0;
        }
        v.lerpVectors(neurons[signal.from].position, neuralTarget(signal.to), signal.t);
        signalPositions.set([v.x, v.y, v.z], i * 3);
      });
      signalGeometry.attributes.position.needsUpdate = true;
      neurons.forEach((_, i) => {
        neuronFlash[i] *= Math.exp(-dt * 3.5);
        const base = 0.9 * ai;
        const flash = neuronFlash[i] * 2.2 * ai;
        neuronColors.set([ACCENT.r * base + PULSE.r * flash, ACCENT.g * base + PULSE.g * flash, ACCENT.b * base + PULSE.b * flash], i * 3);
      });
      neuronGeometry.attributes.color.needsUpdate = true;
    }

    core.setSpread(pose.spread);
    core.setLook(glow * (1 + 0.4 * coreFlash * ai));
    core.flow(dt, pose.flow);
    core.disks.forEach((disk, i) => {
      // Opening: the disks levitate apart, each bobbing on its own rhythm.
      disk.position.y += pose.float * ((i - 1) * 0.16 + Math.sin(elapsed * 1.3 + i * 1.7) * 0.07);
      disk.rotation.z = pose.float * Math.sin(elapsed * 0.8 + i * 2.1) * 0.05;
      disk.rotation.x = pose.float * Math.cos(elapsed * 0.7 + i * 1.3) * 0.04;
      // Performance: each disk spins at its own speed, alternating direction.
      spinOffsets[i] += dt * pose.speed * (1.5 + i) * (i % 2 ? -1 : 1);
      disk.rotation.y += spinOffsets[i];
    });
    halo.material.opacity = 0.16 * glow;
    const stackHalf = H + GAP + pose.spread * SPREAD + H / 2;

    const r = pose.replica;
    replica.group.visible = r > 0.005;
    if (replica.group.visible) {
      replica.group.position.copy(REPLICA_OFFSET).multiplyScalar(smoothstep(r));
      replica.group.scale.setScalar(0.7 + 0.15 * r);
      replica.group.rotation.copy(spinner.rotation);
      replica.setSpread(0);
      replica.setLook(glow * 0.85, r);
      replica.flow(dt, pose.flow);
    }

    network.visible = pose.network > 0.005;
    nodes.forEach(({ node, line, target: nodeTarget }, i) => {
      const drawn = THREE.MathUtils.clamp(pose.network * 1.8 - i * 0.13, 0, 1);
      v.copy(nodeTarget).multiplyScalar(drawn);
      const positions = line.geometry.attributes.position as THREE.BufferAttribute;
      positions.setXYZ(1, v.x, v.y, v.z);
      positions.needsUpdate = true;
      (line.material as THREE.LineBasicMaterial).opacity = drawn;
      node.position.copy(nodeTarget);
      node.scale.setScalar(Math.max(0, (drawn - 0.75) / 0.25) + 1e-4);
    });

    scan.visible = pose.scan > 0.005;
    scan.position.y = Math.sin(elapsed * 1.3) * (stackHalf + 0.05);
    scanRingMaterial.color.copy(ACCENT).multiplyScalar(3.2 * pose.scan);
    scanDiscMaterial.color.copy(ACCENT).multiplyScalar(0.25 * pose.scan);

    stairs.visible = pose.steps > 0.005;
    if (stairs.visible) {
      const climbed = 0.5 - 0.5 * Math.cos(elapsed * 0.6);
      for (const step of steps) {
        const shown = THREE.MathUtils.clamp((pose.steps * 1.3 - step.u) * 6, 0, 1);
        const lit = (step.u <= climbed ? 1.5 : 0.55) + 2.6 * Math.exp(-((step.u - climbed) ** 2) / 0.004);
        step.material.color.copy(ACCENT).multiplyScalar(lit * shown);
      }
    }

    issues.visible = pose.issues > 0.005;
    if (issues.visible) {
      const cycle = elapsed / ISSUE_WINDOW;
      const current = Math.floor(cycle) % issueMarkers.length;
      const phase = cycle - Math.floor(cycle);
      issueMarkers.forEach((marker, k) => {
        const resolved = k < current || (k === current && phase > 0.5);
        const flash = k === current && phase > 0.5 ? Math.max(0, 1 - (phase - 0.5) * 4) : 0;
        marker.material.color.copy(resolved ? ACCENT : ALERT).multiplyScalar((resolved ? 1.8 : 0.6) * pose.issues).add(tint.copy(PULSE).multiplyScalar(flash * 1.5 * pose.issues));
        marker.material.opacity = pose.issues;
        marker.haloMaterial.color.copy(resolved ? ACCENT : ALERT);
        marker.haloMaterial.opacity = (resolved ? 0.35 : 0.08) * pose.issues;
        marker.mesh.rotation.y = elapsed * 1.5;
        marker.mesh.scale.setScalar(pose.issues * (1 + flash * 0.6) + 1e-4);
      });
    }

    streaks.visible = pose.speed > 0.005;
    if (streaks.visible) {
      streakMaterial.color.copy(ACCENT).multiplyScalar(1.8 * pose.speed);
      streakData.forEach((streak, i) => {
        streak.x += dt * streak.speed * (reducedMotion ? 0.3 : 1);
        if (streak.x > 2.8) streak.x -= 5.6;
        streakPositions.set([streak.x - streak.length, streak.y, streak.z, streak.x, streak.y, streak.z], i * 6);
        // Dark tail, bright head, fading in and out at the ends of the run so streaks stay near the core.
        const head = Math.sin(((streak.x + 2.8) / 5.6) * Math.PI);
        streakColors.set([0, 0, 0, head, head, head], i * 6);
      });
      streakGeometry.attributes.position.needsUpdate = true;
      streakGeometry.attributes.color.needsUpdate = true;
    }

    orbitals.visible = pose.orbitals > 0.005;
    if (orbitals.visible) {
      orbitals.scale.setScalar(0.6 + 0.4 * pose.orbitals);
      orbitals.rotation.y = elapsed * 0.08;
      orbitRingMaterial.color.copy(ACCENT).multiplyScalar(0.7 * pose.orbitals);
      chipMaterial.color.copy(PULSE).multiplyScalar(2.2);
      chipMaterial.opacity = pose.orbitals;
      for (const orbit of orbits) {
        orbit.chips.forEach((chip, j) => {
          const angle = elapsed * orbit.speed + (j / orbit.chips.length) * Math.PI * 2;
          chip.position.set(Math.cos(angle) * orbit.radius, Math.sin(angle) * orbit.radius, 0);
          chip.rotation.set(elapsed, elapsed * 0.7, 0);
        });
      }
    }

    beaconRoot.copy(beaconTop).applyQuaternion(spinner.quaternion);
    signalRings.forEach(({ ring, material }, k) => {
      ring.visible = pose.broadcast > 0.005;
      if (!ring.visible) return;
      const phase = (elapsed * 0.45 + k / signalRings.length) % 1;
      ring.position.copy(beaconRoot);
      ring.scale.setScalar(0.2 + phase * 1.6);
      material.color.copy(ACCENT).multiplyScalar(1.2 * Math.pow(1 - phase, 1.5) * pose.broadcast);
    });

    // Blend the pulse between the outgoing and incoming chapter's paths.
    pulsePoint(from.pulse, elapsed, stackHalf, a);
    pulsePoint(to.pulse, elapsed, stackHalf, b);
    pulse.position.lerpVectors(a, b, blend);
    pulse.scale.setScalar(appear);
    root.updateMatrixWorld();
    pulse.getWorldPosition(worldPulse);

    if (!trailReady || worldPulse.distanceTo(lastPulse) > 2) {
      for (let i = 0; i < TRAIL; i++) trailPositions.set([worldPulse.x, worldPulse.y, worldPulse.z], i * 3);
      trailReady = true;
    } else {
      trailPositions.copyWithin(3, 0, (TRAIL - 1) * 3);
      trailPositions.set([worldPulse.x, worldPulse.y, worldPulse.z], 0);
    }
    lastPulse.copy(worldPulse);
    trailGeometry.attributes.position.needsUpdate = true;

    dust.position.y = coordinate * 0.9;
    dust.rotation.y = elapsed * 0.01;

    if (bloomOn) composer.render();
    else renderer.render(scene, camera);
  };
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onPointer);
    observer.disconnect();
    scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      mesh.geometry?.dispose();
      const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
      for (const material of materials) {
        (material as THREE.MeshBasicMaterial).map?.dispose();
        material.dispose();
      }
    });
    glowMap.dispose();
    environment.dispose();
    pmrem.dispose();
    target.dispose();
    composer.dispose();
    renderer.dispose();
  };
}
