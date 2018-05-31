import * as Matter from 'matter-js';
import 'matter-attractors';
import { ATAMObject, 
        MatterSetupObject, 
        RectangleBodyOptions } from '../matter_types';
import { GlobalObject } from '../objects/GlobalObject';

import { addAttracted } from 'utils/addAttracted';
import { addAttractor } from 'utils/addAttractor';
import { addAttractorOrbit } from 'utils/addAttractorOrbit';
import { applyForceToBody } from 'utils/applyForceToBody';
import { attractAllToOne } from 'utils/attractAllToOne';
import { attractSomeToOne } from 'utils/attractSomeToOne';
import { checkIfSpaceOccupied } from 'utils/checkIfSpaceOccupied';
import { checkOnScreen } from 'utils/checkOnScreen';
import { clearMatter } from 'utils/clearMatter';
import { createCircular } from 'utils/createCircular';
import { createConstraint } from 'utils/createConstraint';
import { createPolygon } from 'utils/createPolygon';
import { createRectangle } from 'utils/createRectangle';
import { deleteBody } from 'utils/deleteBody';
import { deleteComposite } from 'utils/deleteComposite';
import { deleteConstraint } from 'utils/deleteConstraint';
import { getAngleBetweenTwoPoints } from 'utils/getAngleBetweenTwoPoints';
import { randomAlphaMinMaxDeg } from 'utils/randomAlphaMinMaxDeg';
import { removeAttracted } from 'utils/removeAttracted';
import { removeAttractor } from 'utils/removeAttractor';
import { rotateBody } from 'utils/rotateBody';
import { scaleBody } from 'utils/scaleBody';
import { scaleBodyOverTime } from 'utils/scaleBodyOverTime';
import { setPositionOfBody } from 'utils/setPositionOfBody';
import { setStaticToBody } from 'utils/setStaticToBody';
import { suggestPositionWithinScreenBounds } from 'utils/suggestPositionWithinScreenBounds';
import { translateBody } from 'utils/translateBody';
import { updateMatterEngine } from 'utils/updateMatterEngine';

// module aliases
const Engine = Matter.Engine;
const Render = Matter.Render;

Matter.use('matter-attractors');

// Call this to setup the Matter library. Give it the width and height of your screen.
// Optional: The noWalls variable is used to disable canvas border walls.
export class MatterSetup {
  static globalContext: any;
  static aTAM: ATAMObject[] = [];
  static setup: MatterSetupObject;
  static engine: any;
  static world: any;
  static render: any;

  // All World Objects.
  static worldObjects: GlobalObject[] = [];

  constructor(setupOptions: MatterSetupObject) {
    MatterSetup.setup = setupOptions;
    MatterSetup.engine = Engine.create();
    // engine.enableSleeping = true;
    if (!setupOptions.noRenderer) {
      MatterSetup.render = Render.create({
        element: document.body,
        engine: MatterSetup.engine,
        options: {
          width: setupOptions.width,
          height: setupOptions.height,
          // background: '#000000',
          // showAngleIndicator: false,
          wireframes: false
        },
        bounds: {
          min: { 
            x: 0, 
            y: 0 
          },
          max: { 
            x: setupOptions.width, 
            y: setupOptions.height 
          }
        }
      });
      Render.run(MatterSetup.render);
      // Render.lookAt(render, {
      //   min: { x: 0, y: 0 },
      //   max: { x: width, y: height }
      // });
      MatterSetup.globalContext = MatterSetup.render.context;
    }
    MatterSetup.world = MatterSetup.engine.world;
    // We disable the Gravity from the start, not needed for Lampix.
    MatterSetup.world.gravity.y = 0;
    // Engine.run(engine);  // Updates the physics as fast as it can, exceeding 60fps.

    // Creating border walls around the canvas.
    if (!setupOptions.noWalls) { 
      const options: object = {
        isStatic: true
      };

      let localOptions: RectangleBodyOptions;
      localOptions = {
        x:-25, y:setupOptions.height / 2, w:50, h:setupOptions.height, matterOptions: options
      };
      createRectangle(localOptions);
      localOptions = {
        x:setupOptions.width + 25, y:setupOptions.height / 2, w:50, h:setupOptions.height, matterOptions:options
      };
      createRectangle(localOptions);
      localOptions = {
        x:setupOptions.width / 2, y:-25, w:setupOptions.width, h:50, matterOptions: options
      };
      createRectangle(localOptions);
      localOptions = {
        x:setupOptions.width / 2, y:setupOptions.height + 25, w:setupOptions.width, h:50, matterOptions: options
      };
      createRectangle(localOptions);
    }
  }

  utils = { 
    addAttracted,
    addAttractor,
    addAttractorOrbit,
    applyForceToBody,
    attractAllToOne,
    attractSomeToOne,
    checkIfSpaceOccupied,
    checkOnScreen,
    clearMatter,
    createCircular,
    // createComposite,
    createConstraint,
    createPolygon, 
    createRectangle,
    deleteBody,
    deleteComposite,
    deleteConstraint,
    getAngleBetweenTwoPoints,
    randomAlphaMinMaxDeg,
    removeAttracted,
    removeAttractor,
    rotateBody,
    scaleBody,
    scaleBodyOverTime,
    setPositionOfBody,
    setStaticToBody,
    suggestPositionWithinScreenBounds,
    translateBody,
    updateMatterEngine
  };
}
