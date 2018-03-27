/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// Slick Jquery Plugin Type Definition
interface JQuery {
  slick(element?: any, settings?: any): any;
}
