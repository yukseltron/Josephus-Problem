export class Circular{

	arr = [];
	currentIndex = 0;

  constructor(arr: any[]) {
	  this.arr = arr;
	  this.currentIndex = 0;
}

  next(){
	let i = this.currentIndex;
	let arr = this.arr;
	this.currentIndex = i < arr.length-1 ? i+1 : 0;
  }

  current(){
	return this.currentIndex;
  }

  remove(index: number){
	this.arr.splice(index,1);
  }

  wait(ms: number){
	   let start = new Date().getTime();
	   let end = start;
	   while(end < start + ms) {
		 end = new Date().getTime();
	  }
  }

}
