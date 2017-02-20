import {Price} from './Price';

export interface Car {
	carID : number,
	image : string,
	link  : string,
	mileage : number,
	make    : string,
	makeID  : number,
	model   : string,
	modelID : number,
	year    : number,
	body    : string,
	bodyID  : number,
	bidsNr  : number,
	priceHistory : Price[]
}