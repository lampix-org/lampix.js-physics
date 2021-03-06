import { MatterBody } from './objects/MatterBody';
import { IConstraintRenderDefinition } from 'matter-js';

// Simple X,Y point.
export type XYPos = {
  x: number,
  y: number
};

// Use this to define a matter object within the world.
export type ObjectIdentifiers = {
  index: number,
  cx: number,
  cy: number,
  w: number,
  h: number
};

// Circle object.
export type Circle = {
  cx: number,
  cy: number,
  radius: number
};

// Attractor to attracted object map. Also includes the Min and Max distance for orbits.
// If Orbits are left undefined, object will automatically stick together.
export type ATAMObject = {
  attractor: MatterBody,
  orbitMin?: number,
  orbitMax?: number,
  attracted?: AttractedObject[]
};

// This object defines an attracted object used in the ATAMObject definition.
// If customOrbit is defined then that is the orbit for this object. If stopAttraction
// is defined then this object will not be attracted to the attractor.
export type AttractedObject = {
  object?: MatterBody,
  customOrbit?: number,
  stopAttraction?: boolean
};

// Used when creating the @lampix/physics instance.
export type MatterSetupObject = {
  width: number,
  height: number,
  noWalls: boolean,
  noRenderer: boolean,
  gravityX?: number,
  gravityY?: number,
  enableSleeping?: boolean,
  debugWireFrames?: boolean
};

// This interface defines the basic attributes that any and all matter bodies need.
export interface BasicBodyOptions {
  // Basic attributes.
  x: number;
  y: number;
  // This is an optional function used when the body goes to sleep or wakes up.
  onSleepStart?: Function;
  onSleepStop?: Function;
  // Matter JS Options for creating the physical body.
  matterOptions?: MatterBodyOptions;
}

// Matter options for making bodies. Check out the online documentation for more details.
export interface MatterBodyOptions {
  isStatic?: boolean; // Default: false
  friction?: number; // Default: 0.1
  angle?: number; // Default: 0
  density?: number; // Default: 0.001
  frictionAir?: number; // Default: 0.01
  frictionStatic?: number;  // Default: 0.5
  force?: XYPos;  // Default: { x: 0, y: 0 }
  inertia?: number; // If you modify this you must also modify the inverseInertia.
  inverseInertia?: number;  // If you modify this you must also modify inertia.
  mass?: number;  // If you modify the mass you have to modify the inverseMass as well.
  inverseMass?: number; // If you modify this you must also modify the mass.
  isSensor?: boolean; // Default: false
  isSleeping?: boolean; // Default: false
  label?: string; // Default: "body"
  parent?: Matter.Body; // Self reference if not part of another body.
  parts?: Matter.Body[];  // An array of bodies that compose this one.
  position?: XYPos; // Default: { x: 0, y: 0 }
  restitution?: number; // Default: 0
  sleepThreshold?: number;  // Default: 60
  slop?: number;  // Default: 0.05
  timeScale?: number; // Default: 1
  torque?: number;  // Default: 0
  type?: string;  // Default: "body"
  vertices?: XYPos[]; // List of points.
  // This object can be used to define filterinf options for the body.
  // See http://brm.io/matter-js/docs/classes/Body.html for further details.
  collisionFilter?: MatterColFilterOptions;
  // This following code should be used for creating attractors between two bodies,
  // the direction of the force being bodyB towards bodyA (bodyA is the attractor).
  // If you want to use other Matter.JS plugins you'll need to add them to npm yourself.
  plugin?: MatterPluginOptions;
  // The render options are needed when you
  render?: MatterRenderOptions;
}

// Used within the MatterBodyOptions for defining collisions.
export interface MatterColFilterOptions {
  category: number;  // Default: 1
  group: number; // Default: 0
  mask: number; // Default: -1
}

// Used to specify which attraction function this object is subjected to.
export interface MatterPluginOptions {
  attractors?: VoidFunction[]; // This must be an attractor function or more.
}

// These options are needed when you want to define special render options for an object.
export interface MatterRenderOptions {
  fillStyle?: string; // Default: a random colour
  lineWidth?: number; // Default: 0
  opacity?: number; // Default: 1
  sprite?: MatterSpriteOptions;
  strokeStyle?: string; // Default: a random colour
  visible?: boolean; // Default: true
}

// This may be needed when you have special render options for an object with a sprite.
export interface MatterSpriteOptions {
  texture: string;
  xScale: number;  // Default: 1
  xOffset?: number; // Default: 0
  yScale: number;  // Default: 1
  yOffset?: number;  // Default: 0
}

// Extended options for rectangle bodies.
export interface RectangleBodyOptions extends BasicBodyOptions {
  w: number;
  h: number;
}

// Extended options for circular bodies.
export interface CircularBodyOptions extends BasicBodyOptions {
  r: number;
}

// Extended options for Rail Bearings.
export interface RailBearingOptions extends CircularBodyOptions {
  id: number;
  parentId?: number;
  targetObject?: MatterBody;
}

// Extended options for polygonal bodies.
export interface PolygonBodyOptions extends BasicBodyOptions {
  r: number;
  sides:number;
}

export interface IrregularBodyOptions extends BasicBodyOptions {
  vertices: XYPos[];
  colorStroke?: string;
  colorFill?: string;
  lineWidth?: number;
}

// Options for creating a Matter Constraint.
export interface ConstraintOptions {
  options: MatterConstraintOptions;
  color?: string;
  growOver?: number;
  animSteps?: number;
}

// Possible structure of options for creating a Constraint with Matter JS.
export type MatterConstraintOptions = {
  bodyA: Matter.Body; // any body object.
  bodyB: Matter.Body; // any other body.
  pointA?: XYPos; // Just an offset for the first point if you don't want the constraint to start
                 // from the middle of the first object.
  pointB?: XYPos; // the same as above but for the second object,
  length: number; // pixels you want for the line.
  stiffness: number; // 0 for very elastic, 1 for very stiff.
  render?: IConstraintRenderDefinition;
};

// Structure used to define the creation of a Slider Rail.
export interface SliderRailOptions extends RectangleBodyOptions {
  id: number;
  bearings?: RailBearingOptions[];
}
