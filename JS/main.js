// 3D Swarm – Sey Min Edition (Three.js)
// Optimized for cinematic 16:9 widescreen and stable balance.
// ─────────────────────────────────────────

// ── SHAPES_DEF (identically structured count + colors) ──
const SHAPES_DEF = [
    { id: 'NODE_01',       w: 43,  h: 173, color: '#ff00aa', filled: false },
    { id: 'VECTOR_B',      w: 230, h: 29,  color: '#ff007f', filled: false },
    { id: 'ID_9928',       w: 86,  h: 86,  color: '#ffff00', filled: false },
    { id: 'STRUC_04',      w: 24,  h: 115, color: '#32cd32', filled: false },
    { id: 'LATENCY_CORE',  w: 288, h: 58,  color: '#ff00ff', filled: false },
    { id: 'NODE_06',       w: 58,  h: 43,  color: '#ff0000', filled: false },
    { id: 'UPTIME_REF',    w: 24,  h: 230, color: '#ff5e00', filled: false },
    { id: 'MAPPING_X',     w: 72,  h: 144, color: '#bfff00', filled: false },
    { id: 'SYNC_PULSE',    w: 144, h: 24,  color: '#00ff00', filled: false },
    { id: 'BOUND_BOX_10',  w: 115, h: 115, color: '#00ff9d', filled: false },
    { id: 'NODE_11',       w: 43,  h: 43,  color: '#00bfff', filled: false },
    { id: 'STREAM_END',    w: 202, h: 24,  color: '#0000ff', filled: false },
    { id: 'COORD_13',      w: 24,  h: 86,  color: '#7f00ff', filled: false },
    { id: 'ENTITY_DENSITY',w: 50,  h: 202, color: '#00ffff', filled: true },
    { id: 'BIT_RATE',      w: 72,  h: 72,  color: '#ffea00', filled: false },
    { id: 'REF_VAL',       w: 115, h: 43,  color: '#9d00ff', filled: false },
    { id: 'LINKAGE_PRIME', w: 115, h: 24,  color: '#ff0055', filled: false },
    { id: 'NODE_18',       w: 86,  h: 29,  color: '#00ffcc', filled: false },
    { id: 'STRUC_19',      w: 36,  h: 144, color: '#ff9900', filled: false },
    { id: 'BOX_20',        w: 120, h: 120, color: '#ccff00', filled: false },
    { id: 'LINK_21',       w: 24,  h: 108, color: '#ff00cc', filled: false },
    { id: 'NEON_BLUE',     w: 140, h: 32,  color: '#00ecff', filled: false },
    { id: 'DEEP_VIOLET',   w: 22,  h: 210, color: '#a000ff', filled: false },
    { id: 'ORANGE_CORE',   w: 75,  h: 75,  color: '#ffaa00', filled: true },
    { id: 'CYBER_LIME',    w: 180, h: 24,  color: '#d4ff00', filled: false },
    { id: 'PASTEL_PINK',   w: 44,  h: 156, color: '#ffb6c1', filled: false },
    { id: 'ELECTRIC_TEAL', w: 112, h: 112, color: '#00ffd4', filled: false },
    { id: 'RUBY_RED',      w: 28,  h: 168, color: '#e6004d', filled: false },
    { id: 'MINT_SHAPE',    w: 90,  h: 45,  color: '#98ff98', filled: true },
    { id: 'SKY_STREAM',    w: 240, h: 20,  color: '#87ceeb', filled: false },
    { id: 'PURPLE_SYNC',   w: 36,  h: 132, color: '#bf00ff', filled: false },
    { id: 'GOLD_BIT',      w: 66,  h: 66,  color: '#ffd700', filled: false },
    { id: 'CORAL_NODE',    w: 110, h: 32,  color: '#ff7f50', filled: false },
    { id: 'EMERALD_UP',    w: 18,  h: 195, color: '#50c878', filled: false },
    { id: 'MAGENTA_BOX',   w: 105, h: 105, color: '#ff00ff', filled: false },
    { id: 'OCEAN_LINK',    w: 24,  h: 144, color: '#0077be', filled: false },
    { id: 'SUNSET_VEC',    w: 210, h: 28,  color: '#fd5e53', filled: false },
    { id: 'LAVENDER_CORE', w: 82,  h: 82,  color: '#e6e6fa', filled: true },
    { id: 'LIMELIGHT',     w: 160, h: 24,  color: '#32cd32', filled: false },
    { id: 'TURQUOISE_P',   w: 40,  h: 120, color: '#40e0d0', filled: false },
    { id: 'INDIGO_SYNC',   w: 135, h: 30,  color: '#4b0082', filled: false },
];

