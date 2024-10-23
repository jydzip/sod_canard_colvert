import '@esotericsoftware/spine-pixi';
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Stage as PixiStage, Container, TilingSprite } from '@pixi/react';
import * as PIXI from "pixi.js";

import DuckSpine from './DuckSpine';
import ControllerContext, { useController } from '../../contexts/Controller.Context';


const LakeDucks = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [duckDisplay, setDuckDisplay] = useState<boolean>(false);

  const controller = useController();
  
  let displacementModeX = 1;
  let displacementModeY = 1;

  const displacementFilter = useMemo(() => {
    const sprite = PIXI.Sprite.from("/lake/dis_lake.jpg");
    sprite.texture.baseTexture.on('loaded', () => {
      sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    });
    const filter = new PIXI.DisplacementFilter(sprite);
    filter.scale.set(5, 5);
    return filter;
  }, []);

  function animate() {
    if (displacementFilter) {
      if (displacementModeX === 1) {
        displacementFilter.scale.x += 0.1;
        if (displacementFilter.scale.x >= 20) displacementModeX = 2;
      }
      else {
        displacementFilter.scale.x -= 0.1;
        if (displacementFilter.scale.x <= -20) displacementModeX = 1;
      }
      if (displacementModeY === 1) {
        displacementFilter.scale.y += 0.08;
        if (displacementFilter.scale.y >= 20) displacementModeY = 2;
      }
      else {
        displacementFilter.scale.y -= 0.08;
        if (displacementFilter.scale.y <= -20) displacementModeY = 1;
      }
    }
    requestAnimationFrame(animate);
  }

  const loadStage = async () => {
    PIXI.Assets.add({alias: "duckData", src: "/duck/skeleton.json"})
    PIXI.Assets.add({alias: "duckAtlas", src: "/duck/skeleton.atlas"})

    await PIXI.Assets.load(['duckData', 'duckAtlas']);
    animate();
    controller.LAKE_init(window.window.innerWidth);
    setLoaded(true);
  };

  useEffect(() => {
    loadStage();
  }, []);

  useEffect(() => {
    if (loaded) setDuckDisplay(true);
  }, [loaded]);

  return (
    <Lake>
        <SpriteFrontLeft src="/lake/tex_lake_front_l.png" />
        <SpriteFrontRight src="/lake/tex_lake_front_r.png" />

        <Stage
          width={window.window.innerWidth}
          height={220}
          options={{ backgroundAlpha: 0, antialias: true, }}
        >
          <Container
            y={35}
          >
            <TilingSprite
              texture={PIXI.Texture.from(
                "/lake/tex_lake_ground.png"
              )}
              filters={[displacementFilter]}
              width={window.window.innerWidth}
              height={190}
              tilePosition={{ x: 50, y: 0 }}
            />
            <TilingSprite
              texture={PIXI.Texture.from(
                "/lake/tex_lake_vein.png"
              )}
              filters={[displacementFilter]}
              width={window.window.innerWidth}
              height={190}
              tilePosition={{ x: 0, y: 0 }}
              tileScale={{ x: 1.8, y: 0.5 }}
            />

            <TilingSprite
              texture={PIXI.Texture.from(
                "/lake/tex_lake_back.png"
              )}
              width={window.window.innerWidth}
              height={208}
              tilePosition={{ x: 0, y: 0 }}
              tileScale={{ x: 1, y: 1.1 }}
            />

            {duckDisplay && (
              <>
                {Object.values(controller.ducks).map((duckObject) => {
                  return (
                    <Fragment key={duckObject.duck.id}>
                      <DuckSpine id={duckObject.duck.id} />
                    </Fragment>
                  );
                })}
              </>
            )}
          </Container>
        </Stage>
    </Lake>
  )
};
export default LakeDucks;

const ContextBridge = ({ children, Context, render }) => {
  return (
    <Context.Consumer>
      {(value) =>
        render(<Context.Provider value={value}>{children}</Context.Provider>)
      }
    </Context.Consumer>
  );
};

export const Stage = ({ children, ...props }) => {
  return (
    <ContextBridge
      Context={ControllerContext}
      render={(children) => <PixiStage {...props}>{children}</PixiStage>}
    >
      {children}
    </ContextBridge>
  );
};
const Lake = styled.div`
  position: fixed;
  width: 100%;
  height: 220px;
  bottom: 0;
`

const SpriteFrontLeft = styled.img`
  position: fixed;
  bottom: 5%;
`
const SpriteFrontRight = styled.img`
  position: fixed;
  bottom: 0;
  right: 0;
`