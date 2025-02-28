import { cn } from "@/lib/utils";
import { randomChoiceFromArray, randomFromRange } from "@/shared/utils/utils";
import { useEffect, useRef, useState } from "react";

const MAX_GRAVITY = 0.001;
const INITIAL_VELOCITY_Y = 0.001;
const INITIAL_VELOCITY_X_RANGE = [0.2, 1];
const IMAGES = [
  "/images/mascots/p1.webp",
  "/images/mascots/p2.webp",
  "/images/mascots/p3.webp",
  "/images/mascots/p4.webp",
  "/images/mascots/p5.webp",
  "/images/mascots/p6.webp",
];
const IMAGE_SIZE_RANGE = [50, 120];
const MAX_MASCOT_COUNT = 20;
const MASCOT_GENERATION_INTERVAL = 800;
const MASCOT_SPAWN_CHANCE = 0.6;

interface IProps {
  className?: string;
}

export default function MascotRain(props: IProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mascots, setMascots] = useState<Mascot[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        Math.random() < MASCOT_SPAWN_CHANCE &&
        mascots.length < MAX_MASCOT_COUNT
      ) {
        const x = randomFromRange(
          IMAGE_SIZE_RANGE[1],
          containerRef.current?.clientWidth || window.innerWidth
        );
        const y = -IMAGE_SIZE_RANGE[1];
        const newMascot = new Mascot([x, y]);
        setMascots((prev) => [...prev, newMascot]);
      }
    }, MASCOT_GENERATION_INTERVAL);

    return () => clearInterval(interval);
  }, [mascots.length]);

  useEffect(() => {
    const animate = () => {
      setMascots((prevMascots) => {
        const updatedMascots = prevMascots
          .map((m) => {
            if (!containerRef.current) return m;

            if (m.pos[0] < 0) {
              m.pos[0] = 0;
              m.vel[0] = Math.abs(m.vel[0]) * Math.random() * 1.5;
            }
            if (m.pos[0] + m.size > containerRef.current.clientWidth) {
              m.pos[0] = containerRef.current.clientWidth - m.size;
              m.vel[0] = -Math.abs(m.vel[0]) * Math.random() * 1.5;
            }

            m.step();
            return m;
          })
          .filter(
            (m) =>
              m.pos[1] <
              (containerRef.current?.clientHeight || window.innerHeight)
          );
        return updatedMascots;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-hidden select-none pointer-events-none",
        props.className
      )}
    >
      {mascots.map((m, index) => (
        <img
          key={index}
          src={m.image.src}
          alt="mascot"
          style={{
            position: "absolute",
            left: `${m.pos[0]}px`,
            top: `${m.pos[1]}px`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            filter: `blur(${m.vel[0] / INITIAL_VELOCITY_X_RANGE[1]}px)`,
            transform: `scale(${m.vel[0] > 0 ? -1 : 1},1)`,
          }}
        />
      ))}
    </div>
  );
}

type Vec2D = [number, number];

class Mascot {
  pos: Vec2D;
  vel: Vec2D;
  image: HTMLImageElement;
  size: number;

  constructor(pos: Vec2D) {
    this.pos = pos;
    this.vel = [
      (Math.random() < 0.5 ? -1 : 1) *
        randomFromRange(
          INITIAL_VELOCITY_X_RANGE[0],
          INITIAL_VELOCITY_X_RANGE[1]
        ),
      INITIAL_VELOCITY_Y,
    ];
    const size = randomFromRange(IMAGE_SIZE_RANGE[0], IMAGE_SIZE_RANGE[1]);
    this.size = size;
    this.image = new Image(size, size);
    this.image.src = randomChoiceFromArray(IMAGES);
  }

  step() {
    this.vel[1] += MAX_GRAVITY * Math.random();
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }
}