// ── Sey Min: the single active persona ──────────────
const AGENT_DEF = {
    id: 'SEY_MIN',
    color: '#ff69b4',
    label: 'SEY MIN / ARTIST'
};

function randBetween(min, max) { return Math.random() * (max - min) + min; }

let scene, camera, renderer, controls, labelRenderer;
let meshes = [];
let agentMesh = null;
let agentEdgeMesh = null;
let agentClickSphere = null;  
let raycaster, mouse;
let isDrawerOpen = false;
let isHoveringAgent = false;
let lastCloseTime = 0;  

let cameraTarget = null;
let lookTarget = null;
const cameraDefaultPos = new THREE.Vector3(0, 0, 1800); 
let cameraLerping = false;

// ── Audio ──────────────────────────────────────────
let hoverAudio = null;
let audioUnlocked = false;

function unlockAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;
    hoverAudio = new Audio('asset/sound/KFbeing_00.mp3');
    hoverAudio.loop = false;
    hoverAudio.volume = 0.7;
    hoverAudio.preload = 'auto';
    hoverAudio.load();
    hoverAudio.addEventListener('ended', () => { hoverAudio.currentTime = 0; });
    ['click', 'touchstart', 'keydown'].forEach(evt =>
        document.removeEventListener(evt, unlockAudio)
    );
}
['click', 'touchstart', 'keydown'].forEach(evt =>
    document.addEventListener(evt, unlockAudio, { once: true, capture: true })
);

function startHoverAudio() {
    if (!audioUnlocked || !hoverAudio) return;
    if (!hoverAudio.paused) return; 
    hoverAudio.play().catch(() => {});
}

function stopHoverAudio() {
    if (hoverAudio && !hoverAudio.paused) {
        hoverAudio.pause();
    }
}

// ── Texture helper ──────────────────────────────
function createPatternTexture(colorHex, w, h) {
    const canvas = document.createElement('canvas');
    canvas.width  = Math.max(w, 64);
    canvas.height = Math.max(h, 64);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = colorHex;
    ctx.fillStyle   = colorHex;
    ctx.lineWidth   = 1.2;

    const styles = ['stripe', 'dot', 'crosshatch', 'outline', 'grid', 'zigzag', 'dual-stripe', 'noise'];
    const style   = styles[Math.floor(Math.random() * styles.length)];
    const bound   = canvas.width + canvas.height;

    if (style === 'stripe') {
        const gap = Math.floor(Math.random() * 6) + 4;
        for (let i = -canvas.height; i < bound; i += gap) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i - canvas.height, canvas.height); ctx.stroke();
        }
    } else if (style === 'dot') {
        const ds = 2, sp = 8;
        for (let x = 0; x < canvas.width; x += sp)
            for (let y = 0; y < canvas.height; y += sp) {
                ctx.beginPath(); ctx.arc(x, y, ds / 2, 0, Math.PI * 2); ctx.fill();
            }
    } else if (style === 'crosshatch') {
        const gap = Math.floor(Math.random() * 10) + 14;
        for (let i = -canvas.height; i < bound; i += gap) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i - canvas.height, canvas.height); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(i - canvas.height, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
        }
    } else if (style === 'grid') {
        const sp = 12;
        for (let x = 0; x < canvas.width; x += sp) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
        for (let y = 0; y < canvas.height; y += sp) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
    } else if (style === 'zigzag') {
        const sp = 10, amp = 10;
        for (let y = 0; y < canvas.height; y += sp) {
            ctx.beginPath(); ctx.moveTo(0, y);
            for (let x = 0; x < canvas.width; x += 10) { ctx.lineTo(x, y + (x % 20 === 0 ? amp : -amp)); }
            ctx.stroke();
        }
    } else if (style === 'dual-stripe') {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < canvas.width; i += 6) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
        ctx.globalAlpha = 0.4;
        for (let i = 0; i < canvas.height; i += 12) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }
    } else if (style === 'noise') {
        for (let i = 0; i < 200; i++) {
            ctx.beginPath(); ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 0.8, 0, Math.PI * 2); ctx.fill();
        }
    } else {
        ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
    }
    return new THREE.CanvasTexture(canvas);
}

