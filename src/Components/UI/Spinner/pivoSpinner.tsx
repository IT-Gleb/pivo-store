import { useLayoutEffect, useRef, useState } from "react";
import useScreenWidth from "../../../hooks/screenWidth";

function PivoSpinner({ text }: { text: string }) {
  const [left, setLeft] = useState<number>(0);
  const BlockRef = useRef<HTMLDivElement>(null);
  const ChildRef = useRef<HTMLDivElement>(null);
  const { screenWidth } = useScreenWidth();

  useLayoutEffect(() => {
    let tmpLeft = 0;
    let ChildWidth: number | undefined = 0;
    if (BlockRef.current) {
      tmpLeft = BlockRef.current.clientWidth / 2;
      ChildWidth = ChildRef.current?.clientWidth;
      tmpLeft = Math.floor(tmpLeft - ChildWidth! / 2);
      setLeft(tmpLeft);
    }
  }, [screenWidth]);

  return (
    <section ref={BlockRef} className="section">
      <div
        className="has-text-centered m-0 p-0"
        ref={ChildRef}
        style={{
          minWidth: 160,
          maxWidth: 320,
          transform: `translateX(${left}px)`,
        }}
      >
        <label className="is-size-7 has-text-weight-semibold">
          {text}
          <progress className="progress is-info is-small" max={100}>
            10%
          </progress>
        </label>
      </div>
    </section>
  );
}

export default PivoSpinner;
