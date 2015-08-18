/**
 * lottery set
 */
function LotterySet() {

	this.selectedNumbers = [];
	this.bitSum = 0;
}
/**
 * lowest lottery value
 */
LotterySet.prototype.minRange = 1;
/**
 * highest lottery value
 */
LotterySet.prototype.maxRange = 20;
/**
 * 
 */
LotterySet.prototype.setCount = 5;
/**
 * selected numbers
 */
LotterySet.prototype.selectedNumbers = null;

/**
 * number representing unique set of numbers
 */
LotterySet.prototype.bitSum = null;


/**
 * Add number
 */
LotterySet.prototype.addNumber = function(value) {
	var valid = true;
	if (this.selectedNumbers.length === this.setCount) {
		//full set
		valid = false;
	}
	if (value < this.minRange || value > this.maxRange) {
		valid = false;
	}	
	//check value doesn't already exist
	this.selectedNumbers.forEach(function(val) {
		if (val === value) {
			valid = false;
		}
	});
	if (valid) {
		this.selectedNumbers.push(value);
		//add value to id
		this.bitSum += (Math.pow(2, value));
	}
	return valid
};

/**
 * Add range 
 */
LotterySet.prototype.addRange = function(arr) {
	var me = this;
	var valid = true;
	arr.forEach(function(val) {
		valid = valid && me.addNumber(val);
	});
	return valid;
};

/**
 * Have all numbers been picked
 */
LotterySet.prototype.pickedAllNumbers = function() {
	return this.selectedNumbers.length === this.setCount;
};

/**
 * Generate and add random number
 */
LotterySet.prototype.generateNumber = function() {
	var random = Math.floor(Math.random() * ((this.maxRange + 1) - this.minRange)) + this.minRange;
	this.addNumber(random);
};

/**
 * return a string representation of numbers
 */
LotterySet.prototype.numbersToString = function() {
	var str = '';
	this.selectedNumbers.forEach(function(num) {
		str += num + ', ';
	});
	return str;
};

/**
 * Generate set of numbers
 */
LotterySet.prototype.generateSet = function() {
	while (this.selectedNumbers.length < this.setCount) {
		this.generateNumber();
	}
};

/**
 * Does selected numbers contain value
 */
LotterySet.prototype.contains = function(val) {
	return (Math.pow(2, val) & this.bitSum) !== 0;
};

/**
 * checks whether other lottery set 
 */
LotterySet.prototype.equalSet = function(lotterySet) {
	//must have all numbers
	if (!this.pickedAllNumbers() || !lotterySet.pickedAllNumbers()) {
		return false;
	}
	//equal sets have equal sums
	return (lotterySet.bitSum === this.bitSum);
};


