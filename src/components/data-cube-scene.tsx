"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { portfolioTheme } from "@/lib/theme";

export function DataCubeScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.36, 7.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-label", "Animated pastel data blocks representing a RAG-powered portfolio interface");
    renderer.domElement.setAttribute("role", "img");

    const group = new THREE.Group();
    scene.add(group);

    const palette = [
      portfolioTheme.colors.paleBlue,
      portfolioTheme.colors.mint,
      portfolioTheme.colors.lavender,
      portfolioTheme.colors.peach,
      portfolioTheme.colors.butter,
    ];

    const positions = [
      [-1.22, 0.58, 0],
      [-0.28, 0.88, -0.18],
      [0.82, 0.5, 0.12],
      [-0.76, -0.48, 0.2],
      [0.28, -0.32, -0.15],
      [1.16, -0.5, 0.08],
    ];

    positions.forEach((position, index) => {
      const geometry = new THREE.BoxGeometry(0.78, 0.78, 0.78, 5, 5, 5);
      const material = new THREE.MeshStandardMaterial({
        color: palette[index % palette.length],
        roughness: 0.5,
        metalness: 0.02,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(position[0], position[1], position[2]);
      cube.rotation.set(index * 0.14, index * 0.24, index * 0.08);
      cube.castShadow = true;
      cube.receiveShadow = true;
      group.add(cube);

      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry),
        new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.45 }),
      );
      cube.add(edges);
    });

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(2.05, 2.45, 0.16, 72),
      new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.68 }),
    );
    base.position.set(0, -1.25, -0.15);
    base.receiveShadow = true;
    scene.add(base);

    const ambient = new THREE.AmbientLight("#ffffff", 1.8);
    scene.add(ambient);

    const key = new THREE.DirectionalLight("#ffffff", 2.9);
    key.position.set(4, 6, 7);
    key.castShadow = true;
    scene.add(key);

    const fill = new THREE.DirectionalLight(portfolioTheme.colors.paleBlue, 1.35);
    fill.position.set(-5, 1, 4);
    scene.add(fill);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let animationId = 0;

    const resize = () => {
      const width = mount.clientWidth || 480;
      const height = mount.clientHeight || 320;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const animate = () => {
      frame += 0.01;
      if (!prefersReducedMotion) {
        group.rotation.y = Math.sin(frame * 0.55) * 0.28;
        group.rotation.x = Math.sin(frame * 0.36) * 0.08;
        group.children.forEach((child, index) => {
          child.position.y += Math.sin(frame + index) * 0.0009;
        });
      }
      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/70 shadow-clay">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(202,228,249,0.74),transparent_34%),radial-gradient(circle_at_72%_28%,rgba(233,213,255,0.56),transparent_32%),radial-gradient(circle_at_52%_88%,rgba(213,245,227,0.72),transparent_36%)]" />
      <div ref={mountRef} className="relative h-[220px] w-full sm:h-[280px] lg:h-[330px]" />
    </div>
  );
}
