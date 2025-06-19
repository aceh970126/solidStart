import { For, createSignal } from "solid-js";
import { cn } from "../../utils/utils";
import { Motion } from "solid-motionone";

const cards = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
  "image5.jpg",
  "image6.jpg",
  "image7.jpg",
  "image8.jpg",
];

export default function CardSwiper() {
  const [activeIndex, setActiveIndex] = createSignal(0);
  const [expanded, setExpanded] = createSignal(false);
  const [flipped, setFlipped] = createSignal(false);

  const handleNext = () => {
    setActiveIndex((i) => (i + 1) % cards.length);
    setExpanded(false);
    setFlipped(false);
  };

  const handlePrev = () => {
    setActiveIndex((i) => (i - 1 + cards.length) % cards.length);
    setExpanded(false);
    setFlipped(false);
  };

  const toggleExpand = (index: any) => {
    if (index() !== activeIndex()) {
      setExpanded(false);
      setActiveIndex(index);
      setFlipped(false);
    } else if (expanded()) {
      setFlipped(!flipped());
    } else {
      setExpanded(!expanded());
    }
  };

  return (
    <div class="relative w-full h-[450px] flex items-center justify-center overflow-hidden">
      <For each={cards}>
        {(card, i) => {
          const isActive = () => i() === activeIndex();
          const offset = () => (i() - activeIndex()) * 220;
          const scale = () => (isActive() ? (expanded() ? 1.2 : 1) : 0.9);
          const zIndex = () => (isActive() ? 10 : 1);
          const opacity = () => (isActive() ? 1 : 0.5);

          return (
            <Motion.div
              class="[perspective:100rem] absolute w-[200px] h-[200px] bg-white flex items-center justify-center cursor-pointer select-none transition-all duration-500 ease-in-out"
              onClick={() => toggleExpand(i)}
              animate={{
                transform: `translateX(${offset()}px) scale(${scale()})`,
                zIndex: zIndex(),
                opacity: opacity(),
              }}
            >
              <div
                class={cn(
                  "relative size-full transition duration-500  [transform-style:preserve-3d]",
                  flipped() && isActive() ? "[transform:rotateY(180deg)]" : ""
                )}
              >
                <div class="absolute inset-0 size-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <img
                    src="/images/back.png"
                    alt="back"
                    class="w-full h-full object-cover rounded-xl border border-gray-200"
                  />
                </div>
                <div class="absolute inset-0 size-full [backface-visibility:hidden]">
                  <img
                    src={`/images/${card}`}
                    alt={card}
                    class="w-full h-full object-cover rounded-xl border border-gray-200"
                  />
                </div>
              </div>
            </Motion.div>
          );
        }}
      </For>

      <button
        class="absolute left-4 bottom-4 bg-blue-500 text-white px-4 py-2 cursor-pointer flex justify-center items-center w-[40px] h-[40px] rounded-full hover:opacity-75 transition-all"
        onClick={handlePrev}
      >
        {"<"}
      </button>
      <button
        class="absolute right-4 bottom-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer flex justify-center items-center w-[40px] h-[40px] rounded-full hover:opacity-75 transition-all"
        onClick={handleNext}
      >
        {">"}
      </button>
    </div>
  );
}
