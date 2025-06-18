import { For, createSignal } from "solid-js";

const cards = ["image1.png", "image2.png", "image3.png"];

export default function CardSwiper() {
  const [activeIndex, setActiveIndex] = createSignal(0);
  const [expanded, setExpanded] = createSignal(false);
  const [flipped, setFlipped] = createSignal(false);

  const handleNext = () => {
    setActiveIndex((i) => (i + 1) % cards.length);
    setExpanded(false);
  };

  const handlePrev = () => {
    setActiveIndex((i) => (i - 1 + cards.length) % cards.length);
    setExpanded(false);
  };

  const toggleExpand = (index: any) => {
    if (index() != activeIndex()) {
      setExpanded(false);
      setActiveIndex(index);
      setFlipped(false);
    } else {
      setExpanded(!expanded());
    }
  };

  return (
    <div class="relative w-full h-[450px] flex items-center justify-center overflow-hidden">
      <For each={cards}>
        {(card, i) => {
          const isActive = () => i() === activeIndex();
          const offset = () => (i() - activeIndex()) * 220; // 300px card + 20px gap
          const scale = () => (isActive() ? (expanded() ? 1.2 : 1) : 0.9);
          const zIndex = () => (isActive() ? 10 : 1);
          const opacity = () => (isActive() ? 1 : 0.5);

          return (
            <div
              class="absolute w-[200px] h-[200px] bg-white rounded-xl shadow-xl flex items-center justify-center cursor-pointer select-none transition-all duration-500 ease-in-out overflow-hidden"
              onClick={() => {
                toggleExpand(i);
              }}
              style={{
                transform: `translateX(${offset()}px) scale(${scale()})`,
                "z-index": zIndex(),
                opacity: opacity(),
              }}
            >
              <img
                src={`/images/${card}`}
                alt={card}
                class="w-full h-full object-cover"
              />
            </div>
          );
        }}
      </For>

      <button
        class="absolute left-4 bottom-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:opacity-75 transition-all"
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        class="absolute right-4 bottom-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:opacity-75 transition-all"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}
