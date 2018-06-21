import { ATAMObject, MatterSetupObject } from '../matter_types';
import { GlobalObject } from '../objects/GlobalObject';
import 'matter-attractors';
export declare class MatterSetup {
    globalContext: any;
    aTAM: ATAMObject[];
    setup: MatterSetupObject;
    engine: any;
    world: any;
    render: any;
    worldObjects: GlobalObject[];
    constructor(setupOptions: MatterSetupObject);
    utils: {
        addAttracted: any;
        addAttractor: any;
        addAttractorOrbit: any;
        applyForceToBody: any;
        attractAllToOne: any;
        attractSomeToOne: any;
        checkIfSpaceOccupied: any;
        checkOnScreen: any;
        clearMatter: any;
        createCircular: any;
        createConstraint: any;
        createPolygon: any;
        createRectangle: any;
        deleteBody: any;
        deleteComposite: any;
        deleteConstraint: any;
        getAngleBetweenTwoPoints: any;
        randomAlphaMinMaxDeg: any;
        removeAttracted: any;
        removeAttractor: any;
        rotateBody: any;
        scaleBody: any;
        scaleBodyOverTime: any;
        setPositionOfBody: any;
        setStaticToBody: any;
        suggestPositionWithinScreenBounds: any;
        translateBody: any;
        updateMatterEngine: any;
    };
}
