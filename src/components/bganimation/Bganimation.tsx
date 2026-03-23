"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Bganimation() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        let scene: THREE.Scene,
            camera: THREE.PerspectiveCamera,
            renderer: THREE.WebGLRenderer;

        let particles: THREE.Sprite[] = [];
        let count = 0;
        let animationId: number;

        const SEPARATION = 80;
        const AMOUNTX = 40;
        const AMOUNTY = 40;

        let mouseX = 0;
        let mouseY = 0;

        const currentMount = mountRef.current;

        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        // Scene
        scene = new THREE.Scene();

        // Camera
        camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );
        camera.position.z = 800;

        // Renderer (TRANSPARENT BG ✅)
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true, // ✅ IMPORTANT
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0); // ✅ transparent

        currentMount.appendChild(renderer.domElement);

        // Texture
        const texture = new THREE.TextureLoader().load(
            "https://threejs.org/examples/textures/sprites/disc.png"
        );

        // ✅ COLOR CHANGED HERE
        const material = new THREE.SpriteMaterial({
            map: texture,
            color: "#f47c20", // 🎯 orange color
        });

        // Particles
        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                const sprite = new THREE.Sprite(material);

                sprite.position.x =
                    ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
                sprite.position.z =
                    iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

                scene.add(sprite);
                particles[i++] = sprite;
            }
        }

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
        };

        const handleResize = () => {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        const animate = () => {
            animationId = requestAnimationFrame(animate);

            let i = 0;

            for (let ix = 0; ix < AMOUNTX; ix++) {
                for (let iy = 0; iy < AMOUNTY; iy++) {
                    const particle = particles[i++];

                    particle.position.y =
                        Math.sin((ix + count) * 0.3) * 30 +
                        Math.sin((iy + count) * 0.5) * 30;

                    const scale =
                        (Math.sin((ix + count) * 0.3) + 1) * 3 +
                        (Math.sin((iy + count) * 0.5) + 1) * 3;

                    particle.scale.set(scale, scale, 1);
                }
            }

            camera.position.x += (mouseX - camera.position.x) * 0.03;
            camera.position.y += (-mouseY - camera.position.y) * 0.03;

            camera.lookAt(scene.position);

            renderer.render(scene, camera);

            count += 0.08;
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);

            if (animationId) cancelAnimationFrame(animationId);

            renderer.dispose();

            if (currentMount && renderer.domElement) {
                try {
                    currentMount.removeChild(renderer.domElement);
                } catch { }
            }
        };
    }, []);

    return (
        <div
            className="bganimation"
            ref={mountRef}
            style={{
                width: "100vw",
                height: "100vh",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 2,
                background: "transparent", // ✅ removed blue bg
            }}
        />
    );
}