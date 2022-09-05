import { IWorkshop } from './../workshop/index';
import { IGraphic } from './../graphic/index';

export interface IInspector {
  graphic?: IGraphic;
  workshop?: IWorkshop;
}