// ── Init ──────────────────────────────────────────
function init() {
    const container = document.getElementById('viz-container');
    if (!container) return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color('#ffffff');

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 10, 8000);
    camera.position.copy(cameraDefaultPos);

    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = 'relative';
    renderer.domElement.style.zIndex = '1';
    container.appendChild(renderer.domElement);

    if (typeof THREE.CSS2DRenderer !== 'undefined') {
        labelRenderer = new THREE.CSS2DRenderer();
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';
        labelRenderer.domElement.style.pointerEvents = 'none';
        labelRenderer.domElement.style.zIndex = '2';
        document.body.appendChild(labelRenderer.domElement);
    }

    if (typeof THREE.OrbitControls !== 'undefined') {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.4;
        controls.enableZoom = true;
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dl = new THREE.DirectionalLight(0xffffff, 0.5);
    dl.position.set(200, 500, 300);
    scene.add(dl);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    buildScene();

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onMouseMove, false);

    animate();
}

// ── Build ──────────────────────────────────────────
function buildScene() {
    // 1. Sey Min – center agent
    const agentGeo = new THREE.IcosahedronGeometry(240, 2); 
    const agentFaceMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(AGENT_DEF.color),
        transparent: true, opacity: 0.3,
        depthWrite: false, side: THREE.DoubleSide
    });
    agentMesh = new THREE.Mesh(agentGeo, agentFaceMat);
    agentMesh.position.set(0, 0, 0);

    const wireMat = new THREE.MeshBasicMaterial({ color: '#ff69b4', wireframe: true });
    agentEdgeMesh = new THREE.Mesh(agentGeo, wireMat);
    agentMesh.add(agentEdgeMesh);

    const posAttr = agentGeo.attributes.position;
    const origPositions = new Float32Array(posAttr.array.length);
    origPositions.set(posAttr.array);
    agentMesh.userData = {
        isAgent: true,
        morphTime: 0,
        origPositions,
        posAttr,
        rotSpeed: new THREE.Vector3(0.003, 0.005, 0.002),
        vel: new THREE.Vector3(0, 0, 0),
        box3: new THREE.Box3()
    };

    if (typeof THREE.CSS2DObject !== 'undefined') {
        const div = document.createElement('div');
        div.innerHTML = `<span style="background:#fff;color:#1a1a1a;font-weight:700;font-size:0.65rem;
            letter-spacing:0.12em;padding:3px 8px;border:1px solid #ff69b4;">SEY MIN / ARTIST</span>`;
        const lbl = new THREE.CSS2DObject(div);
        lbl.position.set(0, 280, 0); 
        agentMesh.add(lbl);
    }

    const clickSphereGeo = new THREE.SphereGeometry(480, 16, 16);
    const clickSphereMat = new THREE.MeshBasicMaterial({
        transparent: true, opacity: 0, depthWrite: false, side: THREE.FrontSide
    });
    agentClickSphere = new THREE.Mesh(clickSphereGeo, clickSphereMat);
    agentClickSphere.position.set(0, 0, 0);
    scene.add(agentClickSphere);
    scene.add(agentMesh);
    meshes.push(agentMesh);

    // 2. Swarm – 96 items in 16:9 widescreen layout
    const W_SIZE = 2200, H_SIZE = 1200, D_SIZE = 1200; 
    for (let i = 0; i < 96; i++) {
        const def = SHAPES_DEF[i % SHAPES_DEF.length];
        if (def.id === 'ENTITY_DENSITY') continue;

        let finalW = def.w, finalH = def.h;
        let finalD = Math.floor(randBetween(30, 100));

        const cubeType = Math.random();
        if (cubeType < 0.25) {
            const side = randBetween(60, 110);
            finalW = finalH = finalD = side;
        } else if (cubeType < 0.45) {
            finalD = randBetween(140, 260); 
        }

        const geo = new THREE.BoxGeometry(finalW, finalH, finalD);
        let mat;
        const op = randBetween(0.45, 0.55); // Perfected opacity balanced at 0.5 (as requested)
        if (def.filled) {
            mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(def.color), transparent: true, opacity: op, wireframe: Math.random() < 0.15 });
        } else {
            const tex = createPatternTexture(def.color, finalW, finalH);
            mat = new THREE.MeshBasicMaterial({ color: '#ffffff', map: tex, transparent: true, opacity: op + 0.1, alphaTest: 0.05, depthWrite: true, side: THREE.DoubleSide });
        }

        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
            randBetween(-W_SIZE/2, W_SIZE/2),
            randBetween(-H_SIZE/2, H_SIZE/2),
            randBetween(-D_SIZE/2, D_SIZE/2)
        );
        mesh.rotation.set(randBetween(0, Math.PI * 2), randBetween(0, Math.PI * 2), randBetween(0, Math.PI * 2));
        
        const initSpeed = randBetween(0.6, 1.2);
        const initDir = new THREE.Vector3(randBetween(-1, 1), randBetween(-1, 1), randBetween(-1, 1)).normalize();

        mesh.userData = {
            isAgent: false,
            velocity: initDir.multiplyScalar(initSpeed),
            rotSpeed: new THREE.Vector3(
                randBetween(-0.015, 0.015),
                randBetween(-0.015, 0.015),
                randBetween(-0.015, 0.015)
            ),
            box3: new THREE.Box3()
        };

        if (i < 24 && typeof THREE.CSS2DObject !== 'undefined') {
            const div = document.createElement('div');
            div.innerHTML = `<span style="opacity:0.55;color:#888;font-size:0.45rem;">---/---</span>`;
            const lbl = new THREE.CSS2DObject(div);
            lbl.position.set(0, finalH / 2 + 12, 0);
            mesh.add(lbl);
        }
        scene.add(mesh);
        meshes.push(mesh);
    }

    const grid = new THREE.GridHelper(4000, 80, 0xdddddd, 0xeeeeee);
    grid.position.y = -1200;
    scene.add(grid);
}

