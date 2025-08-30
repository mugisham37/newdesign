"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(Observer);

interface MarqueeProps {
  items: string[];
  className?: string;
  icon?: string;
  iconClassName?: string;
  reverse?: boolean;
}

interface HorizontalLoopConfig {
  repeat?: number;
  paused?: boolean;
  speed?: number;
  snap?: number | false | ((value: number) => number);
  paddingRight?: string | number;
  reversed?: boolean;
}

interface HorizontalLoopTimeline extends gsap.core.Timeline {
  next: (vars?: gsap.TweenVars) => gsap.core.Tween;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
  current: () => number;
  toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
  times: number[];
}

const Marquee: React.FC<MarqueeProps> = ({
  items,
  className = "text-white bg-black",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLSpanElement | null)[]>([]);

  function horizontalLoop(
    items: Element[],
    config?: HorizontalLoopConfig
  ): HorizontalLoopTimeline {
    const itemsArray = gsap.utils.toArray(items) as Element[];
    const configObj = config || {};

    let tl = gsap.timeline({
        repeat: configObj.repeat,
        paused: configObj.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => {
          tl.totalTime(tl.rawTime() + tl.duration() * 100);
        },
      }) as HorizontalLoopTimeline,
      length = itemsArray.length,
      startX = (itemsArray[0] as HTMLElement).offsetLeft,
      times: number[] = [],
      widths: number[] = [],
      xPercents: number[] = [],
      curIndex = 0,
      pixelsPerSecond = (configObj.speed || 1) * 100,
      snap =
        configObj.snap === false
          ? (v: number) => v
          : typeof configObj.snap === "function"
          ? configObj.snap
          : gsap.utils.snap(configObj.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      totalWidth: number,
      curX: number,
      distanceToStart: number,
      distanceToLoop: number,
      item: Element,
      i: number;

    gsap.set(itemsArray, {
      // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
      xPercent: (i: number, el: Element) => {
        let w = (widths[i] = parseFloat(
          gsap.getProperty(el, "width", "px") as string
        ));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
            (gsap.getProperty(el, "xPercent") as number)
        );
        return xPercents[i];
      },
    });

    gsap.set(itemsArray, { x: 0 });

    totalWidth =
      (itemsArray[length - 1] as HTMLElement).offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      (itemsArray[length - 1] as HTMLElement).offsetWidth *
        (gsap.getProperty(itemsArray[length - 1], "scaleX") as number) +
      (parseFloat(String(configObj.paddingRight)) || 0);

    for (i = 0; i < length; i++) {
      item = itemsArray[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = (item as HTMLElement).offsetLeft + curX - startX;
      distanceToLoop =
        distanceToStart +
        widths[i] * (gsap.getProperty(item, "scaleX") as number);
      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }

    function toIndex(index: number, vars?: gsap.TweenVars): gsap.core.Tween {
      const varsObj = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        // if we're wrapping the timeline's playhead, make the proper adjustments
        varsObj.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      varsObj.overwrite = true;
      return tl.tweenTo(time, varsObj);
    }

    tl.next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance

    if (configObj.reversed) {
      tl.vars.onReverseComplete?.();
      tl.reverse();
    }

    return tl;
  }

  useEffect(() => {
    const tl = horizontalLoop(
      itemsRef.current.filter(Boolean) as HTMLSpanElement[],
      {
        repeat: -1,
        paddingRight: 30,
        reversed: reverse,
      }
    );

    const observer = Observer.create({
      onChangeY(self) {
        let factor = 2.5;
        if ((!reverse && self.deltaY < 0) || (reverse && self.deltaY > 0)) {
          factor *= -1;
        }
        gsap
          .timeline({
            defaults: {
              ease: "none",
            },
          })
          .to(tl, { timeScale: factor * 2.5, duration: 0.2, overwrite: true })
          .to(tl, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
      },
    });

    return () => {
      tl.kill();
      observer.kill();
    };
  }, [items, reverse]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center marquee-text-responsive font-light uppercase whitespace-nowrap ${className}`}
    >
      <div className="flex">
        {items.map((text, index) => (
          <span
            key={index}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="flex items-center px-16 gap-x-32"
          >
            {text} <Icon icon={icon} className={iconClassName} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
