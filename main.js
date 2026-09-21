import * as THREE from "three";


// ========================================
// CONFIGURACIÓN
// ========================================

const container = document.getElementById("galaxy");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 10);


// ========================================
// RENDERIZADOR
// ========================================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

container.appendChild(renderer.domElement);


// ========================================
// ESTRELLAS
// ========================================

const starGeometry = new THREE.BufferGeometry();

const particles = 5000;

const positions = new Float32Array(
    particles * 3
);

for (let i = 0; i < particles * 3; i++) {

    positions[i] =
        (Math.random() - 0.5) * 40;

}

starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        positions,
        3
    )
);

const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.025
});

const stars = new THREE.Points(
    starGeometry,
    starMaterial
);

scene.add(stars);
// ========================================
// NEBULOSA
// ========================================

const nebulaGeometry = new THREE.BufferGeometry();

const nebulaParticles = 2500;

const nebulaPositions = new Float32Array(
    nebulaParticles * 3
);

for (let i = 0; i < nebulaParticles; i++) {

    const angle = Math.random() * Math.PI * 2;

    const radius =
        2 +
        Math.random() * 5;

    const x =
        Math.cos(angle) *
        radius;

    const y =
        (Math.random() - 0.5) *
        2;

    const z =
        Math.sin(angle) *
        radius;

    nebulaPositions[i * 3] =
        x;

    nebulaPositions[i * 3 + 1] =
        y;

    nebulaPositions[i * 3 + 2] =
        z;
}

nebulaGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        nebulaPositions,
        3
    )
);

const nebulaMaterial = new THREE.PointsMaterial({
    color: 0xffd84d,
    size: 0.035,
    transparent: true,
    opacity: 0.45
});

const nebula = new THREE.Points(
    nebulaGeometry,
    nebulaMaterial
);

scene.add(nebula);


// ========================================
// NÚCLEO AMARILLO
// ========================================

const coreGeometry = new THREE.SphereGeometry(
    1.2,
    64,
    64
);

const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0xffd84d
});

const core = new THREE.Mesh(
    coreGeometry,
    coreMaterial
);

scene.add(core);


// ========================================
// GRUPO DEL ANILLO
// ========================================

const ringGroup = new THREE.Group();

scene.add(ringGroup);


// ========================================
// ANILLO
// ========================================

const ringGeometry = new THREE.TorusGeometry(
    1.8,
    0.08,
    16,
    100
);

const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xffd84d
});

const ring = new THREE.Mesh(
    ringGeometry,
    ringMaterial
);


// ========================================
// FORMA DEL ANILLO
// ========================================

// Lo inclinamos
ring.rotation.x = THREE.MathUtils.degToRad(65);

// Lo hacemos ligeramente elíptico
ring.scale.z = 0.45;


// Añadimos el anillo al grupo
ringGroup.add(ring);


// ========================================
// ANIMACIÓN
// ========================================

function animate() {

    requestAnimationFrame(animate);


    // -------------------------------
    // ESTRELLAS
    // -------------------------------

    stars.rotation.y += 0.0005;

nebula.rotation.y += 0.0008;
    // -------------------------------
    // MOVIMIENTO DEL ANILLO
    // -------------------------------

    ringGroup.rotation.y += 0.008;

    ringGroup.rotation.x =
        Math.sin(Date.now() * 0.0005) * 0.25;


    // -------------------------------
    // PEQUEÑA RESPIRACIÓN DEL NÚCLEO
    // -------------------------------

    const pulse =
        1 +
        Math.sin(Date.now() * 0.002) * 0.03;

    core.scale.set(
        pulse,
        pulse,
        pulse
    );


    // -------------------------------
    // RENDERIZAR
    // -------------------------------

    renderer.render(
        scene,
        camera
    );
}

animate();


// ========================================
// RESPONSIVE
// ========================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        );

    }
);


// ========================================
// BOTÓN "TOCA PARA COMENZAR"
// ========================================

const startButton =
    document.getElementById("start");

const intro =
    document.getElementById("intro");


startButton.addEventListener(
    "click",
    () => {

        intro.classList.add("hidden");

    }
);