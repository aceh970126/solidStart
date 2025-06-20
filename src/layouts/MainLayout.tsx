import type { ParentProps } from "solid-js";

const MainLayout = (props: ParentProps) => {
  return (
    <div class="min-h-[100vh] relative">
      <header class="flex justify-center items-center w-full h-[80px]">
        <h1 class="text-white font-bold text-center text-3xl">CardSwiper</h1>
      </header>
      {props.children}
      <footer class="absolute bottom-0 flex justify-center items-center w-full h-[40px] text-[12px] text-gray-600">
        <p>SolidJS + MotionOne + TailwindCSS</p>
      </footer>
    </div>
  );
};

export default MainLayout;