// ── Physics ────────────────────────────────────────
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const frameScale = delta * 60;

    meshes.forEach(mesh => {
        mesh.rotation.x += mesh.userData.rotSpeed.x * frameScale;
        mesh.rotation.y += mesh.userData.rotSpeed.y * frameScale;
        mesh.rotation.z += mesh.userData.rotSpeed.z * frameScale;

        if (mesh.userData.isAgent) {
            mesh.userData.morphTime += 0.012 * frameScale;
            const t    = mesh.userData.morphTime;
            const orig = mesh.userData.origPositions;
            const pos  = mesh.userData.posAttr;
            for (let vi = 0; vi < pos.count; vi++) {
                const ox = orig[vi * 3], oy = orig[vi * 3 + 1], oz = orig[vi * 3 + 2];
                const disp = 60 * Math.sin(t * 2.1 + ox * 0.18)
                           + 40 * Math.sin(t * 1.6 + oy * 0.22)
                           + 25 * Math.cos(t * 2.8 + oz * 0.26)
                           + 15 * Math.sin(t * 3.5 + (ox + oy) * 0.15);
                const len = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;
                pos.setXYZ(vi, ox + (ox/len)*disp, oy + (oy/len)*disp, oz + (oz/len)*disp);
            }
            pos.needsUpdate = true;
            agentMesh.geometry.computeBoundingSphere();
        } else {
            const v = mesh.userData.velocity;
            const distCenter = mesh.position.length();

            // 1. Adaptive Centering Force (Celestial Ring: Pulls if outside 1300 units)
            if (distCenter >= 1300) {
                const pullingToCenter = mesh.position.clone().multiplyScalar(-0.00006);
                v.addScaledVector(pullingToCenter, frameScale);
            }

            v.multiplyScalar(Math.pow(0.9985, frameScale)); // Cinematic damping (0.999 -> 0.9985)
            v.clampLength(0.6, 2.4); // Slower speed limit (3.2 -> 2.4) 
            mesh.position.addScaledVector(v, frameScale);
            
            // 2. Wall Bounce (Widescreen Expanded: 2500x1100)
            const BX = 2500, BY = 1100, BZ = 1100; 
            if (Math.abs(mesh.position.x) > BX) { v.x *= -1; mesh.position.x = Math.sign(mesh.position.x) * BX; }
            if (Math.abs(mesh.position.y) > BY) { v.y *= -1; mesh.position.y = Math.sign(mesh.position.y) * BY; }
            if (Math.abs(mesh.position.z) > BZ) { v.z *= -1; mesh.position.z = Math.sign(mesh.position.z) * BZ; }

            // 3. Agent Exclusion (Celestial Ring: Increased from 750 to 1000)
            if (distCenter < 1000) { 
                const normal = mesh.position.clone().normalize();
                v.reflect(normal);
                mesh.position.add(normal.multiplyScalar(20));
            }
            mesh.userData.box3.setFromObject(mesh);
        }
    });

    for (let i = 0; i < meshes.length; i++) {
        const m1 = meshes[i];
        if (m1.userData.isAgent) continue;
        for (let j = i + 1; j < meshes.length; j++) {
            const m2 = meshes[j];
            if (m2.userData.isAgent) continue;
            if (m1.userData.box3.intersectsBox(m2.userData.box3)) {
                const tempV = m1.userData.velocity.clone();
                m1.userData.velocity.copy(m2.userData.velocity);
                m2.userData.velocity.copy(tempV);
                const diff = m1.position.clone().sub(m2.position).normalize();
                m1.position.add(diff.multiplyScalar(2)); // Reduced nudge (20 -> 2) for smooth bounce
                m2.position.sub(diff.multiplyScalar(2));
            }
        }
    }

    if (cameraLerping && cameraTarget) {
        camera.position.lerp(cameraTarget, 0.05);
        if (controls) controls.target.lerp(lookTarget, 0.05);
        if (camera.position.distanceTo(cameraTarget) < 2) cameraLerping = false;
    }

    if (controls) controls.update();
    renderer.render(scene, camera);
    if (labelRenderer) labelRenderer.render(scene, camera);
}

