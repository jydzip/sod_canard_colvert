import { useEffect, useRef } from 'react';
import { Container, Text } from '@pixi/react';
import { Spine } from '@esotericsoftware/spine-pixi';
import * as PIXI from 'pixi.js';

import { useController } from '../../contexts/Controller.Context';

const Y_OFFSET = 170;


const DuckSpine = ({ id }: { id: string }) => {
  const duckCpRef = useRef<any>(null);
  const containerRef = useRef<any>(null);

  const controller = useController();
  const duck = controller.ducks[id]?.duck;

  useEffect(() => {
    const duckCp = new DuckSpineComponent();
    duckCp.playAnimation({ name: 'idle', loop: true, timeScale: 0.5 });

    if (containerRef.current) {
      containerRef.current.addChild(duckCp.view);
    }

    duckCpRef.current = duckCp;

    return () => {
      if (containerRef.current && duckCp) {
        containerRef.current.removeChild(duckCp.view);
      }
    };
  }, []);

  function move()
  {
    if (containerRef.current.x > controller.ducks[id]?.duck.x) {
      duckCpRef.current.flop();
    }
    else {
      duckCpRef.current.flip();
    }
    containerRef.current.x = controller.ducks[id]?.duck.x;
    containerRef.current.y = Y_OFFSET + controller.ducks[id]?.duck.y;
  }

  useEffect(() => {
    move();
  }, [controller.ducks[id]?.duck.x, controller.ducks[id]?.duck.y]);

  useEffect(() => {
    if (controller.ducks[id]?.duck.fly) {
      duckCpRef.current.playAnimation({ name: 'fly', loop: true, timeScale: 0.5 });
    }
  }, [controller.ducks[id]?.duck.fly]);

  return (
    <Container
        ref={containerRef}
        x={0}
        y={Y_OFFSET}
    >
      <Text
        text={`${duck?.username}`}
        anchor={0.5}
        y={-150}
        style={
          new PIXI.TextStyle({
            fontFamily: "ANTON",
            fill: "#0f5f0380",
            stroke: '#ffffff55',
            strokeThickness: 5,
            fontSize: 27,
            fontWeight: 'bold',
          })
        }
      />
    </Container>
  );
};

export default DuckSpine;

export class DuckSpineComponent
{
    view: PIXI.Container;
    spine: Spine;

    constructor() {
      this.view = new PIXI.Container();
      this.spine = Spine.from("duckData", "duckAtlas");
      this.spine.scale.set(0.3);
      this.view.addChild(this.spine);
    }

    playAnimation({ name, loop = false, timeScale = 1 }) {
      const trackEntry = this.spine.state.setAnimation(0, name, loop);
      trackEntry.timeScale = timeScale;
    }

    flip() {
      this.spine.scale.x = -0.3;
    }

    flop() {
      this.spine.scale.x = 0.3;
    }
}