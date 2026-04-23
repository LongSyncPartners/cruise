import { useEffect, useRef } from "react";

export const useCenteredScrollableTabs = (activeTab: number) => {
  const tabsRootRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const selectedTab = tabRefs.current[activeTab];
      const tabsRoot = tabsRootRef.current;

      const scroller = tabsRoot?.querySelector(".MuiTabs-scroller") as HTMLDivElement | null;
      const tabList = tabsRoot?.querySelector('[role="tablist"]') as HTMLDivElement | null;

      if (!selectedTab || !scroller || !tabList) return;

      const tabRect = selectedTab.getBoundingClientRect();
      const listRect = tabList.getBoundingClientRect();

      const tabLeftInScrollableContent =
        scroller.scrollLeft + (tabRect.left - listRect.left);

      const targetScrollLeft =
        tabLeftInScrollableContent + tabRect.width / 2 - scroller.clientWidth / 2;

      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

      scroller.scrollTo({
        left: Math.max(0, Math.min(targetScrollLeft, maxScrollLeft)),
        behavior: "smooth",
      });
    });

    return () => cancelAnimationFrame(id);
  }, [activeTab]);

  return {
    tabsRootRef,
    tabRefs,
  };
};