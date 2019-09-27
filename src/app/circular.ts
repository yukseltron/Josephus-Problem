export class Circular{

	arr = [];
	currentIndex = 0;

  constructor(arr: boolean[]) {
	  this.arr = arr;
	  this.currentIndex = 0;
}

  next(){
	let i = this.currentIndex, arr = this.arr;
	this.currentIndex = i < arr.length-1 ? i+1 : 0;
  }

  current(){
	return this.currentIndex;
  }

  change(){
	this.arr[this.currentIndex] = false;
  }

  wait(ms: number){
	   let start = new Date().getTime();
	   let end = start;
	   while(end < start + ms) {
		 end = new Date().getTime();
	  }
  }

}