// ── Interaction ───────────────────────────────────
function onMouseMove(e) {
    if (isDrawerOpen || !camera) return;
    const agentScreenPos = new THREE.Vector3(0, 0, 0).project(camera);
    const sx = (agentScreenPos.x * 0.5 + 0.5) * window.innerWidth;
    const sy = (agentScreenPos.y * -0.5 + 0.5) * window.innerHeight;
    const dist = Math.sqrt((e.clientX - sx) ** 2 + (e.clientY - sy) ** 2);
    const wasHovering = isHoveringAgent;
    isHoveringAgent = dist < 180;
    if (isHoveringAgent !== wasHovering) {
        document.body.style.cursor = isHoveringAgent ? 'pointer' : 'default';
        if (agentMesh) agentMesh.scale.setScalar(isHoveringAgent ? 1.1 : 1.0);
        if (isHoveringAgent) startHoverAudio(); else stopHoverAudio();
    }
}

window.tryOpenFromCanvas = function(e) {
    if (isDrawerOpen || !camera) return;
    if (Date.now() - lastCloseTime < 400) return;
    const agentScreenPos = new THREE.Vector3(0, 0, 0).project(camera);
    const sx = (agentScreenPos.x * 0.5 + 0.5) * window.innerWidth;
    const sy = (agentScreenPos.y * -0.5 + 0.5) * window.innerHeight;
    const dist = Math.sqrt((e.clientX - sx) ** 2 + (e.clientY - sy) ** 2);
    if (dist < 230) openDrawer();
};

function openDrawer() {
    isDrawerOpen = true;
    cameraTarget = new THREE.Vector3(0, 0, 850); 
    lookTarget   = new THREE.Vector3(0, 0, 0);
    cameraLerping = true;
    if (controls) controls.autoRotate = false;

    // Reload ElevenLabs widget to start fresh conversation
    const container = document.querySelector('.widget-container');
    if (container) {
        container.innerHTML = ''; // Clear previous instance
        const newWidget = document.createElement('elevenlabs-convai');
        newWidget.setAttribute('agent-id', 'agent_1901k42pgdadfzhbp6w88r22tpq3');
        container.appendChild(newWidget);
    }

    document.getElementById('chat-drawer')?.classList.add('open');
    document.getElementById('drawer-backdrop')?.classList.add('open');
    stopHoverAudio();
    document.body.style.cursor = 'default';
}

function closeDrawer() {
    isDrawerOpen = false;
    lastCloseTime = Date.now();
    document.getElementById('chat-drawer')?.classList.remove('open');
    document.getElementById('drawer-backdrop')?.classList.remove('open');
    
    // Clear widget container to stop audio
    const container = document.querySelector('.widget-container');
    if (container) container.innerHTML = '';

    cameraTarget  = cameraDefaultPos.clone();
    lookTarget    = new THREE.Vector3(0, 0, 0);
    cameraLerping = true;
    if (controls) controls.autoRotate = true; 
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (labelRenderer) labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

document.addEventListener('DOMContentLoaded', init);
window.openDrawer  = openDrawer;
window.closeDrawer = closeDrawer;
